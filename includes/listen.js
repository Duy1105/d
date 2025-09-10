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
  setInterval(async () => {
    try {
      const day_now = moment.tz("Asia/Ho_Chi_Minh").day();
      if (day != day_now) {
        day = day_now;
        const checkttData = fs.readdirSync(checkttDataPath);
        logger("--> CHECKTT: Ngày Mới");
        checkttData.forEach(async (checkttFile) => {
          const checktt = JSON.parse(
            fs.readFileSync(checkttDataPath + checkttFile)
          );

          if (!checktt.last)
            checktt.last = {
              time: day_now,
              day: [],
              week: [],
            };

          let storage = [],
            count = 1;
          for (const item of checktt.day) {
            const userName =
              (await Users.getNameUser(item.id)) || "Facebook User";
            const itemToPush = item;
            itemToPush.name = userName;
            storage.push(itemToPush);
          }
          storage.sort((a, b) => {
            if (a.count > b.count) {
              return -1;
            } else if (a.count < b.count) {
              return 1;
            } else {
              return a.name.localeCompare(b.name);
            }
          });
          let checkttBody = " [ Top 10 Tương Tác Ngày ]\n────────────\n";
          checkttBody += storage
            .slice(0, 10)
            .map((item) => {
              return `${count++}.${
                item.name
              } - ${item.count} tin nhắn.`;
            })
            .join("\n");
          api.sendMessage(
            `${checkttBody}\n─────────────\n⚡ Các bạn khác cố gắng tương tác nếu muốn lên top nha :3`,
            checkttFile.replace(".json", ""),
            (err) => (err ? logger(err) : "")
          );
          checktt.last.day = JSON.parse(JSON.stringify(checktt.day));
          checktt.day.forEach((e) => {
            e.count = 0;
          });
          checktt.time = day_now;

          fs.writeFileSync(
            checkttDataPath + checkttFile,
            JSON.stringify(checktt, null, 4)
          );
        });
        if (day_now == 1) {
          logger("--> CHECKTT: Tuần Mới");
          checkttData.forEach(async (checkttFile) => {
            const checktt = JSON.parse(
              fs.readFileSync(checkttDataPath + checkttFile)
            );

            if (!checktt.last)
              checktt.last = {
                time: day_now,
                day: [],
                week: [],
              };

            let storage = [],
              count = 1;
            for (const item of checktt.week) {
              const userName =
                (await Users.getNameUser(item.id)) || "Facebook User";
              const itemToPush = item;
              itemToPush.name = userName;
              storage.push(itemToPush);
            }
            storage.sort((a, b) => {
              if (a.count > b.count) {
                return -1;
              } else if (a.count < b.count) {
                return 1;
              } else {
                return a.name.localeCompare(b.name);
              }
            });
            let checkttBody = "[ Top 10 Tương Tác Tuần ]\n─────────────\n";
            checkttBody += storage
              .slice(0, 10)
              .map((item) => {
                return `${count++}.${
                  item.name
                } - ${item.count} tin nhắn.`;
              })
              .join("\n");
            api.sendMessage(
              `${checkttBody}\n─────────────\n⚡ Các bạn khác cố gắng tương tác nếu muốn lên top nha :>`,
              checkttFile.replace(".json", ""),
              (err) => (err ? logger(err) : "")
            );
            checktt.last.week = JSON.parse(JSON.stringify(checktt.week));
            checktt.week.forEach((e) => {
              e.count = 0;
            });

            fs.writeFileSync(
              checkttDataPath + checkttFile,
              JSON.stringify(checktt, null, 4)
            );
          });
        }
        global.client.sending_top = true;
      }
    } catch (e) {}
  }, 1000 * 10);
//////////////////////////////////////////////////////////////////////
	//========= Push all variable from database to environment =========//
	//////////////////////////////////////////////////////////////////////
  (async function () {
      try {
        let threads = await Threads.getAll(),
          users = await Users.getAll(['userID', 'name', 'data']),
          currencies = await Currencies.getAll(['userID']);
        for (const data of threads) {
          const idThread = String(data.threadID);
          global.data.allThreadID.push(idThread),
            global.data.threadData.set(idThread, data['data'] || {}),
            global.data.threadInfo.set(idThread, data.threadInfo || {});
          if (data['data'] && data['data']['banned'] == !![])
            global.data.threadBanned.set(idThread,
              {
                'reason': data['data']['reason'] || '',
                'dateAdded': data['data']['dateAdded'] || ''
              });
          if (data['data'] && data['data']['commandBanned'] && data['data']['commandBanned']['length'] != 0)
            global['data']['commandBanned']['set'](idThread, data['data']['commandBanned']);
          if (data['data'] && data['data']['NSFW']) global['data']['threadAllowNSFW']['push'](idThread);
        }
        for (const dataU of users) {
          const idUsers = String(dataU['userID']);
          global.data['allUserID']['push'](idUsers);
          if (dataU.name && dataU.name['length'] != 0) global.data.userName['set'](idUsers, dataU.name);
          if (dataU.data && dataU.data.banned == 1) global.data['userBanned']['set'](idUsers, {
            'reason': dataU['data']['reason'] || '',
            'dateAdded': dataU['data']['dateAdded'] || ''
          });
          if (dataU['data'] && dataU.data['commandBanned'] && dataU['data']['commandBanned']['length'] != 0)
            global['data']['commandBanned']['set'](idUsers, dataU['data']['commandBanned']);
        }
          for (const dataC of currencies) global.data.allCurrenciesID.push(String(dataC['userID']));
      } catch (error) {
          return logger.loader(global.getText('listen', 'failLoadEnvironment', error), 'error');
      }
  }());
  const admin = config.ADMINBOT;
  logger("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓", "[ DUY ]");
  logger('⚙️  Lệnh: ' + (global.client.commands.size) + ' ━━ Sự kiện: ' + (global.client.events.size), "[ DUY ]");
  logger('━━━━━━━━━━━ ' + (Date.now() - global.client.timeStart) + ' ms ━━━━━━━━━━━', "[ DUY ]")
  for (let i = 0; i < admin.length; i++) {
    logger(` ID ADMIN ${i + 1}: ${admin[i] || "Trống"}`, "[ DUY ]");
  }
  logger(` ID BOT: ${api.getCurrentUserID()}`, "[ DUY ]");
  logger(` PREFIX: ${global.config.PREFIX}`, "[ DUY ]");
  logger(` NAME BOT: ${global.config.BOTNAME || "Mirai"}`, "[ DUY ]");
  logger("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛", "[ DUY ]");
  //////dọn cache khi onbot!////////////////////////////////////////////////////////////
  const { exec } = require('child_process');
  exec('rm -fr modules/commands/cache/*.{m4a,mp4,png,jpg,gif,mp3} modules/commands/*.{m4a,mp4,png,jpg,gif,mp3}', ()=>{});
	///////////////////////////////////////////////
	//========= Require all handle need =========//
	//////////////////////////////////////////////
