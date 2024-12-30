module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const fs = require("fs");
  const stringSimilarity = require('string-similarity'),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const axios = require('axios');
  const moment = require("moment-timezone");
  return async function ({ event }) {
    const dateNow = Date.now()
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, NDH, DeveloperMode, adminOnly, keyAdminOnly, ndhOnly, adminPaseOnly } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;
    var { body, senderID, threadID, messageID } = event;
    const tst = (await Threads.getData(String(threadID))).data || {};
     const prefixBox = (tst.hasOwnProperty("PREFIX")) ? tst.PREFIX : global.config.PREFIX;
    var senderID = String(senderID),
      threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {}
    const prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : PREFIX)})\\s*`);
    if (!prefixRegex.test(body)) return;
    const adminbot = require('./../../config.json');
    let getDay = moment.tz("Asia/Ho_Chi_Minh").day();
    let usgPath = __dirname + '/usages.json';
    if (!fs.existsSync(usgPath)) fs.writeFileSync(usgPath, JSON.stringify({}));
    let usages = JSON.parse(fs.readFileSync(usgPath));
    if (!(senderID in usages)) {
      usages[senderID] = {};
      usages[senderID].diemdanh = 10;
      usages[senderID].usages = 100;
    };
    
    if(!global.data.allThreadID.includes(threadID) && !ADMINBOT.includes(senderID) && adminbot.adminPaOnly == true)
    return api.sendMessage({body:`𝗠𝗢𝗗𝗘 » 𝗖𝗵𝗶̉ 𝗰𝗼́ 𝗮𝗱𝗺𝗶𝗻 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 𝘁𝗿𝗼𝗻𝗴 𝗶𝗻𝗯𝗼𝘅 𝗿𝗶𝗲̂𝗻𝗴 💬`,attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-w8a6.onrender.com/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID)
    ////end 
    if (!ADMINBOT.includes(senderID) && adminbot.adminOnly == true) {
      if (!ADMINBOT.includes(senderID) && adminbot.adminOnly == true) return api.sendMessage({body:`𝗠𝗢𝗗𝗘 » 𝗖𝗵𝗶̉ 𝗮𝗱𝗺𝗶𝗻 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 👑`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-w8a6.onrender.com/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID)
    }
    if (!NDH.includes(senderID) && !ADMINBOT.includes(senderID) && adminbot.ndhOnly == true) {
      if (!NDH.includes(senderID) && !ADMINBOT.includes(senderID) && adminbot.ndhOnly == true) return api.sendMessage({body:`𝗠𝗢𝗗𝗘 » 𝗖𝗵𝗶̉ 𝘀𝘂𝗽𝗽𝗼𝗿𝘁 𝗯𝗼𝘁 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 👾`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-w8a6.onrender.com/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID)
    }
    const dataAdbox = require('./../../modules/commands/cache/data.json');
    var threadInf = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const findd = threadInf.adminIDs.find(el => el.id == senderID);
        if (dataAdbox.adminbox.hasOwnProperty(threadID) && dataAdbox.adminbox[threadID] == true && !ADMINBOT.includes(senderID) && !findd && event.isGroup == true) return api.sendMessage({body:`𝗠𝗢𝗗𝗘 » 𝗖𝗵𝗶̉ 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 🍄`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-w8a6.onrender.com/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID)
    if (userBanned.has(senderID) || threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) {
            if (!ADMINBOT.includes(senderID.toString())) {
                if (userBanned.has(senderID)) {
                    const { reason, dateAdded } = userBanned.get(senderID) || {};
    const res1 = await axios.get(`https://api-w8a6.onrender.com/images/robot`);
