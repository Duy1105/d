module.exports.config = {
	name: "ảnh",
	version: "1.0.3",
	hasPermssion: 0,
	credits: "cc",
	description: "Xem ảnh réply",
	commandCategory: "người dùng",
	cooldowns: 5,
	dependencies: {
		axios: ""
	}
  };
  module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "adm.png")) request("link").pipe(fs.createWriteStream(dirMaterial + "adm.png"));
}, module.exports.run = async function({
	event: e,
	api: a,
	args: n
}) {
    const fs = require("fs");
	if (!n[0]) return a.sendMessage({body:"=== [ 𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 𝗔̉𝗡𝗛 ] ===\n━━━━━━━━━━━━━━━━━━\n𝟭. 𝗔̉𝗻𝗵  𝗔𝗻𝗶𝗺𝗲 💞 \n𝟮. 𝗔̉𝗻𝗵 𝗔𝘂𝘀𝗮𝗻𝗱 💕\n𝟯. 𝗔̉𝗻𝗵 𝗧𝗿𝗮𝗶 🍑\n𝟰. 𝗔̉𝗻𝗵 𝗣𝗵𝗼𝗻𝗴 𝗖𝗮̉𝗻𝗵 😽\n𝟱. 𝗔̉𝗻𝗵 𝗨𝗺𝗮𝗿𝘂 🌚\n𝟲. 𝗔̉𝗻𝗵 𝗖𝗵𝗶𝘁𝗮𝗻𝗱𝗮 😻\n𝟳. 𝗔̉𝗻𝗵 𝗖𝗼𝘀𝗽𝗹𝗮𝘆 🔥\n𝟴. 𝗔̉𝗻𝗵 𝗗𝘂́ 🌸\n𝟵. 𝗔̉𝗻𝗵 𝗚𝗮́𝗶 🎀\n𝟭𝟬. 𝗔̉𝗻𝗵 𝗚𝗮́𝗶 𝗻𝗵𝗮̣̂𝘁 💸\n𝟭𝟭. 𝗔̉𝗻𝗵 𝗚𝗶𝗿𝗹 💊\n𝟭𝟮. 𝗔̉𝗻𝗵 𝗚𝘂𝗿𝗮 🌸\n𝟭𝟯. 𝗔̉𝗻𝗵 𝗛𝗮𝗻𝗮 📌\n𝟭𝟰. 𝗔̉𝗻𝗵 𝗜𝗴 🌻\n𝟭𝟱. 𝗔̉𝗻𝗵 𝗞𝗮𝗻𝗮 🎇\n𝟭𝟲. 𝗔̉𝗻𝗵 𝗸𝘂𝗿𝘂𝗺𝗶 💎\n𝟭𝟳. 𝗔̉𝗻𝗵 𝗹𝗼𝗹𝗶🍅\n𝟭𝟴. 𝗔̉𝗻𝗵 𝗹𝘂𝗰𝘆🍪\n𝟭𝟵. 𝗔̉𝗻𝗵 𝗺𝗶𝗿𝗮𝗶🧁\n𝟮𝟬. 𝗔̉𝗻𝗵 𝗺𝗼̂𝗻𝗴🍼\n𝟮𝟭. 𝗔̉𝗻𝗵 𝗻𝗮𝘂𝗴𝗵𝘁𝘆🥨\n𝟮𝟮. 𝗔̉𝗻𝗵 𝗻𝗲𝗸𝗼🥝\n𝟮𝟯. 𝗔̉𝗻𝗵 𝗼𝗻𝗰𝗲 𝗽𝗶𝗲𝗰𝗲🎊\n𝟮𝟰. 𝗔̉𝗻𝗵 𝗿𝗲𝗺⛩️\n𝟮𝟱. 𝗔̉𝗻𝗵 𝘀𝗮𝗴𝗮𝗿𝗶♨️\n━━━━━━━━━━━━━━━━━━\n=== [ 𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 𝗩𝗜𝗗𝗘𝗢 ] ===\n𝟮𝟲. 𝗩𝗶𝗱𝗲𝗼 𝗰𝗵𝗶𝗹𝗹🕸️\n𝟮𝟳. 𝗩𝗶𝗱𝗲𝗼 𝗱𝗼𝗿𝗲𝗺𝗼𝗻🐙\n𝟮𝟴. 𝗩𝗶𝗱𝗲𝗼 𝗴𝗮́𝗶🐟\n𝟮𝟵. 𝗩𝗶𝗱𝗲𝗼 𝘁𝗲̂́𝘁🐢\n→ 𝗥𝗲𝗽𝗹𝘆 𝗧𝗶𝗻 𝗡𝗵𝗮̆́𝗻 𝗡𝗮̀𝘆 𝗩𝗮̀ 𝗖𝗵𝗼̣𝗻 𝗧𝗵𝗲𝗼 𝗦𝗧𝗧 𝗔̉𝗻𝗵 𝗛𝗼𝗮̣̆𝗰 𝗩𝗶𝗱𝗲𝗼 𝗕𝗮̣𝗻 𝗠𝘂𝗼̂́𝗻 𝗫𝗲𝗺 𝗡𝗵𝗲́ 🐧",attachment: fs.createReadStream(__dirname + `/noprefix/adm.png`)}, e.threadID, ((a, n) => {
		global.client.handleReply.push({
			name: this.config.name,
			messageID: n.messageID,
			author: e.senderID,
			type: "create"
		})
	}), e.messageID)
}, module.exports.handleReply = async ({
	api: e,
	event: a,
	client: n,
	handleReply: t,
	Currencies: s,
	Users: i,
	Threads: o
}) => {
	var { p, h } = linkanh();

	if ("create" === t.type) {
		const n = (await p.get(h)).data.url;
		let t = (await p.get(n, {
			responseType: "stream"
		})).data;
		return e.sendMessage({
			body: "[ 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴 ] →  𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝗻𝗲̀ 🐧️",
			attachment: t
		}, a.threadID, a.messageID)
	}

    function linkanh() {
        const p = require("axios");
        if ("1" == a.body)
            var h = "https://www.duynro.id.vn/images/anime";
        else if ("2" == a.body)
         var   h = "https://www.duynro.id.vn/images/ausand";
        else if ("3" == a.body)
         var   h = "https://www.duynro.id.vn/images/boy";
        else if ("4" == a.body)
          var  h = "https://www.duynro.id.vn/images/canh";
        else if ("5" == a.body)
          var  h = "https://www.duynro.id.vn/images/umaru";
        else if ("6" == a.body)
          var  h = "https://www.duynro.id.vn/images/chitanda";
        else if ("7" == a.body)
          var  h = "https://www.duynro.id.vn/images/cosplay";
        else if ("8" == a.body)
         var   h = "https://www.duynro.id.vn/images/du";
        else if ("9" == a.body)
         var  h = "https://www.duynro.id.vn/images/gai";
        else if ("10" == a.body)
          var  h = "https://www.duynro.id.vn/images/gainhat";
        else if ("11" == a.body)
          var  h = "https://www.duynro.id.vn/images/girl";
        else if ("12" == a.body)
         var   h = "https://www.duynro.id.vn/images/gura";
        else if ("13" == a.body)
          var  h = "https://www.duynro.id.vn/images/hana";
        else if ("14" == a.body)
          var  h = "https://www.duynro.id.vn/images/ig";
        else if ("15" == a.body)
         var   h = "https://www.duynro.id.vn/images/kana";
        else if ("16" == a.body)
          var  h = "https://www.duynro.id.vn/images/kurumi";
        else if ("17" == a.body)
         var   h = "https://www.duynro.id.vn/images/loli";
        else if ("18" == a.body)
         var   h = "https://www.duynro.id.vn/images/lucy";
        else if ("19" == a.body)
         var   h = "https://www.duynro.id.vn/images/mirai";
        else if ("20" == a.body)
         var   h = "https://www.duynro.id.vn/images/mong";
        else if ("21" == a.body)
         var   h = "https://www.duynro.id.vn/images/naughty";
       else if ("22" == a.body)
         var   h = "https://www.duynro.id.vn/images/neko";
      else if ("23" == a.body)
         var   h = "https://www.duynro.id.vn/images/onepiece";
      else if ("24" == a.body)
         var   h = "https://www.duynro.id.vn/images/rem";
      else if ("25" == a.body)
         var   h = "https://www.duynro.id.vn/images/sagiri";
         else if ("26" == a.body)
         var   h = "https://www.duynro.id.vn/images/chil";
      else if ("27" == a.body)
         var   h = "https://www.duynro.id.vn/images/vddoremon";
      else if ("28" == a.body)
         var   h = "https://www.duynro.id.vn/images/vdgai";
      else if ("29" == a.body)
         var   h = "https://www.duynro.id.vn/images/vdtet";
        return { p, h };
     
    }
};