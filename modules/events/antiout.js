module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "0.0.2",
  credits: "DungUwU", // duy mod
  description: "Ngăn chặn thành viên rời nhóm",
  dependencies: {
    "fs-extra": "",
    path: "",
  },
};

module.exports.onLoad = () => {
  const fs = require("fs-extra");
  const request = require("request");
  const dirMaterial = __dirname + `/cache/`;

  if (!fs.existsSync(dirMaterial)) {
    fs.mkdirSync(dirMaterial, { recursive: true });
  }

  const files = [
    { name: "tb.mp3", url: "https://tinyurl.com/yn29eovk" },
    { name: "tc.mp3", url: "https://tinyurl.com/yw8t5ktw" },
  ];

  for (const file of files) {
    if (!fs.existsSync(dirMaterial + file.name)) {
      request(file.url).pipe(fs.createWriteStream(dirMaterial + file.name));
    }
  }
};

module.exports.run = async ({ event, api, Threads, Users }) => {
  const { createReadStream } = require("fs-extra");
  const path = require("path");
  const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY)");
  const days = {
    Sunday: "𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭",
    Monday: "𝐓𝐡𝐮̛́ 𝟐",
    Tuesday: "𝐓𝐡𝐮̛́ 𝟑",
    Wednesday: "𝐓𝐡𝐮̛́ 𝟒",
    Thursday: "𝐓𝐡𝐮̛́ 𝟓",
    Friday: "𝐓𝐡𝐮̛́ 𝟔",
    Saturday: "𝐓𝐡𝐮̛́ 𝟕",
  };
  const thu = days[moment.tz("Asia/Ho_Chi_Minh").format("dddd")];

  const threadData = (await Threads.getData(event.threadID)).data || {};
  if (!threadData.antiout) return;

  if (event.logMessageData.leftParticipantFbId === api.getCurrentUserID()) return;

  const userID = event.logMessageData.leftParticipantFbId;
  const name =
    global.data.userName.get(userID) || (await Users.getNameUser(userID));
  const type =
    event.author === userID ? "tự rời" : "bị quản trị viên đá";

  if (type === "tự rời") {
    const dirMaterial = path.join(__dirname, "cache", "antiout", "randomgif");
    const tbPath = path.join(dirMaterial, "tb.mp3");
    const tcPath = path.join(dirMaterial, "tc.mp3");

    api.addUserToGroup(userID, event.threadID, (error) => {
      const message = error
        ? `『 𝐓𝐢̀𝐧𝐡 𝐓𝐫𝐚̣𝐧𝐠 』   ➣ 𝐓𝐡𝐞̂𝐦 𝐓𝐡𝐚̂́𝐭 𝐁𝐚̣𝐢`
        : `『 𝐓𝐢̀𝐧𝐡 𝐓𝐫𝐚̣𝐧𝐠 』   ➣ 𝐓𝐡𝐞̂𝐦 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠`;

      api.sendMessage(
        {
          body: `━━━━『 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐇𝐞̣̂ 𝐓𝐡𝐨̂́𝐧𝐠 』━━━━\n${message}\n『    𝐔𝐬𝐞𝐫 𝐑𝐨̛̀𝐢    』   ➣  ${name}\n『   𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧   』   ➣ ${timeNow}\n『       𝐍𝐨𝐭𝐢        』   ➣ 𝐑𝐨̛̀𝐢 𝐂𝐨𝐧 𝐂𝐚̣̆𝐜 𝐍𝐠𝐨̂̀𝐢 𝐘𝐞̂𝐧 🙂 `,
          attachment: createReadStream(error ? tcPath : tbPath),
        },
        event.threadID,
      );
    });
  }
};
