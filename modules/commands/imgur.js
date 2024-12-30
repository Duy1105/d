const imgur = require("imgur");
const fs = require("fs");
const { downloadFile } = require("../../utils/index");

module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "mod",
  description: "Imgur",
  commandCategory: "người dùng",
  usages: "[reply]",
  cooldowns: 5
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
      }
module.exports.run = async ({ api, event }) => {
  const { threadID, type, messageReply, messageID } = event;
  const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
const fs = require("fs");
  const ClientID = "c76eb7edd1459f3"
  if (type !== "message_reply" || messageReply.attachments.length == 0) return api.sendMessage({body:`=====『 𝐌𝐄𝐍𝐔 𝐈𝐌𝐆𝐔𝐑 』=====\n━━━━━━━━━━━━━━━━━━\n1.𝐁𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐝𝐮̀𝐧𝐠 𝐢𝐦𝐠𝐮𝐫 + 𝐚̉𝐧𝐡\n2.𝐁𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐝𝐮̀𝐧𝐠 𝐢𝐦𝐠𝐮𝐫 + 𝐯𝐢𝐝𝐞𝐨\n𝐀𝐧𝐡 𝐡𝐮̛𝐨̛́𝐧𝐠 𝐝𝐚̂̃𝐧 𝐭𝐡𝐞̂́ 𝐦𝐚̀ 𝐤𝐡𝐨̂𝐧𝐠 𝐛𝐢𝐞̂́𝐭 𝐝𝐮̀𝐧𝐠 𝐭𝐡𝐢̀ 𝐜𝐡𝐞̂́𝐭 𝐦𝐞̣ đ𝐢 😏\n𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 "👍" 𝐜𝐨́ 𝐛𝐚̂́𝐭 𝐧𝐠𝐨̛̀ 𝐧𝐞̀🐧 `,attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, (err, info) => {
    global.client.handleReaction.push({
      name: this.config.name, 
      messageID: info.messageID,
      author: event.senderID,
    })
      },event.messageID);
  imgur.setClientId(ClientID);
  const attachmentSend = [];
  async function getAttachments(attachments) {
    let startFile = 0;
    for (const data of attachments) {
      const ext = data.type == "photo" ? "jpg" :
        data.type == "video" ? "mp4" :
          data.type == "audio" ? "m4a" :
            data.type == "animated_image" ? "gif" : "txt";
      const pathSave = __dirname + `/cache/${startFile}.${ext}`
      ++startFile;
      const url = data.url;
      await downloadFile(url, pathSave);
      attachmentSend.push(pathSave);
    }
  }
  await getAttachments(messageReply.attachments);
  let msg = "", Succes = 0, Error = [];
  for (const getImage of attachmentSend) {
    try {
      const getLink = await imgur.uploadFile(getImage)
      console.log(getLink);
      msg += `${++Succes}/ ${getLink.link}\n`
      fs.unlinkSync(getImage)
    } catch {
      Error.push(getImage);
      fs.unlinkSync(getImage)
    }
  }
  return api.sendMessage({body: `====『 𝐈𝐌𝐆𝐔𝐑 𝐔𝐏𝐋𝐎𝐀𝐃 』====\n\n→ 𝐓𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠: ${Succes}\n→ 𝐓𝐡𝐚̂́𝐭 𝐛𝐚̣𝐢: ${Error.length}\n━━━━━━━━━━━━━━━━━━\n𝐋𝐢𝐧𝐤 𝐚̉𝐧𝐡 𝐯𝐮̛̀𝐚 𝐮𝐩:\n${msg}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
         }

module.exports.handleReaction = async ({ event, api, handleReaction, Currencies, Users, client}) => {
const { threadID, messageID, userID } = event;
//const { threadID, messageID, senderID, mentions, type, messageReply } = event;
if (event.userID != handleReaction.author) return;
if (event.reaction != "👍") return;
 api.unsendMessage(handleReaction.messageID);
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];
return api.sendMessage({body:`𝐈𝐜𝐨𝐧 𝐜𝐚́𝐢 𝐥𝐨̂̀𝐧 𝐦𝐞̣ 𝐦𝐚̀𝐲 !!`,attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
}