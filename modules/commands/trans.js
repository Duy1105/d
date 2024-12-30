module.exports.config = {
	name: "trans",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Dịch văn bản",
	commandCategory: "người dùng",
	usages: "[en/ko/ja/vi] [Text]",
	cooldowns: 5,
	dependencies: {
		"request":  ""
	}
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
	var content = args.join(" ");
	if (content.length == 0 && event.type != "message_reply") return global.utils.throwError(this.config.name, event.threadID,event.messageID);
	var translateThis = content.slice(0, content.indexOf(" ->"));
	var lang = content.substring(content.indexOf(" -> ") + 4);
	if (event.type == "message_reply") {
		translateThis = event.messageReply.body
		if (content.indexOf("-> ") !== -1) lang = content.substring(content.indexOf("-> ") + 3);
		else lang = global.config.language;
	}
	else if (content.indexOf(" -> ") == -1) {
		translateThis = content.slice(0, content.length)
		lang = global.config.language;
	}
	return  request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), async (err, response, body) => {
		if (err) return api.sendMessage("Đã có lỗi xảy ra!", event.threadID, event.messageID);
		var retrieve = JSON.parse(body);
		var text = '';
		retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
		var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
		api.sendMessage({body: `🌐 === [ 𝗚𝗢𝗢𝗚𝗟𝗘 𝗧𝗥𝗔𝗡𝗦𝗟𝗔𝗧𝗢𝗥 ] === 🌐
━━━━━━━━━━━━━━━━━━
🏤 𝗕𝗮̉𝗻 𝘀𝗮𝗼 𝗸𝗵𝗶 𝗱𝗶̣𝗰𝗵: ${text}
🔗 𝗩𝘂̛̀𝗮 đ𝘂̛𝗼̛̣𝗰 𝗱𝗶̣𝗰𝗵 𝘁𝘂̛̀ ${fromLang} 𝘀𝗮𝗻𝗴 ${lang}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
	});
}