const res2 = await axios.get('https://api-w8a6.onrender.com/images/canh`);
var data1 = res1.data.url;
var array = [];
var data2 = res2.data.url;
var downloadfile1 = (await axios.get(data1, {responseType: 'stream'})).data;
var downloadfile2 = (await axios.get(data2, {responseType: 'stream'})).data;
    array.push(downloadfile1);
    array.push(downloadfile2);
                      return api.sendMessage({
            body: global.getText("handleCommand", "userBanned", reason, dateAdded),attachment: array}, threadID, messageID);
                } else {
                    if (threadBanned.has(threadID)) {
                        const { reason, dateAdded } = threadBanned.get(threadID) || {};
const res1 = await axios.get(`https://api-w8a6.onrender.com/images/robot`);
const res2 = await axios.get(`https://api-w8a6.onrender.com/images/canh`);
var data1 = res1.data.url;
var array = [];
var data2 = res2.data.url;
var downloadfile1 = (await axios.get(data1, {responseType: 'stream'})).data;
var downloadfile2 = (await axios.get(data2, {responseType: 'stream'})).data;
    array.push(downloadfile1);
    array.push(downloadfile2);
return api.sendMessage({
            body: global.getText("handleCommand", "threadBanned", reason, dateAdded),attachment: array}, threadID, messageID);
                    }
                }
            }
        }
    const [matchedPrefix] = body.match(prefixRegex),
      args = body.slice(matchedPrefix.length).trim().split(/ +/);
    commandName = args.shift().toLowerCase();
    var command = commands.get(commandName);
    
    fs.writeFileSync(usgPath, JSON.stringify(usages, null, 4));
    if (usages[senderID].usages <= 0 && !["daily","rankup","callad","luotdung"].includes(commandName)) return api.sendMessage(`𝗕𝗮̣𝗻 đ𝗮̃ 𝗵𝗲̂́𝘁 𝗹𝘂̛𝗼̛̣𝘁 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗯𝗼𝘁 𝘁𝗿𝗼𝗻𝗴 𝗵𝗼̂𝗺 𝗻𝗮𝘆! \n𝗕𝗮̂́𝗺 ${prefixBox}𝗱𝗮𝗶𝗹𝘆 đ𝗲̂̉ 𝗻𝗵𝗮̣̂𝗻 𝘁𝗵𝗲̂𝗺 𝟰𝟬 𝗹𝘂̛𝗼̛̣𝘁 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁\n𝗕𝗮̂́𝗺 ${prefixBox}𝗹𝘂𝗼𝘁𝗱𝘂𝗻𝗴 đ𝗲̂̉ 𝗺𝘂𝗮 𝗹𝘂̛𝗼̛̣𝘁`, threadID, messageID);
    if (!command) {
      var allCommandName = [];
      const commandValues = commands['keys']();
      for (const cmd of commandValues) allCommandName.push(cmd)
      const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var noleak = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
if (noleak == 'Sunday') noleak = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (noleak == 'Monday') noleak = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (noleak == 'Tuesday') noleak = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (noleak == 'Wednesday') noleak = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (noleak == "Thursday") noleak = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (noleak == 'Friday') noleak = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (noleak == 'Saturday') noleak = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
      const res = await axios.get(`https://api-w8a6.onrender.com/images/cadao`); 
var tpk = res.data.url;
      const time = process.uptime(); 
      var anh = Math.floor(time / (60 * 60));
	var la = Math.floor((time % (60 * 60)) / 60);
	var vtoan = Math.floor(time % 60);  
      const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
      if (checker.bestMatch.rating >= 0.5) command = client.commands.get(checker.bestMatch.target);
      else return api.sendMessage({body: global.getText("handleCommand", "commandNotExist", checker.bestMatch.target,gio, noleak, tpk,anh,la,vtoan,), attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-w8a6.onrender.com/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
    }
        if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandThreadBanned", command.config.name), threadID, messageID);
        if (banUsers.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandUserBanned", command.config.name), threadID, messageID);
      }
    }
    if (command.config.commandCategory.toLowerCase() == 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !ADMINBOT.includes(senderID))
      return api.sendMessage({body: global.getText("handleCommand", "threadNotAllowNSFW"), attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-w8a6.onrender.com/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID, async (err, info) => {

        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        return api.unsendMessage(info.messageID);
      }, messageID);
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 = (threadInfo.get(threadID) || await Threads.getInfo(threadID))
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }
    var permssion = 0;
    var threadInfoo = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);
    if (NDH.includes(senderID.toString())) permssion = 2;
    if (ADMINBOT.includes(senderID.toString())) permssion = 3;
    else if (!ADMINBOT.includes(senderID) && !NDH.includes(senderID) && find) permssion = 1;
    var quyenhan = ""
    if (command.config.hasPermssion == 1 ){
      quyenhan = "𝗤𝘂𝗮̉𝗻 𝗧𝗿𝗶̣ 𝗩𝗶𝗲̂𝗻, 𝗡𝗗𝗛 𝗕𝗼𝘁 𝘃𝗮̀ 𝗔𝗗𝗠𝗜𝗡 𝗕𝗼𝘁"
    } else if (command.config.hasPermssion == 2 ) {
      quyenhan = "𝗡𝗗𝗛 𝗕𝗼𝘁 𝘃𝗮̀ 𝗔𝗗𝗠𝗜𝗡 𝗕𝗼𝘁"
    } else if(command.config.hasPermssion == 3) {
      quyenhan = "𝗔𝗗𝗠𝗜𝗡 𝗕𝗼𝘁 "
             }
    if (command.config.hasPermssion > permssion) return api.sendMessage({body: `『 𝗟𝗘̣̂𝗡𝗛 𝗔𝗗𝗠𝗜𝗡/𝗤𝗧𝗩 』\n━━━━━━━━━━━━━━━━━━\n→ 𝗕𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗹𝗲̣̂𝗻𝗵 𝗻𝗮̀𝘆\n→ 𝗟𝗲̣̂𝗻𝗵 ${command.config.name} 𝗰𝗵𝗶̉ 𝗰𝗼́ 𝗻𝗵𝘂̛̃𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗾𝘂𝘆𝗲̂̀𝗻 𝗵𝗮̣𝗻 𝗻𝗵𝘂̛ 𝗹𝗮̀: ${quyenhan} 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 💜`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-w8a6.onrender.com/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      },event.threadID, event.messageID);

   if (!client.cooldowns.has(command.config.name)) client.cooldowns.set(command.config.name, new Map());
        const timestamps = client.cooldowns.get(command.config.name);;
        const expirationTime = (command.config.cooldowns || 1) * 1000;
        if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime) 
      return api.sendMessage({body: `=== 『 𝗦𝗨̛̉ 𝗗𝗨̣𝗡𝗚 𝗤𝗨𝗔́ 𝗡𝗛𝗔𝗡𝗛 』 ====\n━━━━━━━━━━━━━━━━━━\n→ 𝗹𝗲̣̂𝗻𝗵 ${command.config.name} 𝗯𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗰𝗼́ 𝘁𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗰𝗵𝗼̛̀ 𝗹𝗮̀: ${command.config.cooldowns}𝘀\n━━━━━━━━━━━━━━━━━━\n→ 𝘁𝗿𝗮́𝗻𝗵 đ𝗲̂̉ 𝗯𝗼𝘁 𝗯𝗶̣ 𝘀𝗽𝗮𝗺 𝗯𝗮̣𝗻 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̛̀ ${((timestamps.get(senderID) + expirationTime - dateNow)/1000).toString().slice(0, 5)}𝘀\n→ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶 𝘀𝗮𝘂 💙`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-w8a6.onrender.com/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID, messageID);

    var getText2;
    if (command.languages && typeof command.languages == 'object' && command.languages.hasOwnProperty(global.config.language))
      getText2 = (...values) => {
        var lang = command.languages[global.config.language][values[0]] || '';
        for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
          const expReg = RegExp('%' + i, 'g');
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    else getText2 = () => { };
    try {
      const Obj = {};
      Obj.api = api
      Obj.event = event
      Obj.args = args
      Obj.models = models
      Obj.Users = Users
      Obj.Threads = Threads
      Obj.Currencies = Currencies
      Obj.permssion = permssion
      Obj.getText = getText2
      usages = JSON.parse(fs.readFileSync(usgPath));
      if (!["daily","luotdung","rankup","callad"].includes(commandName)) usages[senderID].usages -= 1;
      fs.writeFileSync(usgPath, JSON.stringify(usages, null, 4));
      command.run(Obj);
      timestamps.set(senderID, dateNow);
      if (DeveloperMode == !![])
        logger(global.getText("handleCommand", "executeCommand", time, commandName, senderID, threadID, args.join(" "), (Date.now()) - dateNow), "[ DEV MODE ]");
      return;
    } catch (e) {
      return api.sendMessage(global.getText("handleCommand", "commandError", commandName, e), threadID);
    }
  };
};