module.exports.handleEvent = async function({ api, event, client, __GLOBAL }) {
const { threadID, messageID } = event;
const time = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
let data = [
        "2523892817885618",
        "2523892964552270",
        "2523893081218925",
        "2523887571219476"
      ];
      let sticker = data[Math.floor(Math.random() * data.length)];
  if(
event.body.indexOf("tid")==0 || event.body.indexOf("Tid")==0) {
api.sendMessage(`🌐==== [ 𝗧𝗜𝗗 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━
📌 𝗧𝗜𝗗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${threadID}
TIME: ${time}`, threadID, messageID);
    setTimeout(() => {
     api.sendMessage({sticker: sticker}, threadID);
      }, 100);
  }
}
  
this.config = {
    name: 'tid',
    version: '1.1.1',
    hasPermssion: 0,
    credits: '',
    description: '',
    commandCategory: 'người dùng',
    usages: '',
    cooldowns: 3
};
module.exports.run = function({ api, event, client, __GLOBAL }) {}