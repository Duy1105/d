module.exports.config = {
	name: "rankup",
	version: "3.0",
	hasPermssion: 1,
	credits: "Mr.Ben",
	description: "Thông báo lên rank Liên Quân dựa trên số tin nhắn của bạn trên nhóm",
	commandCategory: "qtv",
	cooldowns: 0
};
const path = __dirname + "/checktt/checktt.json";
const delayUnsend = 3;
const fs = require("fs-extra");
module.exports.handleEvent = async function({ api, event, Currencies, Users }) {
	var {threadID, senderID, messageID} = event;
	let exp = (await Currencies.getData(senderID)).exp;
	let name = await Users.getNameUser(senderID)
	exp = exp += 1;
	if (isNaN(exp)) return;
	await Currencies.setData(senderID, { exp });
	if (!fs.existsSync(path)) return;
	const data = JSON.parse(fs.readFileSync(path))
	if (exp == 100 || exp == 200 || exp == 500 || exp == 800 || exp == 1000 || exp == 1500 || exp == 2000 && senderID != api.getCurrentUserID() && data[threadID] && data[threadID].rankup != false) {
		const img = (exp == 100) ? 'https://i.imgur.com/pKZGOMh.jpg' : (exp == 200) ? 'https://i.imgur.com/NOOLb5K.jpg' : (exp == 500) ? 'https://i.imgur.com/ghvN21y.jpg' : (exp == 800) ? 'https://i.imgur.com/FnaekyX.jpg' : (exp == 1000) ? 'https://i.imgur.com/hRoJfiH.jpg' : (exp == 1500) ? 'https://i.imgur.com/dLpt9MS.jpg' : (exp == 2000) ? 'https://i.imgur.com/urSaAMs.jpg' : 'https://i.imgur.com/XgVjAmG.jpg';
			return api.sendMessage({
				body: `====== [ 𝗥𝗔𝗡𝗞-𝗨𝗣 ] ======\n━━━━━━━━━━━━━━━━━━\n➜ 𝗧𝗲̂𝗻: ${name}\n➜ 𝗦𝗼̂́ 𝗧𝗶𝗻 𝗡𝗵𝗮̆́𝗻: ${exp == undefined ? 0 : exp}\n➜ 𝗕𝗮̣𝗻 𝗩𝘂̛̀𝗮 𝗟𝗲̂𝗻 𝗥𝗮𝗻𝗸: ${(exp == 100) ? 'Đồng' : (exp == 200) ? 'Bạc' : (exp == 500) ? 'Vàng' : (exp == 800) ? 'Bạch kim' : (exp == 1000) ? 'Kim cương' : (exp == 1500) ? 'Tinh anh' : (exp == 2000) ? 'Cao thủ' : 'Chiến Tướng ( thách đấu )'}`,
				attachment: (await require('axios').get(img, {responseType: 'stream'})).data
			}, threadID, async(err, info) => {
				await new Promise(resolve => setTimeout(resolve, 60 *1000 *5))
				api.unsendMessage(info.messageID)
			}, messageID)
	}
	else {return;}
}
module.exports.run = async function({ api, event, Threads }) {
	var {threadID, messageID} = event;
	if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}))
	const data = JSON.parse(fs.readFileSync(path))
	if (!data[threadID]) {
		data[threadID] = {
			rankup: true
		}
		fs.writeFileSync(path, JSON.stringify(data, null, 2))
	}
	else if (data[threadID].rankup == true) type = false;
	else type = true;
	data[threadID].rankup = type;
	fs.writeFileSync(path, JSON.stringify(data, null, 2))
	return api.sendMessage(`→ ${data[threadID].rankup == false ? "Tắt thành công thông báo lên rank" : "Bật thành công thông báo lên rank"}`, threadID, messageID);
                                                                                                                                 }