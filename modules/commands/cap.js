const axios = require("axios");
const fs = require("fs");
module.exports.config = {
	name: "cap",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Tpk - táo",
	description: "Cap màn hình",
	commandCategory: "người dùng",
    cooldowns: 5
}
module.exports.onLoad = async () => {
    const { existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    const path = resolve(__dirname, "cache", "pornlist.txt");

    if (!existsSync(path)) return await global.utils.downloadFile("https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt", path);
    else return;
}

module.exports.run = async ({ event, api, args, Currencies }) => {
  const request = require("request");
const fs = require("fs");

   const { threadID, messageID, senderID } = event;
    var cc = [
      "https://i.imgur.com/hqipXHp.jpeg",
"https://i.imgur.com/ftPDygz.jpeg",
"https://i.imgur.com/wbzpYWL.jpeg",
      "https://i.imgur.com/LysUohf.jpeg",
              ];
let image = [];
 for(let i = 0; i < 4; i++) {
    const stream = (await axios.get(cc[i], {
        responseType: "stream"
    })).data;
    image.push(stream);
};
  const ccc = {
    body: `🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━
[👉]➜ 𝗗𝘂̛𝗼̛́𝗶 𝗹𝗮̀ 𝗰𝗮́𝗰 𝗹𝗼𝗮̣𝗶 𝗰𝗮𝗽 𝗯𝗮̣𝗻 𝗵𝗮̃𝘆 𝗰𝗵𝗼̣𝗻

𝟭. 𝗰𝗮𝗽 𝘄𝗮𝗹𝗹 𝗱𝗮̣𝗻𝗴 đ𝗶𝗲̣̂𝗻 𝘁𝗵𝗼𝗮̣𝗶 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 ⚪
𝟮. 𝗰𝗮𝗽 𝘄𝗮𝗹𝗹 𝗱𝗮̣𝗻𝗴 𝗻𝗲̂̀𝗻 𝗽𝗰 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 ⚪
𝟯. 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗱𝗮̣𝗻𝗴 đ𝗶𝗲̣̂𝗻 𝘁𝗵𝗼𝗮̣𝗶 𝗻𝗲̂̀𝗻 đ𝗲𝗻 🖤
𝟰. 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 đ𝗲𝗻 🖤

[⚠️]➜ 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗸𝗲̀𝗺 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣ đ𝗲̂̉ 𝗰𝗵𝗼̣𝗻
 `,
    attachment: image
};
    if (!args[0]) {        
        return api.sendMessage(ccc, event.threadID, (error, info) => {
        
            global.client.handleReply.push({
                type: "choosee",
                name: this.config.name,
                author: event.senderID,
                messageID: info.messageID
            })
        })
    }
}
    module.exports.handleReply = async function ({
    args,
    event,
    Users,
    api,
    handleReply,
    Currencies,
    __GLOBAL
}) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");
  let data = (await Currencies.getData(event.senderID)).ghepTime;
 
    
    switch (handleReply.type) {
    case "choosee": {
        switch (event.body) {
        case "1": {
          const axios = require('axios');
          const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `datr=37FZZC0AxwEWUSkYnuVdKpZV;sb=37FZZLC33n5cTZS8A_uC_Eoa;c_user=100082322840645;xs=30%3AOLA8lvmkVK_MKg%3A2%3A1683600069%3A-1%3A6063;fr=0zPPbSyScWxAbZkL6.AWUU4KNA1AeMdoiQUO5rjrUrTys.BkWbHf.Rg.AAA.0.0.BkWbLH.AWUlBHTZo3A;fbl_ci=1460652597690686;vpd=v1%3B1045x551x1.962499976158142;locale=vi_VN;fbl_cs=AhA1%2FfJMFRsYsE2Ly7FDEdTEGGdISENIeVdHeTU3Ykc9cjNQYT02bllPUQ;wl_cbv=v2%3Bclient_version%3A2270%3Btimestamp%3A1686413563;fbl_st=101429604%3BT%3A28106892;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://cap-b8fcd2767f9f.herokuapp.com/screenshot/${uid}/${cookies}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=6d32a9&url=${url}&dimension=480x800&cacheLimit=0&delay=800`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 đ𝗶𝗲̣̂𝗻 𝘁𝗵𝗼𝗮̣𝗶 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆 `,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "2": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `datr=37FZZC0AxwEWUSkYnuVdKpZV;sb=37FZZLC33n5cTZS8A_uC_Eoa;c_user=100082322840645;xs=30%3AOLA8lvmkVK_MKg%3A2%3A1683600069%3A-1%3A6063;fr=0zPPbSyScWxAbZkL6.AWUU4KNA1AeMdoiQUO5rjrUrTys.BkWbHf.Rg.AAA.0.0.BkWbLH.AWUlBHTZo3A;fbl_ci=1460652597690686;vpd=v1%3B1045x551x1.962499976158142;locale=vi_VN;fbl_cs=AhA1%2FfJMFRsYsE2Ly7FDEdTEGGdISENIeVdHeTU3Ykc9cjNQYT02bllPUQ;wl_cbv=v2%3Bclient_version%3A2270%3Btimestamp%3A1686413563;fbl_st=101429604%3BT%3A28106892;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://cap-b8fcd2767f9f.herokuapp.com/screenshot/${uid}/${cookies}}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=6d32a9&url=${url}&dimension=1920x1080&cacheLimit=0&delay=400`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `‎🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "3": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookie = `datr=0bJwZJu7zQQNdfpxcYN2Jo6-;sb=0bJwZMgwzPba6o4oOlgTTGL8;locale=vi_VN;vpd=v1%3B1045x551x1.962499976158142;m_pixel_ratio=1.962499976158142;fr=0P28xY7Sfu7Jp9aN2.AWVVudXO0hQCH61_ZIi_u9QRSC8.BkcLLR.72.AAA.0.0.BkhKBw.AWVemKQ622c;c_user=100093218005527;xs=30%3A7MRfDexd62QoDg%3A2%3A1686413424%3A-1%3A-1;m_page_voice=100093218005527;wd=551x1045;fbl_st=100638323%3BT%3A28106890;wl_cbv=v2%3Bclient_version%3A2270%3Btimestamp%3A1686413443;fbl_cs=AhDNHqNV941gjWkzGOoSNnfwGEZTK2syREFUcnl6aXVzbTg3Qm12UXc9Uw;fbl_ci=279351927825175;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    cookie.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://cap-b8fcd2767f9f.herokuapp.com/screenshot/${uid}/${cookie}}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=bd74c8&url=${url}&dimension=480x800&cacheLimit=0&delay=400`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 đ𝗶𝗲̣̂𝗻 𝘁𝗵𝗼𝗮̣𝗶 𝗻𝗲̂̀𝗻 đ𝗲𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "4": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookie = `datr=0bJwZJu7zQQNdfpxcYN2Jo6-;sb=0bJwZMgwzPba6o4oOlgTTGL8;locale=vi_VN;vpd=v1%3B1045x551x1.962499976158142;m_pixel_ratio=1.962499976158142;fr=0P28xY7Sfu7Jp9aN2.AWVVudXO0hQCH61_ZIi_u9QRSC8.BkcLLR.72.AAA.0.0.BkhKBw.AWVemKQ622c;c_user=100093218005527;xs=30%3A7MRfDexd62QoDg%3A2%3A1686413424%3A-1%3A-1;m_page_voice=100093218005527;wd=551x1045;fbl_st=100638323%3BT%3A28106890;wl_cbv=v2%3Bclient_version%3A2270%3Btimestamp%3A1686413443;fbl_cs=AhDNHqNV941gjWkzGOoSNnfwGEZTK2syREFUcnl6aXVzbTg3Qm12UXc9Uw;fbl_ci=279351927825175;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    cookie.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://cap-b8fcd2767f9f.herokuapp.com/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=bd74c8&url=${url}&dimension=1920x1080&cacheLimit=0&delay=400`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 đ𝗲𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
          }
            break;
					default:
           const choose = parseInt(event.body);
            	if (isNaN(event.body)) return api.sendMessage("n", event.threadID, event.messageID);
            	if (choose > 2 || choose < 1) return api.sendMessage("u", event.threadID, event.messageID); 
    }
    }
}
                  }