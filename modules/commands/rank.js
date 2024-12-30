module.exports.config = {
    name: 'rank',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tính rank liên quân mobile dựa trên số lần bạn gửi tin nhắn!',
    commandCategory: 'người dùng',
    usages: '[... | info | all]',
    cooldowns: 2,
};
const {
    readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync
} = require('fs-extra');
const {
    get
} = require('axios');
const msgStar = 30;
const streamURL = async a => (await get(a, {
    responseType: 'stream'
})).data;
const sortCompare = k => (a, b) => (a[k] > b[k] ? 1: a[k] < b[k] ? -1: 0)*-1;
const roof = n => +n != +Math.floor(n) ? +Math.floor(n)+1: +n;
const $star = a => Math.floor(a/msgStar);
const checkRank = a => a > 112 && a < 162 ? `Cao Thủ (${a - 112} ⭐)`: `Chiến Tướng (${a - 112} ⭐)`;
const newUser = a => new Object({
    uid: a, countmsg: 0
});
const dirMain = __dirname + `/cache/count_message-ranklq`;
module.exports.onLoad = function () {
    if (!existsSync(dirMain)) mkdirSync(dirMain);
    const arr = [[0x66-99,
        0x3,
        '\u0110\u1ed3\u006e\u0067',
        'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Dong.jpg'],
        [0x0+3,
            0x102-255,
            '\u0042\u1ea1\u0063',
            'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Bac.jpg'],
        [+'\u0034',
            '\u0034',
            '\u0056\u00e0\u006e\u0067',
            'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Vang.jpg'],
        ['\u0035',
            +0x5,
            '\u0042\u1ea1\u0063\u0068\u0020\u004b\u0069\u006d',
            'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Bach-Kim.jpg'],
        [0x666-1633,
            '\u0035',
            '\u004b\u0069\u006d\u0020\u0043\u01b0\u01a1\u006e\u0067',
            'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Kim-Cuong.jpg'],
        [0x13-14,
            0x7-2,
            '\u0054\u0069\u006e\u0068\u0020\u0041\u006e\u0068',
            'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Tinh-Anh.jpg']];
    const lq = global.rankLQM = new Object();
    const ob = (a, b, c) => new Object({
        star: a, name: b, image: c
    });
    const data = lq.data = new Array();
    var count = 0x0;
    for (const f of arr) for (var i = 0; i < f[1]; i++) for (var j = 0; j < f[0]; j++) data.push(ob(++count, `${f[2]} ${'\u0049'.repeat(f[1]-i)['\u0072\u0065\u0070\u006c\u0061\u0063\u0065'](/II\III/g, '\u0056')['replace'](/IIII/g, '\u0049\u0056')} (${'\u2b50'.repeat(j+1)})`, f[3]));
    lq.get = a => a == 0 ? ob(a, 'Chưa Xếp Hạng!', arr[0][3]): a > 112 ? (a < 162 ? ob(a, `Cao Thủ (${a-112} ⭐)`, 'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Cao-Thu.jpg'): ob(a, `Chiến Tướng (${a-112} ⭐)`, 'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Thach-Dau.jpg')): data.find(i => i.star == a);
};
module.exports.handleEvent = function({
    api, event
}) {
    if (!event.isGroup) return;
    const pathJso = `${dirMain}/${event.threadID}.json`;
    if (!existsSync(pathJso)) writeFileSync(pathJso, '{"user": []}');
    if (event.senderID == api.getCurrentUserID()) return;
    const data = JSON.parse(readFileSync(pathJso));
    const fin = data.user.find(i => i.uid == event.senderID);
    if (!fin) data.user.push(newUser(event.senderID)); else ++fin.countmsg;
    writeFileSync(pathJso, JSON.stringify(data, 0, 4));
};
module.exports.run = async function({
    api, event, args
}) {
    try {
        const pathJso = `${dirMain}/${event.threadID}.json`;
        const data = JSON.parse(readFileSync(pathJso));;
        const user = [];
        event.participantIDs.forEach(i => {
            const fin = data.user.find(j => j.uid == i);
            if (!fin) user.push(newUser(i)); else user.push(fin);
        });
        user.sort(sortCompare('countmsg'));
        const uid = event.type == 'message_reply' ? event.messageReply.senderID: !!Object.keys(event.mentions)[0] ? Object.keys(event.mentions)[0]: event.senderID;
        var count = 0;
        const mapp = user.map(i => {
            const star = $star(i.countmsg);
            const {
                image,
                name
            } = global.rankLQM.get(star);
            if (star > 161 && i.countmsg > user[4].countmsg) i.rankName = `Thách Đấu (${star-162} ⭐)`,
            i.image = 'https://raw.githubusercontent.com/duongcongnam02/image/main/rank-lien-quan/Thach-Dau.jpg'; else i.rankName = name,
            i.image = image;
            i.stt = ++count,
            i.star = star,
            i.name = global.data.userName.get(i.uid);
            return i;
        });
        const {
            stt, name, rankName, image, star, countmsg
        } = mapp.find(i => i.uid == uid);
        switch (args[0]) {
            case 'all': {
                var txt = '';
                for (const {
                    stt, name, rankName, countmsg, star
                } of mapp) txt += `${stt} » 👤 Tên: ${name}\n💯 Điểm chiến lực: ${countmsg}\n⭐ Số sao hiện có: ${star}\n⚡ Rank ${rankName}\n\n`;
                txt += `🏆 Bạn xếp hạng top ${stt}.`;
                api.sendMessage(txt, event.threadID);
            };
                break;
            case 'info': {
                var txt = '';
                for (const {
                    star, name
                } of global.rankLQM.data) txt += `• ${msgStar*star} Tin Nhắn -> ${name}\n`;
                txt += `• ${msgStar*113} Tin Nhắn -> Cao Thủ (Tính theo số sao)\n• ${msgStar*162} Tin Nhắn -> Chiến Tướng (Tính theo số sao)\n• Thách Đấu (Tính theo số sao, đạt chiến tướng và trong top 5)`;
                api.sendMessage(txt, event.threadID);
            };
                break;
            case 'set': {
                if (!global.config.ADMINBOT.includes(event.senderID)) return;
                const data = JSON.parse(readFileSync(pathJso));
                const fin = data.user.find(i => i.uid == uid) || {};
                fin.countmsg = (+args[1])*msgStar;
                writeFileSync(pathJso, JSON.stringify(data, 0, 4));
                api.sendMessage(`Đã thay đổi số sao của ${uid == event.senderID ? 'bản thân': global.data.userName.get(uid)} thành: ${args[1]}`, event.threadID, event.messageID);
            };
                break;
            default: api.sendMessage({
                body: `👤 Tên: ${name}\n⚡ Rank ${rankName}\n⭐ Số sao hiện có: ${star}\n💯 Điểm chiến lực: ${countmsg}\n🏆 Xếp Hạng Thứ: ${stt}\n📌 Tương Tác ( ${msgStar} ) tin nhắn sẽ được +1 ⭐`, attachment: await streamURL(image)}, event.threadID, event.messageID);
            };
        }catch(err) {
            api.sendMessage(`${err}`, event.threadID, event.messageID);
        };
    };