const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const qs = require("qs");

module.exports = {
  config: {
    name: "autodown",
    version: "1.1",
    hasPermssion: 0,
    credits: "con cặc",
    description: "Tự động tải video",
    commandCategory: "người dùng",
    usages: "",
    cooldowns: 3
  },

  // --- getVideoData tích hợp trực tiếp ---
  _getVideoData: async function (videoUrl, token = "") {
    const endpoint = "https://getfvid.online/wp-json/aio-dl/video-data/";
    const headers = {
      "authority": "getfvid.online",
      "accept": "*/*",
      "accept-language": "vi-VN,vi;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
      "origin": "https://getfvid.online",
      "referer": "https://getfvid.online/",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
    };
    const payload = qs.stringify({
      url: videoUrl,
      token: token || "292e8b8832c594c3fe843b9eb9d9dd16699901dd4d8c998301514542682b7346"
    });
    try {
      const res = await axios.post(endpoint, payload, { headers, timeout: 15000 });
      return res.data || null;
    } catch (e) {
      console.error("❌ Lỗi lấy data video:", e.message);
      return null;
    }
  },

  // --- helper tải file về đĩa (stream) ---
  _downloadToFile: async function (fileUrl, outPath) {
    await fs.ensureDir(path.dirname(outPath));
    const writer = fs.createWriteStream(outPath);
    const res = await axios.get(fileUrl, { responseType: "stream", timeout: 60000 });
    return new Promise((resolve, reject) => {
      res.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  },

  handleEvent: async function ({ event, api }) {
    const { body, threadID, messageID } = event;
    if (!body) return;

    // Bắt các link MXH phổ biến
    const matches = body.match(
      /https?:\/\/(?:www\.)?(?:fb|facebook|vt\.tiktok|tiktok|instagram|twitter|x\.com|pinterest|reddit|youtube|youtu\.be|capcut|douyin)\.[^\s]+/gi
    );
    if (!matches || matches.length === 0) return;

    for (const url of matches) {
      try {
        const data = await this._getVideoData(url);
        const medias = data?.medias || [];
        if (!medias.length) continue;

        // Ưu tiên media là video; nếu không có thì lấy cái đầu
        const media =
          medias.find(m => (m.type || "").toLowerCase().includes("video")) ||
          medias[0];

        const extFromUrl = (() => {
          try {
            const u = new URL(media.url);
            const p = u.pathname.split("/").pop() || "";
            const dot = p.lastIndexOf(".");
            return dot > -1 ? p.slice(dot + 1).split(/\W/)[0] : "";
          } catch { return ""; }
        })();

        const ext = (media.extension || extFromUrl || "mp4").replace(/[^a-z0-9]/gi, "").toLowerCase();
        const tempPath = path.join(__dirname, `cache/down_${Date.now()}.${ext}`);

        await this._downloadToFile(media.url, tempPath);

        await api.sendMessage(
          { attachment: fs.createReadStream(tempPath) },
          threadID,
          () => fs.unlink(tempPath).catch(() => {}),
          messageID
        );
      } catch (err) {
        console.error("❌ Lỗi xử lý link:", url, err.message);
        // tiếp tục link kế tiếp
      }
    }
  },

  run: () => {}
};