const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
	const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
	const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
	const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
	const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
	const handleCreateDatabase = require("./handle/handleCreateDatabase")({  api, Threads, Users, Currencies, models });
  const handleRefresh = require("./handle/handleRefesh.js")({ api, models, Users, Threads, Currencies });
  
  return async (event) => {
    if (global.config.duyetbox == true) { 
   let data = JSON.parse(fs.readFileSync(__dirname + "/../modules/commands/cache/approvedThreads.json"));
    let threadInfo = await api.getThreadInfo(event.threadID);
        let threadName = threadInfo.threadName ? `${threadInfo.threadName}` : `${await Users.getNameUser(event.threadID)}`;
    var time = moment.tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY || HH:mm:ss');
	  let adminBot = global.config.ADMINBOT;
	  let ndhBot = global.config.NDH;
	  let pendingPath = __dirname + "/../modules/commands/cache/pendingdThreads.json";
	  if (!data.includes(event.threadID) && !adminBot.includes(event.senderID) &&!ndhBot.includes(event.senderID)) {
		  const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
		  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
		if (event.body && event.body == `${prefix}request`) {
		  adminBot.forEach(e => {
			api.sendMessage(`=== [ 𝗬𝗲̂𝘂 𝗰𝗮̂̀𝘂 ] ===
『👨‍👩‍👧‍👦』𝗡𝗵𝗼́𝗺: ${threadName}
『🔎』𝗧𝗶𝗱: ${event.threadID}
『⏰』𝗧𝗶𝗺𝗲: ${time}
『📤』Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 đ𝘂̛𝗼̛̣𝗰 𝗱𝘂𝘆𝗲̣̂𝘁 𝗯𝗼𝘅 đ𝗲̂́𝗻 𝗯𝗮̣𝗻`, e);
		  })
        return api.sendMessage(`=== [ 𝗚𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂  ] ===
『🔎』𝗜𝗗 𝗻𝗵𝗼́𝗺:\n${event.threadID}
『📤』Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 đ𝗲̂́𝗻 ${global.config.ADMINBOT.length} 𝗮𝗱𝗺𝗶𝗻
『⏰』𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻:\n${time} \n𝗰𝗼̀𝗻 đ𝘂̛𝗼̛̣𝗰 𝗱𝘂𝘆𝗲̣̂𝘁 𝗵𝗮𝘆 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗶̀ 𝗰𝗵𝗶̣𝘂 💓`,event.threadID, () => {
          let pendingData = JSON.parse(fs.readFileSync(pendingPath));
          if (!pendingData.includes(event.threadID)) {
            pendingData.push(event.threadID);
          fs.writeFileSync(pendingPath, JSON.stringify(pendingData));
          }
        });
                        }
		if (event.body && event.body.startsWith(prefix)) return api.sendMessage(`=====『 𝐑𝐞𝐪𝐮𝐞𝐬𝐭 』=====\n━━━━━━━━━━━━━━━━\n『🔔』→𝐍𝐡𝐨́𝐦 𝐛𝐨𝐱 𝐛𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 đ𝐮̛𝐨̛̣𝐜 𝐝𝐮𝐲𝐞̣̂𝐭!.
『📌』→𝐁𝐎𝐗: ${threadName}\n『🔎』→𝐓𝐈𝐃: ${event.threadID}\n『📝』→Đ𝐞̂̉ 𝐠𝐮̛̉𝐢 𝐲𝐞̂𝐮 𝐜𝐚̂̀𝐮 𝐝𝐮𝐲𝐞̣̂𝐭, 𝐝𝐮̀𝐧𝐠: ${prefix}request 🌸\n━━━━━━━━━━━━━━━━\n『⏰』→𝗧𝗶𝗺𝗲: ☞『⏰${time} || ${thu}⏰』`,event.threadID, event.messageID);
	  }
	  };
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
           if(global.config.notiGroup) {
             var msg = ''
             msg += event.logMessageBody
             if(event.author == api.getCurrentUserID()) {
               msg = msg.replace('Bạn', global.config.BOTNAME)
             }
             return api.sendMessage({
         body: `${msg}`}, event.threadID);
           }
           break;
      case "message_reaction":
        var { iconUnsend } = global.config
        if(iconUnsend.status && event.senderID == api.getCurrentUserID() && event.reaction == iconUnsend.icon) {
          api.unsendMessage(event.messageID)
        }
        handleReaction({ event });
        break;
      default:
        break;
    }
  };
};