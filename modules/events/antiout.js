module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "0.0.1",
  credits: "DungUwU", //duy mod
  description: "Listen events",
  dependencies: {
    "fs-extra": "",
    path: "",
  },
};
module.exports.onLoad = () => {
  const fs = require("fs-extra");
  const request = require("request");
  const dirMaterial = __dirname + `/cache/antiout/randomgif/`;
  if (!fs.existsSync(dirMaterial + "cache", "antiout", "randomgif"))
    fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "tb.mp3"))
    request("https://tinyurl.com/yn29eovk").pipe(
      fs.createWriteStream(dirMaterial + "tb.mp3"),
    );
  if (!fs.existsSync(dirMaterial + "tc.mp3"))
    request("https://tinyurl.com/yw8t5ktw").pipe(
      fs.createWriteStream(dirMaterial + "tc.mp3"),
    );
};
module.exports.run = async ({ event, api, Threads, Users }) => {
  const { createReadStream, existsSync, mkdirSync, readdirSync } =
    global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const moment = require("moment-timezone");
  const timeNow = moment
    .tz("Asia/Ho_Chi_Minh")
    .format("HH:mm:ss (D/MM/YYYY) (dddd)");
  var thu = moment.tz("Asia/Ho_Chi_Minh").format("dddd");
  if (thu == "Sunday") thu = "𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭";
  if (thu == "Monday") thu = "𝐓𝐡𝐮̛́ 𝟐";
  if (thu == "Tuesday") thu = "𝐓𝐡𝐮̛́ 𝟑";
  if (thu == "Wednesday") thu = "𝐓𝐡𝐮̛́ 𝟒";
  if (thu == "Thursday") thu = "𝐓𝐡𝐮̛́ 𝟓";
  if (thu == "Friday") thu = "𝐓𝐡𝐮̛́ 𝟔";
  if (thu == "Saturday") thu = "𝐓𝐡𝐮̛́ 𝟕";
  let data = (await Threads.getData(event.threadID)).data || {};
  if (data.antiout == false) return;
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
    return;

  const name =
    global.data.userName.get(event.logMessageData.leftParticipantFbId) ||
    (await Users.getNameUser(event.logMessageData.leftParticipantFbId));
  const type =
    event.author == event.logMessageData.leftParticipantFbId
      ? "tự rời"
      : "bị quản trị viên đá";
  if (type == "tự rời") {
    const path = join(__dirname, "cache", "antiout", "randomgif");
    const gifPath = join(path, `tb.mp3`);
    const hhh = join(__dirname, "cache", "antiout", "randomgif");
    const gifhh = join(hhh, `tc.mp3`);
    const randomPath = readdirSync(
      join(__dirname, "cache", "antiout", "randomgif"),
    );
    if (randomPath.lenth != 0) {
      const pathRandom = join(
        __dirname,
        "cache",
        "antiout",
        "randomgif",
        `${randomPath[Math.floor(Math.random() * randomPath.length)]}`,
      );
    }
    api.addUserToGroup(
      event.logMessageData.leftParticipantFbId,
      event.threadID,
      (error, info) => {
        if (error) {
          api.sendMessage(
            {
              body: `━━━━『 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐇𝐞̣̂ 𝐓𝐡𝐨̂́𝐧𝐠 』━━━━\n『 𝐊𝐢́𝐜𝐡 𝐇𝐨𝐚̣𝐭  』     ➣ 𝐂𝐡𝐨̂́𝐧𝐠 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐁𝐨𝐱\n『 𝐓𝐢̀𝐧𝐡 𝐓𝐫𝐚̣𝐧𝐠  』   ➣ 𝐓𝐡𝐞̂𝐦 𝐓𝐡𝐚̂́𝐭 𝐁𝐚̣𝐢 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐕𝐚̀𝐨 𝐁𝐨𝐱\n『    𝐔𝐬𝐞𝐫 𝐑𝐨̛̀𝐢    』   ➣  ${name}\n『   𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧   』   ➣ ${timeNow}`,
              attachment: createReadStream(gifPath),
            },
            event.threadID,
          );
        } else
          api.sendMessage(
            {
              body: `━━━━『 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐇𝐞̣̂ 𝐓𝐡𝐨̂́𝐧𝐠 』━━━━\n『 𝐊𝐢́𝐜𝐡 𝐇𝐨𝐚̣𝐭   』   ➣ 𝐂𝐡𝐨̂́𝐧𝐠 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐁𝐨𝐱\n『 𝐓𝐢̀𝐧𝐡 𝐓𝐫𝐚̣𝐧𝐠 』   ➣ 𝐓𝐡𝐞̂𝐦 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐁𝐨𝐱\n『    𝐔𝐬𝐞𝐫 𝐑𝐨̛̀𝐢   』   ➣  ${name}\n『   𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧  』   ➣ ${timeNow}\n『       𝐍𝐨𝐭𝐢        』   ➣ 𝐑𝐨̛̀𝐢 𝐂𝐨𝐧 𝐂𝐚̣̆𝐜 𝐍𝐠𝐨̂̀𝐢 𝐘𝐞̂𝐧 🙂 `,
              attachment: createReadStream(gifhh),
            },
            event.threadID,
          );
      },
    );
  }
};
