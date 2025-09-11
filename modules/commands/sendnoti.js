const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "sendnoti",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "ZGToan Official • refactor by ChatGPT",
  description: "Gửi thông báo đến tất cả nhóm và nhận phản hồi hai chiều",
  commandCategory: "admin",
  usages: "[msg] (có thể reply kèm file)",
  cooldowns: 5
};

const cacheDir = path.join(__dirname, "cache");
fse.ensureDirSync(cacheDir);

// tải 1 url về file tạm
async function downloadToTemp(url, filenameHint = "file") {
  const { data, headers } = await axios.get(url, { responseType: "arraybuffer" });
  let ext = path.extname(new URL(url).pathname) || "";
  if (!ext) {
    const ct = (headers["content-type"] || "").toLowerCase();
    if (ct.includes("image/")) ext = `.${ct.split("/")[1]}`;
    else if (ct.includes("video/")) ext = `.${ct.split("/")[1]}`;
    else if (ct.includes("audio/")) ext = `.${ct.split("/")[1]}`;
    else ext = ".bin";
  }
  const filePath = path.join(cacheDir, `${Date.now()}_${filenameHint}${ext}`);
  fs.writeFileSync(filePath, data);
  return filePath;
}

// chuẩn hóa đính kèm từ event.attachments → trả về mảng filePaths
async function materializeAttachments(atts = []) {
  const files = [];
  for (const a of atts) {
    if (!a?.url) continue;
    const hint = a?.type || "att";
    try {
      const p = await downloadToTemp(a.url, hint);
      files.push(p);
    } catch (e) {
      console.error("[sendnoti] download attachment error:", e.message);
    }
  }
  return files;
}

// tạo object gửi tin nhắn kèm đính kèm (ReadStream mới mỗi lần)
function buildMessage(body, filePaths = []) {
  return {
    body,
    attachment: filePaths.map(p => fs.createReadStream(p))
  };
}

// tiện ích thời gian VN
function nowVN() {
  return moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
}

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
  const { threadID, messageID, senderID, body = "", attachments = [] } = event;
  const name = await Users.getNameUser(senderID);
  const timeStr = nowVN();

  switch (handleReply.type) {
    // Nhận phản hồi ở NHÓM → chuyển về ADMIN
    case "fromGroup": {
      const groupName = (await Threads.getInfo(threadID))?.threadName || "Unknown";
      const head =
        `=== [ sᴇɴᴅɴᴏᴛɪ ] ===\n` +
        `⏰ 𝙏𝙞𝙢𝙚: ${timeStr}\n` +
        `👤 𝙏𝙪̛̀: ${name}\n` +
        `👥 𝘽𝙤𝙭: ${groupName}\n` +
        `📝 𝙉𝙤̣̂𝙞 𝙙𝙪𝙣𝙜: ${body || "(không nội dung)"}`;

      const tempFiles = await materializeAttachments(attachments);
      const msg = buildMessage(head, tempFiles);

      api.sendMessage(msg, handleReply.adminThreadID, (err, info) => {
        // dọn file
        for (const p of tempFiles) { try { fs.unlinkSync(p) } catch {} }
        if (err) return;

        // set cầu nối ngược: admin reply → quay lại nhóm
        global.client.handleReply.push({
          name: module.exports.config.name,
          type: "fromAdmin",
          messageID: info.messageID,
          adminThreadID: handleReply.adminThreadID,
          targetThreadID: handleReply.targetThreadID
        });
      });
      break;
    }

    // Admin reply ở THREAD ADMIN → chuyển lại NHÓM
    case "fromAdmin": {
      const head =
        `=== sᴇɴᴅɴᴏᴛɪ ===\n` +
        `⏰ 𝙏𝙞𝙢𝙚: ${timeStr}\n` +
        `👤 𝙁𝙧𝙤𝙢: ${name}\n` +
        `📝 𝙉𝙤̣̂𝙞 𝙙𝙪𝙣𝙜: ${body || "(không nội dung)"}\n` +
        `↩️ 𝙍𝙚𝙥𝙡𝙮 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣 𝙣𝙖̀𝙮 đ𝙚̂̉ 𝙗𝙖́𝙤 𝙫𝙚̂̀ 𝙖𝙙𝙢𝙞𝙣`;

      const tempFiles = await materializeAttachments(attachments);
      const msg = buildMessage(head, tempFiles);

      api.sendMessage(msg, handleReply.targetThreadID, (err, info) => {
        for (const p of tempFiles) { try { fs.unlinkSync(p) } catch {} }
        if (err) return;

        // nối chiều về admin tiếp
        global.client.handleReply.push({
          name: module.exports.config.name,
          type: "fromGroup",
          messageID: info.messageID,
          adminThreadID: handleReply.adminThreadID,
          targetThreadID: handleReply.targetThreadID
        });
      }, handleReply.replyToAdminMsgID /* có thể undefined */);
      break;
    }
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID, type, messageReply } = event;

  const content = args.join(" ").trim();
  if (!content && type !== "message_reply")
    return api.sendMessage("Vui lòng nhập nội dung hoặc reply kèm file.", threadID, messageID);

  const senderName = await Users.getNameUser(senderID);
  const timeStr = nowVN();

  // body gửi đi
  const baseBody =
    `=== ᴛʜᴏ̂ɴɢ ʙᴀ́ᴏ ===\n` +
    `⏰ 𝙏𝙞𝙢𝙚: ${timeStr}\n` +
    `📝 𝙉𝙤̣̂𝙞 𝙙𝙪𝙣𝙜: ${content || "(không nội dung)"}\n` +
    `👤 𝙏𝙪̛̀: ${senderName}\n` +
    `↩️ 𝙍𝙚𝙥𝙡𝙮 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣 𝙣𝙖̀𝙮 𝙙𝙚̂̉ 𝙗𝙖́𝙤 𝙫𝙚̂̀ 𝙖𝙙𝙢𝙞𝙣`;

  // nếu admin reply kèm file ở lệnh, tải file 1 lần – tái sử dụng cho mọi nhóm
  let broadcastFiles = [];
  if (type === "message_reply" && Array.isArray(messageReply?.attachments) && messageReply.attachments.length) {
    broadcastFiles = await materializeAttachments(messageReply.attachments);
  }

  const allThread = global.data.allThreadID || [];
  let ok = 0, fail = 0;

  // gửi lần lượt (có thể đổi sang Promise.allSettled nếu muốn chạy song song)
  for (const toTid of allThread) {
    const msg = buildMessage(baseBody, broadcastFiles);
    await new Promise(resolve => {
      api.sendMessage(msg, toTid, (err, info) => {
        if (err) { fail++; return resolve(); }
        ok++;

        // thiết lập cầu nối: nếu nhóm reply → gửi về admin thread
        global.client.handleReply.push({
          name: module.exports.config.name,
          type: "fromGroup",
          messageID: info.messageID,
          adminThreadID: threadID,          // nơi admin chạy lệnh
          targetThreadID: toTid,            // nhóm đích
          replyToAdminMsgID: messageID      // để reply chồng lên tin admin (tùy nhu cầu)
        });
        resolve();
      });
    });
  }

  // dọn file sau khi broadcast xong
  for (const p of broadcastFiles) { try { fs.unlinkSync(p) } catch {} }

  api.sendMessage(`✅ Đã gửi thông báo tới ${ok} nhóm, thất bại ${fail} nhóm.`, threadID, messageID);
};
