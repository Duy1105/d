const fse = require("fs-extra"),
  approved = __dirname + "/../commands/cache/approvedThreads.json";

module.exports.config = {
name: "checkduyet",
eventType: ["log:subscribe"],
version: "1.1.1",
credits: "DC-Nam",
description: "Noti check duyệt",
};

module.exports.run = async ({ api, event }) => {
const { threadID, logMessageData, messageID } = event;
const PREFIX = global.config.PREFIX;

let data = [];
try { if (fse.existsSync(approved)) data = JSON.parse(fse.readFileSync(approved)) } 
catch (e) { console.error("approved read error:", e) }

if (!logMessageData?.addedParticipants?.some(i => i.userFbId == api.getCurrentUserID())) return;

try { api.changeNickname(`[ ${PREFIX} ] • ${global.config.BOTNAME || "Duy"}`, threadID, api.getCurrentUserID()) } 
catch (e) { console.error("changeNickname error:", e) }

return api.sendMessage(`𝗡𝗵𝗼́𝗺 𝗰𝗵𝘂̛𝗮 đ𝘂̛𝗼̛̣𝗰 𝗮𝗱𝗺𝗶𝗻 𝗱𝘂𝘆𝗲̣̂𝘁\nĐ𝗲̂̉ 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝗱𝘂𝘆𝗲̣̂𝘁 𝗱𝘂̀𝗻𝗴 '${PREFIX}request'\n𝗟𝗶𝗲̂𝗻 𝗵𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻: https://www.facebook.com/duydo05`, event.threadID);
};
