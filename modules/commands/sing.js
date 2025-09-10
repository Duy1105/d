const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const Youtube = require("youtube-search-api");
const https = require("https");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

module.exports.config = {
  name: "sing",
  version: "1.1.1",
  hasPermission: 0,
  credits: "Recode by LocDev (gỡ mã gốc)",
  description: "Tìm và tải bài hát từ YouTube",
  commandCategory: "người dùng",
  usages: "[tên bài hát]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const keyword = args.join(" ");
  if (!keyword) return api.sendMessage("❌ Vui lòng nhập tên bài hát.", event.threadID, event.messageID);

  try {
    const searchResults = await Youtube.GetListByKeyword(keyword, false, 5);

    if (!searchResults.items || searchResults.items.length === 0) {
      return api.sendMessage("❌ Không tìm thấy bài hát nào phù hợp.", event.threadID, event.messageID);
    }

    let message = "╭─[🎶]─[ YOUTUBE ]─[🎧]─⭓\n";
    searchResults.items.forEach((item, index) => {
      message += `├ [${index + 1}] ${item.title}\n`;
      message += `├ [🕐] ${item.length.simpleText} | [👤] ${item.channelTitle}\n├─────────────────\n`;
    });
    message += "╰─ [ Reply số để chọn bài ] ─⭓";

    api.sendMessage(message, event.threadID, (err, info) => {
      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        results: searchResults.items
      });
    }, event.messageID);

  } catch (err) {
    console.error(err);
    api.sendMessage("❌ Đã có lỗi xảy ra khi tìm kiếm bài hát.", event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const { author, results } = handleReply;
  if (event.senderID !== author) return;

  const choice = parseInt(event.body);
  if (isNaN(choice) || choice < 1 || choice > results.length) {
    return api.sendMessage("❌ Vui lòng chọn một số hợp lệ trong danh sách.", event.threadID, event.messageID);
  }

  const video = results[choice - 1];
  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
  const apiUrl = `https://api.lunarkrystal.site/ytmp3?url=${encodeURIComponent(videoUrl)}`;

  try {
    const metadataRes = await fetchUntilReady(apiUrl);
    if (!metadataRes || !metadataRes.link) {
      return api.sendMessage("❌ Không thể tải bài hát này.", event.threadID, event.messageID);
    }

    const filePath = path.join(__dirname, "cache", `${video.id}.mp3`);
    const writer = fs.createWriteStream(filePath);

    const download = await axios({
      method: "get",
      url: metadataRes.link,
      responseType: "stream",
      httpsAgent,
      timeout: 60000
    });

    const contentLength = parseInt(download.headers["content-length"] || "0");
    const fileSizeMB = (contentLength / (1024 * 1024)).toFixed(2);

    if (fileSizeMB > 25) {
      return api.sendMessage(`❌ File quá lớn (${fileSizeMB}MB). Giới hạn là 25MB.`, event.threadID, event.messageID);
    }

    download.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage({
        body: `🎧 Tên: ${video.title}\n📺 Tác giả: ${video.channelTitle}\n🔗 Link: ${videoUrl}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    });

    writer.on("error", err => {
      console.error(err);
      api.sendMessage("❌ Đã có lỗi xảy ra khi tải file.", event.threadID, event.messageID);
    });

  } catch (err) {
    console.error(err);
    api.sendMessage("❌ Không thể xử lý yêu cầu.", event.threadID, event.messageID);
  }
};

// Retry logic (up to 5 times) for API trả link MP3
async function fetchUntilReady(apiUrl) {
  const maxTries = 5;
  for (let i = 0; i < maxTries; i++) {
    try {
      const res = await axios.get(apiUrl);
      if (res.data && res.data.link) return res.data;
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // wait more each time
    } catch (err) {
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  return null;
}