const fse = require("fs-extra");
const approved = __dirname + "/../commands/cache/approvedThreads.json";

module.exports.config = {
  name: "checkduyet",
  eventType: ["log:subscribe"],
  version: "1.1.1",
  credits: "DC-Nam",
  description: "Noti check duyệt",
};

module.exports.run = async function ({ api, event, Users }) {
  const { threadID, logMessageData } = event;
  const { PREFIX } = global.config;
  const {
    getCurrentUserID: botID,
    sendMessage: send,
    unsendMessage: unsend,
    changeNickname: changeNick,
  } = api;

  let data = JSON.parse(fse.readFileSync(approved));

  if (logMessageData.addedParticipants.find((i) => i.userFbId == botID())) {
    // Change nickname
    changeNick(
      `[ ${PREFIX} ] • ${
        !global.config.BOTNAME ? "Duy" : global.config.BOTNAME
      }`,
      threadID,
      botID(),
    );

    send("𝗞𝗶𝗲̂̉𝗺 𝘁𝗿𝗮 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗽𝗵𝗲̂ 𝗱𝘂𝘆𝗲̣̂𝘁", event.threadID, (error, info) => {
      setTimeout(function () {
        unsend(info.messageID);
        if (!data.includes(threadID)) {
          send(
            "𝗞𝗲̂́𝘁 𝗻𝗼̂́𝗶 𝘁𝗵𝗮̂́𝘁 𝗯𝗮̣𝗶\n𝗡𝗵𝗼́𝗺 𝗯𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 đ𝘂̛𝗼̛̣𝗰 𝗮𝗱𝗺𝗶𝗻 𝗱𝘂𝘆𝗲̣̂𝘁\nĐ𝗲̂̉ 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝗱𝘂𝘆𝗲̣̂𝘁 𝗱𝘂̀𝗻𝗴'" +
              PREFIX +
              "request'\n𝗖𝗵𝘂́𝗰 𝗖𝗮́𝗰 𝗕𝗮̣𝗻 𝗦𝗮̀𝗶 𝗕𝗼𝘁 𝗩𝘂𝗶 𝗩𝗲̉\n𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗖𝗵𝗼 𝗔𝗱𝗺𝗶𝗻 𝗕𝗼𝘁:https://www.facebook.com/duydo05",
            threadID,
          );
        } else {
          send(
            `[🎊] 𝗦𝘂̛̉ 𝗗𝘂̣𝗻𝗴 ${PREFIX}help Đ𝗲̂̉ 𝗫𝗲𝗺 𝗖𝗵𝗶 𝗧𝗶𝗲̂́𝘁 𝗟𝗲̣̂𝗻𝗵 𝗖𝗼́ 𝗧𝗿𝗼𝗻𝗴 𝗕𝗼𝘁\n→ [💓] 𝗖𝗵𝘂́𝗰 𝗖𝗮́𝗰 𝗕𝗮̣𝗻 𝗦𝗮̀𝗶 𝗕𝗼𝘁 𝗩𝘂𝗶 𝗩𝗲̉\n→ [🌐]𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗖𝗵𝗼 𝗔𝗱𝗺𝗶𝗻 𝗕𝗼𝘁:https://www.facebook.com/duydo05`,
            threadID,
          );
        }
      }, 4000);
    });
  } else return;
};
