module.exports.config = {
  name: "upt",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Vihoo", 
  description: "no prefix",
  commandCategory: "người dùng",
  usages: "xem thời gian bot onl",
    cooldowns: 5
};
module.exports.handleEvent = async ({ api, event, Users, Threads }) => {
const moment = require("moment-timezone"); 
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var thu =
moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
  if (!event.body) return;
  var { threadID, messageID } = event;
  const threadname = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
  if (event.body.toLowerCase().indexOf("upt") == 0) {
    //getPrefix
    const threadSetting = (await Threads.getData(String(threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("Upt")) ? threadSetting.PREFIX : global.config.PREFIX;
    const dateNow = Date.now();
    const time = process.uptime(),
	      	hours = Math.floor(time / (60 * 60)),
		      minutes = Math.floor((time % (60 * 60)) / 60),
		      seconds = Math.floor(time % 60);
  const admins = global.config.ADMINBOT;
    const namebot = config.BOTNAME;
    const { commands } = global.client;
  var i = 1;
  var msg = [];
  var msg = []
    for(var a of admins) {
    if (parseInt(a)) {
    var name = await Users.getNameUser(a);
      msg.push(`${i++}. ${name}`);
    }
    }
    api.sendMessage({body:`====「 𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗢𝗕𝗢𝗧 」 ====\n⏰𝗧𝗶𝗺𝗲: ${gio}\n🗓𝐓𝐡𝐮̛́: ${thu}\n🤖𝗧𝗲̂𝗻 𝗕𝗼𝘁: ${global.config.BOTNAME}\n📋𝗧𝗼̂̉𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${global.data.allUserID.length}\n📡𝗣𝗶𝗻𝗴: ${Date.now() - dateNow} ms\n𝐁𝐨𝐭 𝐡𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐝𝐚̃ 𝐡𝐨𝐚̣𝐭 𝐝𝐨̣̂𝐧𝐠 𝐝𝐮̛𝐨̛̣𝐜: ${hours} 𝐆𝐢𝐨̛̀ ${minutes} 𝐏𝐡𝐮́𝐭 ${seconds} 𝐆𝐢𝐚̂𝐲`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
  }
};
module.exports.run = () => {};