module.exports.config = {
	name: "taixiu",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "WhoisHakira stolen form lorenBot(MinhHuyDev)",
	description: "Chơi tài xỉu",
	commandCategory: "người dùng",
    usages: "taixiu [tài/xỉu] [số tiền]",
    cooldowns: 0
};
const axios = require('axios');
var bdsd = false;
var tilethang = 2.53;
var tilethangb3dn = 10;
var tilethangb2dn = 5;
var timedelay = 2;
var haisogiong = 2;
var basogiong = 3;
var motsogiong = 1;
function replace(int){
    var str = int.toString();
    var newstr = str.replace(/(.)(?=(\d{3})+$)/g,'$1,');
    return newstr;
}
function getImage(number){
    switch (number){
        case 1: return "https://i.imgur.com/3KH0RVi.png";
        case 2: return "https://i.imgur.com/ammclpx.png";
        case 3: return "https://i.imgur.com/KETAnfv.png";
        case 4: return "https://i.imgur.com/9H62lQ0.png";
        case 5: return "https://i.imgur.com/sDq4Vsj.png";
        case 6: return "https://i.imgur.com/xxVMZWB.png";
    }
}
function getRATE(tong){
    if(tong == 4) var rate = 40;
    if(tong == 5) var rate = 35;
    if(tong == 6) var rate = 33.33;
    if(tong == 7) var rate = 25;
    if(tong == 8) var rate = 20;
    if(tong == 9) var rate = 16.66;
    if(tong == 10) var rate = 14.28;
    if(tong == 11) var rate = 12.5;
    if(tong == 12) var rate = 11.11;
    if(tong == 13) var rate = 10;
    if(tong == 14) var rate = 9.09;
    if(tong == 15) var rate = 8.33;
    if(tong == 16) var rate = 7.69;
    if(tong == 17) var rate = 7.14;
    return rate
}
module.exports.run = async function ({ event, api, Currencies, Users, args }) {
    try{
    const moment = require("moment-timezone");  
    const format_day = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
    const { increaseMoney , decreaseMoney } = Currencies;
    const { threadID, messageID, senderID } = event;
    const { sendMessage: HakiraSEND } = api;
    var name = await Users.getNameUser(senderID)
    var money = (await Currencies.getData(senderID)).money
    var bet = parseInt((args[1] == "allin" ? money : args[1]));
    var input = args[0];
    var tong = parseInt(args[2])
    if(!input) return HakiraSEND("[⚜️]➜ Bạn chưa nhập tài/xỉu/bộ ba giống nhau/bộ đôi giống nhau/cược tổng/cược số", threadID, messageID);
    if(!bet) return HakiraSEND("[⚜️]➜ Gì thế bạn trẻ !!!", threadID, messageID);
    if(bet < 10000) return HakiraSEND("[⚜️]➜ Bạn cần đặt cược tối thiểu 10000$", threadID, messageID);
    if(bet > money) return HakiraSEND("[⚜️]➜ Bạn không đủ tiền để đặt cược", threadID, messageID);
    if(input == "tài" || input == "Tài" || input == '-t') var choose = 'tài'
    if(input == "xỉu" || input == "Xỉu" || input == '-x') var choose = 'xỉu'
    if(input == 'b3gn' || input == 'bbgn' || input == 'btgn') var choose = 'b3gn'
    if(input == 'b2gn' || input == 'bdgn' || input == 'bhgn') var choose = 'b2gn'
    if(input == 'cuoctong' || input == 'ct') var choose = 'cuoctong'
    if(input == 'cuocso' || input == 'cs') var choose = 'cuocso'
    var tag = ['tài','xỉu','b3gn','b2gn','cuoctong','cuocso']
    if(!tag.includes(choose)) return HakiraSEND('[⚜️]➜ Sai cú pháp!!', threadID, messageID)
    if(choose == 'cuoctong' && (tong < 4 || tong > 17)) return HakiraSEND("[⚜️]➜ Tổng cược không hợp lệ ?", threadID, messageID);
    if(choose == 'cuocso' && (tong < 1 || tong > 6)) return HakiraSEND("[⚜️]➜ Số được chọn không hợp lệ ?", threadID, messageID);
    const number = [], img = [], bodem = 0;
    for(let i = 1; i < 4; i++){
    var n = Math.floor(Math.random() * 6 + 1) 
    number.push(n)
    var img_ = (await axios.get(encodeURI(getImage(n)), { responseType: 'stream' })).data;
    img.push(img_)
    HakiraSEND(`[ 𝗧𝗫 ]➜ 𝗹𝗮̂̀𝗻 đ𝗼̂̉ 𝘅𝘂́𝗰 𝘅𝗮̆́𝗰 𝘁𝗵𝘂̛́ ${i}:\n━━━━━━━━━━━━━━━━━━\n[🎰]➜ 𝗯𝗼𝘁 𝗹𝗮̆́𝗰 𝗿𝗮 đ𝘂̛𝗼̛̣𝗰 𝘀𝗼̂́: ${n}`, threadID, messageID)
      await new Promise(resolve => setTimeout(resolve, timedelay * 1000))
}
var total = number[0] + number[1] + number[2];
if(choose == 'cuocso'){
    if(number[0] == tong || number[1] == tong || number[2] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * motsogiong 
        var mne = money + mn
    }
    if(number[1] == tong && number[2] == tong || number[0] == tong && number[2] == tong || number[0] == tong && number[1] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * haisogiong
        var mne = money + mn
    }
    if(number[0] == tong && number[1] == tong && number[2] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * basogiong
        var mne = money + mn
    }
    if(number[0] != tong && number[1] != tong && number[2] != tong){
        var ans = `${tong}`
        var result = 'lose'
        var mn = bet
        var mne = money - mn
    }   
}
if(choose == 'cuoctong'){
    if(total == tong){
        var ans = "cược tổng"
        var result = 'win'
        var mn = bet * parseInt((getRATE(tong)))
        var mne = money + mn
    } else {
        var ans = `${total}`
        var result = 'lose'
        var mn = bet
        var mne = money - mn
    }
}
if(choose == 'b3gn' ){
    if(number[0] == number[1] && number[1] == number[2]) {
        var ans = "bộ ba đồng nhất"
        var result = 'win'
        var mn = bet * tilethangb3dn
        var mne = money + mn
    } else {
        var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
        var result = 'lose'
        var mn = bet
        var mne = money - mn
    }
}
if(choose == 'b2gn'){
    if(number[0] == number[1] || number[1] == number[2] || number[0] == number[2]) {
        var ans = "bộ hai đồng nhất"
        var result = 'win'
        var mn = bet * tilethangb2dn
        var mne = money + mn
    } else {
        var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
        var result = 'lose'
        var mn = bet
        var mne = money - mn
    }
}
if(choose == 'tài' || choose == 'xỉu') {
if(number[0] == number[1] && number[1] == number[2]){
var ans = "bộ ba đồng nhất"
} else {
var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
}
if(number[0] == number[1] && number[1] == number[2]) {
    var result = 'lose'
    var mn = bet
    var mne = money - mn
}
if(ans == choose) {
    var result = 'win'
    var mn = bet * tilethang
    var mne = mn + money
} else {
    var result = 'lose'
    var mn = bet
    var mne = money - mn
}
}
if(result =='lose'){
    decreaseMoney(senderID, mn)
} else if(result == 'win'){
    increaseMoney(senderID, mn)
}
var msg =   `=== [ 𝗞𝗘̂́𝗧 𝗤𝗨𝗔̉ 𝗧𝗔̀𝗜 𝗫𝗜̉𝗨 ] ===\n━━━━━━━━━━━━━━━━━━` 
            + '\n' + 
            `⏰ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${format_day}`
            + '\n' +
            `👤 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗖𝗵𝗼̛𝗶: ${name}`
            + '\n' +
            `✔️ 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻: ${choose}`
            + '\n' +
            `⚙️ 𝗞𝗲̂́𝘁 𝗾𝘂𝗮̉: ${ans}`
            + '\n' +
            `🎲 𝗫𝘂́𝗰 𝘅𝗮̆́𝗰 𝟭: ${number[0]}`
            + '\n' + 
            `💐 𝗫𝘂́𝗰 𝘅𝗮̆́𝗰 𝟮: ${number[1]}`
            + '\n' +
            `💝 𝗫𝘂́𝗰 𝘅𝗮̆́𝗰 𝟯: ${number[2]}`
            + '\n' +
            `🖇️ 𝗧𝗼̂̉𝗻𝗴 𝗯𝗮 𝘅𝘂́𝗰 𝘅𝗮̆́𝗰: ${total}`
            + '\n━━━━━━━━━━━━━━━━━━\n' +
            `😻 𝗞𝗲̂́𝘁 𝗾𝘂𝗮̉: ${(result == 'win' ? 'Thắng' : 'Thua')}`
            + '\n' +
            `💵 𝗧𝗶𝗲̂̀𝗻 𝗰𝘂̛𝗼̛̣𝗰: ${replace(bet)}`
            + '\n' +
            `💶 𝗧𝗶𝗲̂̀𝗻 ${(result == '𝘄𝗶𝗻' ? '𝗧𝗵𝗮̆́𝗻𝗴' : '𝗧𝗵𝘂𝗮')}: ${replace(Math.floor(mn))}$`
            + '\n' +
            `🕵️ 𝗧𝗿𝗮̣𝗻𝗴 𝗧𝗵𝗮́𝗶: ${(result == 'win' ? 'Đã Trả Thưởng' : 'Đã Trừ Tiền')}`
            + '\n' +
            `💸 𝗦𝗼̂́ 𝗧𝗶𝗲̂̀𝗻 𝗛𝗶𝗲̣̂𝗻 𝗧𝗮̣𝗶: ${replace(mne)}$`
            + '\n━━━━━━━━━━━━━━━━━━' +
            `\n💮 𝗕𝗮̣𝗻 𝗰𝗵𝗲𝗰𝗸 𝘀𝗽𝗮𝗺 𝗯𝗼𝘁 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝘁𝗶𝗲̂̀𝗻 𝗾𝘂𝗮 đ𝗼́`
            HakiraSEND({body:msg,attachment: img}, threadID, messageID)
            if(bdsd == true) {
          var msg =  `=== [ 𝗠𝗜𝗥𝗔𝗜 𝗣𝗔𝗬𝗠𝗢𝗡𝗘𝗬 ] ===
━━━━━━━━━━━━━━━━━━
\n[⏰] 𝗩𝗮̀𝗼 𝗻𝗴𝗮̀𝘆: ${format_day}\n[✍️] 𝗧𝗵𝗼̂𝗻𝗴 𝗯𝗮́𝗼 ${(result == 'win') ? 'nhận tiền' : 'trừ tiền'} 𝘁𝘂̛̀ 𝗱𝗶̣𝗰𝗵 𝘃𝘂̣ 𝗴𝗮𝗺𝗲 𝘁𝗮̀𝗶 𝘅𝗶̉𝘂\n[💸] 𝗦𝗼̂́ 𝘁𝗶𝗲̂̀𝗻: ${replace(mn)}\n[💵] 𝗦𝗼̂́ 𝗱𝘂̛ 𝗸𝗵𝗮̉ 𝗱𝘂̣𝗻𝗴: ${replace(mne)}$\n[💝] 𝗖𝗮̉𝗺 𝗼̛𝗻 đ𝗮̃ 𝘁𝗶𝗻 𝗱𝘂̀𝗻𝗴 𝗱𝗶̣𝗰𝗵 𝘃𝘂̣ 𝗰𝘂̉𝗮 𝗠𝗶𝗿𝗮𝗶𝗣𝗮𝘆`
            HakiraSEND({
                body: msg,
               // attachment: img
            }, senderID)
        }
} catch(e){
    console.log(e)
}}