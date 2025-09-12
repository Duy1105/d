module.exports = function({ api, models }) {
const Users = require("./controllers/users")({ models, api }),
			Threads = require("./controllers/threads")({ models, api }),
			Currencies = require("./controllers/currencies")({ models });
	const logger = require("../utils/log.js");
	const fs = require("fs");
	const moment = require('moment-timezone');
	const axios = require("axios");
  const rs = require("./handle/autoReset.js");rs();
  var day = moment.tz("Asia/Ho_Chi_Minh").day();
  var tan = moment.tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY || HH:mm:ss');
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'

  const checkttDataPath = __dirname + "/../modules/commands/tt/";
  async function sendTop(type, title, threadID, items) {
    let storage = [];
    let count = 1;
    for (const item of items) {
      const userName = (await Users.getNameUser(item.id)) || "Facebook User";
      storage.push({ ...item, name: userName });
    }
    storage.sort((a, b) =>
      b.count !== a.count ? b.count - a.count : a.name.localeCompare(b.name)
    );
    let body = `${title}\n─────────────\n` +
      storage
        .slice(0, 10)
        .map(i => `${count++}. ${i.name} - ${i.count} tin nhắn.`)
        .join("\n");
    api.sendMessage(
      `${body}\n─────────────\n⚡ Các bạn khác cố gắng tương tác nếu muốn lên top nha :3`,
      threadID,
      err => err && logger(err)
    );
  }
  setInterval(async () => {
    try {
      const day_now = moment.tz("Asia/Ho_Chi_Minh").day();
      if (day != day_now) {
        day = day_now;
        logger("--> CHECKTT: Ngày Mới");
        const files = fs.readdirSync(checkttDataPath);
        for (const file of files) {
          const filePath = checkttDataPath + file;
          const checktt = JSON.parse(fs.readFileSync(filePath));
          checktt.last ??= { time: day_now, day: [], week: [] };
          // top ngày
          await sendTop("day", "[ Top 10 Tương Tác Ngày ]", file.replace(".json", ""), checktt.day);
          checktt.last.day = [...checktt.day];
          checktt.day.forEach(e => (e.count = 0));
          checktt.time = day_now;
          // top tuần
          if (day_now == 1) {
            logger("--> CHECKTT: Tuần Mới");
            await sendTop("week", "[ Top 10 Tương Tác Tuần ]", file.replace(".json", ""), checktt.week);
            checktt.last.week = [...checktt.week];
            checktt.week.forEach(e => (e.count = 0));
          }
          fs.writeFileSync(filePath, JSON.stringify(checktt, null, 4));
        }
        global.client.sending_top = true;
      }
    } catch (e) {
      logger("CHECKTT error: " + e.message, "error");
    }
  }, 10 * 1000);
//////////////////////////////////////////////////////////////////////
	//========= Push all variable from database to environment =========//
	//////////////////////////////////////////////////////////////////////
  //========= Push all variable from database to environment =========//
  (async () => {
    try {
      const threads = await Threads.getAll();
      const users = await Users.getAll(["userID", "name", "data"]);
      const currencies = await Currencies.getAll(["userID"]);
      // Threads
      for (const t of threads) {
        const id = String(t.threadID);
        global.data.allThreadID.push(id);
        global.data.threadData.set(id, t.data || {});
        global.data.threadInfo.set(id, t.threadInfo || {});
        if (t.data?.banned)
          global.data.threadBanned.set(id, {
            reason: t.data.reason || "",
            dateAdded: t.data.dateAdded || "",
          });
        if (t.data?.commandBanned?.length)
          global.data.commandBanned.set(id, t.data.commandBanned);
        if (t.data?.NSFW) global.data.threadAllowNSFW.push(id);
      }
      // Users
      for (const u of users) {
        const id = String(u.userID);
        global.data.allUserID.push(id);
        if (u.name) global.data.userName.set(id, u.name);
        if (u.data?.banned == 1)
          global.data.userBanned.set(id, {
            reason: u.data.reason || "",
            dateAdded: u.data.dateAdded || "",
          });
        if (u.data?.commandBanned?.length)
          global.data.commandBanned.set(id, u.data.commandBanned);
      }
      // Currencies
      for (const c of currencies) global.data.allCurrenciesID.push(String(c.userID));
    } catch (err) {
      logger.loader(global.getText("listen", "failLoadEnvironment", err), "error");
    }
  })();
  //========= Startup Logs =========//
  const admin = config.ADMINBOT;
  logger("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓", "[ DUY ]");
  logger(`⚙️  Lệnh: ${global.client.commands.size} ━━ Sự kiện: ${global.client.events.size}`, "[ DUY ]");
  logger(`━━━━━━━━━━━ ${Date.now() - global.client.timeStart} ms ━━━━━━━━━━━`, "[ DUY ]");
  admin.forEach((id, i) => logger(` ID ADMIN ${i + 1}: ${id || "Trống"}`, "[ DUY ]"));
  logger(` ID BOT: ${api.getCurrentUserID()}`, "[ DUY ]");
  logger(` PREFIX: ${global.config.PREFIX}`, "[ DUY ]");
  logger(` NAME BOT: ${global.config.BOTNAME || "Mirai"}`, "[ DUY ]");
  logger("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛", "[ DUY ]");
  //========= Clear cache on startup =========//
  const { exec } = require("child_process");
  exec(
    "rm -fr modules/commands/cache/*.{m4a,mp4,png,jpg,gif,mp3} modules/commands/*.{m4a,mp4,png,jpg,gif,mp3}",
    () => {}
  );
  //========= Require all handle need =========//
  const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
	const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
	const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
	const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
	const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
	const handleCreateDatabase = require("./handle/handleCreateDatabase")({  api, Threads, Users, Currencies, models });
  const handleRefresh = require("./handle/handleRefesh.js")({ api, models, Users, Threads, Currencies });
  
return async (event) => {
  if (global.config.duyetbox) {
    const approvedPath = __dirname + "/../modules/commands/cache/approvedThreads.json";
    const pendingPath = __dirname + "/../modules/commands/cache/pendingdThreads.json";
    let approved = JSON.parse(fs.readFileSync(approvedPath));
    let threadInfo = await api.getThreadInfo(event.threadID);
    let threadName = threadInfo.threadName || await Users.getNameUser(event.threadID);
    let time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
    const { ADMINBOT, NDH } = global.config;
    if (!approved.includes(event.threadID) && !ADMINBOT.includes(event.senderID) && !NDH.includes(event.senderID)) {
      const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
      const prefix = threadSetting.PREFIX || global.config.PREFIX;
      // Gửi request duyệt
      if (event.body === `${prefix}request`) {
        ADMINBOT.forEach(e => {
          api.sendMessage(
            `=== [ 𝗬𝗲̂𝘂 𝗰𝗮̂̀𝘂 ] ===
『👨‍👩‍👧‍👦』𝗡𝗵𝗼́𝗺: ${threadName}
『🔎』𝗧𝗶𝗱: ${event.threadID}
『⏰』𝗧𝗶𝗺𝗲: ${time}
『📤』Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 đ𝗲̂́𝗻 𝗯𝗮̣𝗻`,
            e
          );
        });
        return api.shareContact(
          `=== [ 𝗚𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 ] ===
『🔎』𝗜𝗗 𝗻𝗵𝗼́𝗺: ${event.threadID}
『📤』Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 đ𝗲̂́𝗻 ${ADMINBOT.length} admin
『⏰』𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${time}
『❤️』𝗖𝗼́ đ𝘂̛𝗼̛̣𝗰 𝗱𝘂𝘆𝗲̣̂𝘁 𝗵𝗮𝘆 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗶̀ 𝗰𝗵𝗶̣𝘂`,global.config.ADMINBOT[0],
          event.threadID,
          () => {
            let pending = JSON.parse(fs.readFileSync(pendingPath));
            if (!pending.includes(event.threadID)) {
              pending.push(event.threadID);
              fs.writeFileSync(pendingPath, JSON.stringify(pending));
            }
          }
        );
      }
      // Nếu chưa được duyệt mà vẫn dùng lệnh
      if (event.body?.startsWith(prefix)) {
        return api.shareContact(
          `=====『 𝐑𝐞𝐪𝐮𝐞𝐬𝐭 』=====
━━━━━━━━━━━━━━━━
『🔔』Nhóm chưa được duyệt!
『📌』𝗕𝗼𝘅: ${threadName}
『🔎』𝗧𝗜𝗗: ${event.threadID}
『📝』Dùng: ${prefix}request để gửi yêu cầu duyệt
━━━━━━━━━━━━━━━━
『⏰』𝗧𝗶𝗺𝗲: ${time} || ${thu}`,
          global.config.ADMINBOT[0],
          event.threadID,
          event.messageID
        );
      }
    }
  }
  //========= Handle event =========//
  switch (event.type) {
    case "message":
    case "message_reply":
    case "message_unsend":
      handleCreateDatabase({ event });
      handleCommand({ event });
      handleReply({ event });
      handleCommandEvent({ event });
      break;
    case "event":
      handleEvent({ event });
      handleRefresh({ event });
      if (global.config.notiGroup) {
        let msg = event.logMessageBody;
        if (event.author == api.getCurrentUserID()) msg = msg.replace("Bạn", global.config.BOTNAME);
        return api.sendMessage({ body: msg }, event.threadID);
      }
      break;
    case "message_reaction":
      const { iconUnsend } = global.config;
      if (iconUnsend.status && event.senderID == api.getCurrentUserID() && event.reaction == iconUnsend.icon) {
        api.unsendMessage(event.messageID);
      }
      handleReaction({ event });
      break;
    default:
      break;
  }
};
  };