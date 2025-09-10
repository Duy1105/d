const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const { downloadFile } = require("../../utils/index");

module.exports.config = {
  name: "catbox",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ljzi",
  description: "Upload file lên catbox.moe",
  commandCategory: "người dùng",
  usages: "[reply ảnh/video]",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const { threadID, type, messageReply, messageID } = event;

  if (type !== "message_reply" || !messageReply.attachments.length)
    return api.sendMessage("⚠️ Bạn cần reply một ảnh hoặc video để upload lên Catbox.", threadID, messageID);

  const attachmentSend = [];

  // Lưu file từ URL
  async function getAttachments(attachments) {
    let index = 0;
    for (const data of attachments) {
      const ext = data.type === "photo" ? "jpg" :
                  data.type === "video" ? "mp4" :
                  data.type === "audio" ? "m4a" :
                  data.type === "animated_image" ? "gif" : "bin";
      const filePath = path.join(__dirname, "cache", `${Date.now()}_${index}.${ext}`);
      await downloadFile(data.url, filePath);
      attachmentSend.push(filePath);
      index++;
    }
  }

  await getAttachments(messageReply.attachments);

  let result = "", success = 0, failed = [];

  for (const filePath of attachmentSend) {
    try {
      const form = new FormData();
      form.append('reqtype', 'fileupload');
      form.append('fileToUpload', fs.createReadStream(filePath));

      const upload = await axios.post("https://catbox.moe/user/api.php", form, {
        headers: form.getHeaders()
      });

      result += `✅ ${upload.data}\n`;
      success++;
    } catch (err) {
      failed.push(filePath);
      result += `❌ Upload thất bại: ${path.basename(filePath)}\n`;
    } finally {
      fs.unlinkSync(filePath);
    }
  }

  return api.sendMessage(`${result}`, threadID, messageID);
};
