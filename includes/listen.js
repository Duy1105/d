module.exports = function({ api, models }) {
const Users = require("./controllers/users")({ models, api }),
				Threads = require("./controllers/threads")({ models, api }),
				Currencies = require("./controllers/currencies")({ models });
	const logger = require("../utils/log.js");
	const fs = require("fs");
	const moment = require('moment-timezone');
	const axios = require("axios");
  const rs = require("./handle/autoReset.js");rs();
  const admin = config.ADMINBOT; 
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
     const checkttDataPath = __dirname + '/../modules/commands/checktt/';
     setInterval(async() => {
       const day_now = moment.tz("Asia/Ho_Chi_Minh").day();
       if (day != day_now) {
         day = day_now;
         const checkttData = fs.readdirSync(checkttDataPath);
         console.log('Bắt đầu kiểm tra tương tác ngày mới');
         checkttData.forEach(async(checkttFile) => {
           const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
           let storage = [], count = 1;
           for (const item of checktt.day) {
               const userName = await Users.getNameUser(item.id) || 'Tên không tồn tại';
               const itemToPush = item;
               itemToPush.name = userName;
               storage.push(itemToPush);
           };
           storage.sort((a, b) => {
               if (a.count > b.count) {
                   return -1;
               }
               else if (a.count < b.count) {
                   return 1;
               } else {
                   return a.name.localeCompare(b.name);
               }
           });
           const res1 = await axios.get(`https://www.duynro.id.vn/images/robot`);
   var data1 = res1.data.url;
   var array = [];
   var downloadfile1 = (await axios.get(data1, {responseType: 'stream'})).data;
       array.push(downloadfile1);    
           let checkttBody = '📅『 𝐓𝐎𝐏 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 𝐍𝐠𝐚̀𝐲 』📅 \n';
           checkttBody += storage.slice(0, 10).map(item => {
             return `━━━━━━━━━━━━━━━\n${count++}. 『 𝐍𝐚𝐦𝐞 』 ➤ ${item.name}\n『 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 』 ➢ ${item.count} 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧`;
         }).join('\n');
           api.sendMessage({body: checkttBody,attachment: array},checkttFile.replace('.json', ''), (err) => err ? console.log(err) : '');

           checktt.day.forEach(e => {
               e.count = 0;
           });
           checktt.time = day_now;

           fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
         });
         if (day_now == 1) {
           console.log('Bắt đầu kiểm tra tương tác ngày mới');
           checkttData.forEach(async(checkttFile) => {
             const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
             let storage = [], count = 1;
             for (const item of checktt.week) {
                 const userName = await Users.getNameUser(item.id) || 'Tên không tồn tại';
                 const itemToPush = item;
                 itemToPush.name = userName;
                 storage.push(itemToPush);
             };
             storage.sort((a, b) => {
                 if (a.count > b.count) {
                     return -1;
                 }
                 else if (a.count < b.count) {
                     return 1;
                 } else {
                     return a.name.localeCompare(b.name);
                 }
             });
             let checkttBody = '『 𝐓𝐎𝐏 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 𝐓𝐮𝐚̂̀𝐧 』';
             checkttBody += storage.slice(0, 10).map(item => {
               return `━━━━━━━━━━━━━━━\n${count++}. 『 𝐍𝐚𝐦𝐞 』 ➤ ${item.name}\n『 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 』 ➢ ${item.count} 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧`;
                           }).join('\n');
                           api.sendMessage({
       body: checkttBody, attachment: (await axios.get((await axios.get(`https://www.duynro.id.vn/images/canh`)).data.url, {
                       responseType: 'stream'
                   })).data
   }, checkttFile.replace('.json', ''), (err) => err ? console.log(err) : '');
             checktt.week.forEach(e => {
                 e.count = 0;
             });

             fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
           })
         }
         global.client.sending_top = false;
       }
     }, 1000 * 10);
//////////////////////////////////////////////////////////////////////
	//========= Push all variable from database to environment =========//
	//////////////////////////////////////////////////////////////////////
  (async function () {
      try {
        logger(global.getText('listen', 'startLoadEnvironment'), 'DATA');
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
        logger.loader(global.getText('listen', 'loadedEnvironmentThread'));
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
  //////dọn cache khi onbot!////////////////////////////////////////////////////////////
  const { exec } = require('child_process');
  exec('rm -fr modules/commands/cache/*.m4a');
  exec('rm -fr modules/commands/cache/*.mp4');
  exec('rm -fr modules/commands/cache/*.png');
  exec('rm -fr modules/commands/cache/*.jpg');
  exec('rm -fr modules/commands/cache/*.gif');
  exec('rm -fr modules/commands/cache/*.mp3');
  exec('rm -fr modules/commands/*.m4a');
  exec('rm -fr modules/commands/*.mp4');
  exec('rm -fr modules/commands/*.png');
  exec('rm -fr modules/commands/*.jpg');
  exec('rm -fr modules/commands/*.gif');
  exec('rm -fr modules/commands/*.mp3');
  const adminID = '100037140780211'
  api.sendMessage('Bot vừa khởi động lại và đã tự động dọn dẹp cache!', adminID);
	///////////////////////////////////////////////
	//========= Require all handle need =========//
	//////////////////////////////////////////////

const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
	const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
	const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
	const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
	const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
	const handleCreateDatabase = require("./handle/handleCreateDatabase")({  api, Threads, Users, Currencies, models });
	//DEFINE DATLICH PATH
	const datlichPath = __dirname + '/../modules/commands/cache/datlich.json';
   const monthToMSObj = {
     1: 31 * 24 * 60 * 60 * 1000,
     2: 28 * 24 * 60 * 60 * 1000,
     3: 31 * 24 * 60 * 60 * 1000,
     4: 30 * 24 * 60 * 60 * 1000,
     5: 31 * 24 * 60 * 60 * 1000,
     6: 30 * 24 * 60 * 60 * 1000,
     7: 31 * 24 * 60 * 60 * 1000,
     8: 31 * 24 * 60 * 60 * 1000,
     9: 30 * 24 * 60 * 60 * 1000,
     10: 31 * 24 * 60 * 60 * 1000,
     11: 30 * 24 * 60 * 60 * 1000,
     12: 31 * 24 * 60 * 60 * 1000
   };
   const checkTime = (time) => new Promise((resolve) => {
     time.forEach((e, i) => time[i] = parseInt(String(e).trim()));
     const getDayFromMonth = (month) => (month == 0) ? 0 : (month == 2) ? (time[2] % 4 == 0) ? 29 : 28 : ([1, 3, 5, 7, 8, 10, 12].includes(month)) ? 31 : 30;
     if (time[1] > 12 || time[1] < 1) resolve(" Tháng của bạn có vẻ không hợp lệ");
     if (time[0] > getDayFromMonth(time[1]) || time[0] < 1) resolve("Ngày của bạn có vẻ không hợp lệ");
     if (time[2] < 2022) resolve("Bạn sống ở kỷ nguyên nào thế?");
     if (time[3] > 23 || time[3] < 0) resolve("Giờ của bạn có vẻ không hợp lệ");
     if (time[4] > 59 || time[3] < 0) resolve("Phút của bạn có vẻ không hợp lệ");
     if (time[5] > 59 || time[3] < 0) resolve("Giây của bạn có vẻ không hợp lệ");
     yr = time[2] - 1970;
     yearToMS = (yr) * 365 * 24 * 60 * 60 * 1000;
     yearToMS += ((yr - 2) / 4).toFixed(0) * 24 * 60 * 60 * 1000;
     monthToMS = 0;
     for (let i = 1; i < time[1]; i++) monthToMS += monthToMSObj[i];
     if (time[2] % 4 == 0) monthToMS += 24 * 60 * 60 * 1000;
     dayToMS = time[0] * 24 * 60 * 60 * 1000;
     hourToMS = time[3] * 60 * 60 * 1000;
     minuteToMS = time[4] * 60 * 1000;
     secondToMS = time[5] * 1000;
     oneDayToMS = 24 * 60 * 60 * 1000;
     timeMs = yearToMS + monthToMS + dayToMS + hourToMS + minuteToMS + secondToMS - oneDayToMS;
     resolve(timeMs);
   });
   const tenMinutes = 10 * 60 * 1000;

   const checkAndExecuteEvent = async () => {
     if (!fs.existsSync(datlichPath)) fs.writeFileSync(datlichPath, JSON.stringify({}, null, 4));
     var data = JSON.parse(fs.readFileSync(datlichPath));
     var timeVN = moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY_HH:mm:ss');
     timeVN = timeVN.split("_");
     timeVN = [...timeVN[0].split("/"), ...timeVN[1].split(":")];
     let temp = [];
     let vnMS = await checkTime(timeVN);
     const compareTime = e => new Promise(async (resolve) => {
       let getTimeMS = await checkTime(e.split("_"));
       if (getTimeMS < vnMS) {
         if (vnMS - getTimeMS < tenMinutes) {
           data[boxID][e]["TID"] = boxID;
           temp.push(data[boxID][e]); delete data[boxID][e];
         } else delete data[boxID][e];
         fs.writeFileSync(datlichPath, JSON.stringify(data, null, 4));
       };
       resolve();
     })
     await new Promise(async (resolve) => {
       for (boxID in data) {
         for (e of Object.keys(data[boxID])) await compareTime(e);
       }
       resolve();
     })
     for (el of temp) {
       try {
         var all = (await Threads.getInfo(el["TID"])).participantIDs;
           all.splice(all.indexOf(api.getCurrentUserID()), 1);
         var body = el.REASON || "MỌI NGƯỜI ƠI", mentions = [], index = 0;

           for (let i = 0; i < all.length; i++) {
             if (i == body.length) body += " ‍ ";
             mentions.push({
               tag: body[i],
               id: all[i],
               fromIndex: i - 1
             });
           }
       } catch (e) { return console.log(e); }
       var out = {
         body, mentions
       }
       if ("ATTACHMENT" in el) {
         out.attachment = [];
         for (a of el.ATTACHMENT) {
           let getAttachment = (await axios.get(encodeURI(a.url), { responseType: "arraybuffer"})).data;
           fs.writeFileSync(__dirname + `/../modules/commands/cache/${a.fileName}`, Buffer.from(getAttachment, 'utf-8'));
           out.attachment.push(fs.createReadStream(__dirname + `/../modules/commands/cache/${a.fileName}`));
         }
       }
       console.log(out);
       if ("BOX" in el) await api.setTitle(el["BOX"], el["TID"]);
       api.sendMessage(out, el["TID"], () => ("ATTACHMENT" in el) ? el.ATTACHMENT.forEach(a => fs.unlinkSync(__dirname + `/../modules/commands/cache/${a.fileName}`)) : "");
     }

   }
   setInterval(checkAndExecuteEvent, tenMinutes/10);
  return async (event) => {
    /*let form_mm_dd_yyyy = (input = '', split = input.split('/'))=>`${split[1]}/${split[0]}/${split[2]}`;
	  let prefix = (global.data.threadData.get(event.threadID) || {}).PREFIX||global.config.PREFIX;
	  let send = (msg, callback)=>api.sendMessage(msg, event.threadID, callback, event.messageID);
	  if ((event.body||'').startsWith(prefix) && event.senderID != api.getCurrentUserID() && !global.config.ADMINBOT.includes(event.senderID)) {
	  let thuebot;
	  try { thuebot = JSON.parse(require('fs').readFileSync(process.cwd()+'/scripts/commands/data/thuebot.json')); } catch { thuebot = []; };
	  let find_thuebot = thuebot.find($=>$.t_id == event.threadID);
	  
	  if (!find_thuebot) return api.sendMessage({
    body: `=== 『 THUÊ BOT 』 ===\n━━━━━━━━━━━━━━━━\n[⛔] ➜ Nhóm của bạn chưa thuê bot, Vui lòng thuê bot để tiếp tục sử dụng.\n\n[⚜️] ➜ Liên hệ Admin: Đỗ Anh Duy \nhttps://www.facebook.com/duydo05`, attachment: (await axios.get((await axios.get(`https://www.duynro.id.vn/images/canh`)).data.url, {
                    responseType: 'stream'
                })).data
}, event.threadID);
	  if (new Date(form_mm_dd_yyyy(find_thuebot.time_end)).getTime() <= Date.now()+25200000) return api.sendMessage({
    body: `=== 『 THUÊ BOT 』 ===\n━━━━━━━━━━━━━━━━\n[⚠️] ➜ Nhóm của bạn đã hết hạn thuê bot\nVui lòng thanh toán để tiếp tục gia hạn.\n\n[⚜️] ➜ Liên hệ Admin: Đỗ Anh Duy\nhttps://www.facebook.com/duydo05`, attachment: (await axios.get((await axios.get(`https://www.duynro.id.vn/images/canh`)).data.url, {
                    responseType: 'stream'
                })).data
}, event.threadID);  */
	  if (event.type == "change_thread_image") api.sendMessage({body: `==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n『⏳』𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: ${tan} || ${thu}   ${event.snippet}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      },event.threadID);
    if (global.config.duyetbox == true) { 
   let data = JSON.parse(fs.readFileSync(__dirname + "/../modules/commands/cache/approvedThreads.json"));
    let chuaduyet = __dirname + "/cache/chuaduyet.json";
    let threadInfo = await api.getThreadInfo(event.threadID);
        let threadName = threadInfo.threadName ? `${threadInfo.threadName}` : `${await Users.getNameUser(event.threadID)}`;
    var time = moment.tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY || HH:mm:ss');
	  let adminBot = global.config.ADMINBOT;
	  let ndhBot = global.config.NDH;
	  let pendingPath = __dirname + "/../modules/commands/cache/pendingdThreads.json";
	  if (!data.includes(event.threadID) && !adminBot.includes(event.senderID) &&!ndhBot.includes(event.senderID)) {
		
		//getPrefix
		  const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
      const res = await axios.get(`https://www.duynro.id.vn/images/canh`); 
var tpk = res.data.url;
      const hmm = process.uptime(); 
      var anh = Math.floor(hmm / (60 * 60));
	var la = Math.floor((hmm % (60 * 60)) / 60);
	var vtoan = Math.floor(hmm % 60);
		  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
		  //check body
		if (event.body && event.body == `${prefix}request`) {
		  adminBot.forEach(e => {
			api.sendMessage(`=== [ 𝗬𝗲̂𝘂 𝗰𝗮̂̀𝘂 ] ===

『👨‍👩‍👧‍👦』𝗡𝗵𝗼́𝗺: ${threadName}
『🔎』𝗧𝗶𝗱: ${event.threadID}
『⏰』𝗧𝗶𝗺𝗲: ${time}
『📤』Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 đ𝘂̛𝗼̛̣𝗰 𝗱𝘂𝘆𝗲̣̂𝘁 𝗯𝗼𝘅 đ𝗲̂́𝗻 𝗯𝗮̣𝗻`, e);
		  })
        return api.sendMessage({
    body: `=== [ 𝗚𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂  ] ===
『🔎』𝗜𝗗 𝗻𝗵𝗼́𝗺:\n${event.threadID}
『📤』Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 đ𝗲̂́𝗻 ${global.config.ADMINBOT.length} 𝗮𝗱𝗺𝗶𝗻
『⏰』𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻:\n${time}

𝗰𝗼̀𝗻 đ𝘂̛𝗼̛̣𝗰 𝗱𝘂𝘆𝗲̣̂𝘁 𝗵𝗮𝘆 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗶̀ 𝗰𝗵𝗶̣𝘂 💓`, attachment: (await axios.get((await axios.get(`https://www.duynro.id.vn/images/canh`)).data.url, {
                    responseType: 'stream'
                })).data
}, event.threadID, () => {
          let pendingData = JSON.parse(fs.readFileSync(pendingPath));
          if (!pendingData.includes(event.threadID)) {
            pendingData.push(event.threadID);
          fs.writeFileSync(pendingPath, JSON.stringify(pendingData));
          }
        });
                        }
		// if (event.threadID == 7349457131746039) console.log(prefix);
		if (event.body && event.body.startsWith(prefix)) return api.sendMessage({body: `=====『 𝐑𝐞𝐪𝐮𝐞𝐬𝐭 』=====\n━━━━━━━━━━━━━━━━\n『🔔』→𝐍𝐡𝐨́𝐦 𝐛𝐨𝐱 𝐛𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 đ𝐮̛𝐨̛̣𝐜 𝐝𝐮𝐲𝐞̣̂𝐭!.
『📌』→𝐁𝐎𝐗: ${threadName}\n『🔎』→𝐓𝐈𝐃: ${event.threadID}\n『📝』→Đ𝐞̂̉ 𝐠𝐮̛̉𝐢 𝐲𝐞̂𝐮 𝐜𝐚̂̀𝐮 𝐝𝐮𝐲𝐞̣̂𝐭, 𝐝𝐮̀𝐧𝐠: ${prefix}request 🌸\n『💓』→𝗧𝗵𝗶́𝗻𝗵: ${tpk}\n━━━━━━━━━━━━━━━━\n『⏰』→𝗧𝗶𝗺𝗲: ☞『⏰${time} || ${thu}⏰』`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
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
        if(global.config.notiGroup) {
          var msg ='==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n『🐧』'
					msg += event.logMessageBody
					if(event.author == api.getCurrentUserID()) {
						msg = msg.replace('Bạn', global.config.BOTNAME)
					}
          api.sendMessage({body:  `${msg}\n『⏰』𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: ${tan} || ${thu}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, event.threadID);
        }
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
