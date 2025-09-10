module.exports.config = {
    name: 'coveralime'
    , version: "1.0.0"
    , hasPermssion: 0
    , credits: "Darwin"
    , description: "baner"
    , commandCategory: "người dùng"
    , usages: ""
    , cooldowns: 5
};
const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
const StackBlur = require("stackblur-canvas");
const {
    loadImage
    , createCanvas
    , registerFont
} = require("canvas");
const path = require('path');
module.exports.wrapText = (ctx, text, maxWidth) => {
    return new Promise(resolve => {
        if (ctx.measureText(text)
            .width < maxWidth) return resolve([text]);
        if (ctx.measureText('W')
            .width > maxWidth) return resolve(null);
        const words = text.split(' ');
        const lines = [];
        let line = '';
        while (words.length > 0) {
            let split = false;
            while (ctx.measureText(words[0])
                .width >= maxWidth) {
                const temp = words[0];
                words[0] = temp.slice(0, -1);
                if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
                else {
                    split = true;
                    words.splice(1, 0, temp.slice(-1));
                }
            }
            if (ctx.measureText(`${line}${words[0]}`)
                .width < maxWidth) line += `${words.shift()} `;
            else {
                lines.push(line.trim());
                line = '';
            }
            if (words.length === 0) lines.push(line.trim());
        }
        return resolve(lines);
    });
}
module.exports.run = async function ({
    api
    , args
    , event
    , permssion
}) {
    const lengthchar = (await axios.get('https://run.mocky.io/v3/12320763-40fa-4d2e-bee6-584aa153e224')).data
    if (args[0] == 'list') {
        try {
            var page = 1;
            var count = lengthchar.length
            page = parseInt(args[1]) || 1;
            page < -1 ? page = 1 : "";
            var limit = 15;
            var numPage = Math.ceil(count / limit);
            var msg = ``;
            for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                if (i >= count) break;
                msg += `[ ${i+1} ] - ${lengthchar[i].ID} | ${lengthchar[i].name}\n`;
            }
            msg += `Trang (${page}/${numPage})`;
            return api.sendMessage(msg, event.threadID, (err, info) => {
                return global.client.handleReply.push({
                    title: 'list'
                    , name: "coveralime"
                    , author: event.senderID
                    , messageID: info.messageID
                });
            }, event.messageID);
        } catch (error) {
            console.log(error)
        }
    }
    if (args[0] == "find" || args[0] == "tìm") {
        var find = args.slice(1)
            .join(" ")
        if (!isNaN(find)) {
            const t = (await axios.get(`${lengthchar[find].imgAnime}`, {
                    responseType: "stream"
                }))
                .data;
            const msg = ({
                body: `char mang số thứ tự ${find}, Name: ${lengthchar[find].name}`
                , attachment: t
            })
            return api.sendMessage(msg, event.threadID, event.messageID)
        } else {
            var d = lengthchar.filter(i => i.name.toUpperCase() == find.toUpperCase())
            var text = ""
                , oi = [];
            for (let io = 0; io < d.length; io++) {
                const t = (await axios.get(`${d[io].imgAnime}`, {
                        responseType: "stream"
                    }))
                    .data;
                oi.push(t)
                text += `ID: ${d[io].ID} || Name: ${d[io].name}\n\n`
            }
            const msg = ({
                body: text
                , attachment: oi
            })
            return api.sendMessage(msg, event.threadID, event.messageID)
        }
    }
    if (!args[0]) {
        const abcxyz = ["https://i.imgur.com/sFphBjh.png", "https://i.imgur.com/QPmb2qZ.png", "https://i.imgur.com/vojBebh.png", "https://i.imgur.com/1EyUFuY.png", "https://i.imgur.com/WUY33u9.png", "https://i.imgur.com/5UYH36b.png", "https://i.imgur.com/UZjSQRL.png", "https://i.imgur.com/462GxGJ.png", "https://i.imgur.com/yI2seC0.png"]
        let o = [];
        for (let i = 0; i < abcxyz.length; i++) {
            const t = (await axios.get(`${abcxyz[i]}`, {
                    responseType: "stream"
                }))
                .data;
            o.push(t)
        }
        const msg = ({
            body: "Reply Tin Nhắn Để Chọn Kiểu"
            , attachment: o
        })
        return api.sendMessage(msg, event.threadID, (err, info) => {
            return global.client.handleReply.push({
                step: 1
                , name: 'coveralime'
                , author: event.senderID
                , messageID: info.messageID
            });
        }, event.messageID);
    }
}
module.exports.handleReply = async function ({
    api
    , event
    , args
    , handleReply
    , client
    , __GLOBAL
    , Threads
    , Users
    , Currencies
}) {
    try {
        if (handleReply.author != event.senderID) return api.sendMessage('CúC', event.threaID);
        let pathImg1 = __dirname + `/tad/avatar_1_11.png`;
        let pathImg2 = __dirname + `/tad/avatar_1_21.png`;
        let pathImg = __dirname + `/tad/avatar_1.png`;
        let pathAva = __dirname + `/tad/avatar_2.png`;
        let pathLine = __dirname + `/tad/avatar_3.png`;
        let pathLine2 = __dirname + `/tad/avatar_34.png`;
        let pathLine3 = __dirname + `/tad/avatar_33.png`;
        let pathLine4 = __dirname + `/tad/avatar_31.png`;
        let pathLine5 = __dirname + `/tad/avatar_32.png`;
        let pathLine6 = __dirname + `/tad/avatar_33.png`;
        let pathLine7 = __dirname + `/tad/avatar_3s3.png`;
        let pathIcon = __dirname + `/tad/avatar_3ds23c12311.png`;
        let pathIconIG = __dirname + `/tad/sssss.png`;
        let pathIcongithub = __dirname + `/tad/owo.png`;
        let line = __dirname + `/tad/12341o.png`;
        const lengthchar = (await axios.get('https://run.mocky.io/v3/12320763-40fa-4d2e-bee6-584aa153e224'))
            .data
        if (handleReply.title == 'list') {
            var page = 1;
            var count = lengthchar.length
            page = parseInt(event.body) || 1;
            page < -1 ? page = 1 : "";
            var limit = 15;
            var numPage = Math.ceil(count / limit);
            var msg = ``;
            for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                if (i >= count) break;
                msg += `[ ${i+1} ] - ${lengthchar[i].ID} | ${lengthchar[i].name}\n`;
            }
            msg += `Trang (${page}/${numPage})`;
            return api.sendMessage(msg, event.threadID, (err, info) => {
                return global.client.handleReply.push({
                    title: 'list'
                    , name: "coveralime"
                    , author: event.senderID
                    , messageID: info.messageID
                });
            }, event.messageID);

        }
        if (!fs.existsSync(__dirname +
                `/tad/GMV_DIN_Pro.ttf`)) {
            let getfont = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/GMV_DIN_Pro.ttf`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/GMV_DIN_Pro.ttf`, Buffer.from(getfont, "utf-8"));
        };
        if (!fs.existsSync(__dirname + `Asem-Kandis-PERSONAL-USE.ttf`)) {
            let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/Asem-Kandis-PERSONAL-USE.ttf`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/Asem-Kandis-PERSONAL-USE.ttf`, Buffer.from(getfont2, "utf-8"));
        };
        if (!fs.existsSync(__dirname + `/tad/MTD William Letter.otf`)) {
            let getfont3 = (await axios.get(`https://drive.google.com/u/0/uc?id=1HsVzLw3LOsKfIeuCm9VlTuN_9zqucOni&export=download`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/MTD William Letter.otf`, Buffer.from(getfont3, "utf-8"));
        };
        if (!fs.existsSync(__dirname + `/tad/SteelfishRg-Regular.otf`)) {
            let getfont4 = (await axios.get(`https://drive.google.com/u/0/uc?id=1SZD5VXMnXQTBYzHG834pHnfyt7B2tfRF&export=download`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/SteelfishRg-Regular.otf`, Buffer.from(getfont4, "utf-8"));
        };
        if (!fs.existsSync(__dirname + `/tad/SVN-BigNoodleTitling.otf`)) {
            let getfont5 = (await axios.get(`https://drive.google.com/u/0/uc?id=1uCXXgyepedb9xwlqMsMsvH48D6wwCmUn&export=download`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/SVN-BigNoodleTitling.otf`, Buffer.from(getfont5, "utf-8"));
        };
        if (!fs.existsSync(__dirname +
                `/tad/MTOJamai.ttf`)) {
            let getfon2t = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/MTOJamai.ttf`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/MTOJamai.ttf`, Buffer.from(getfon2t, "utf-8"));
        }
        if (!fs.existsSync(__dirname +
                `/tad/phenomicon.ttf`)) {
            let getfontzz = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/phenomicon.ttf`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/phenomicon.ttf`, Buffer.from(getfontzz, "utf-8"));
        };
        if (!fs.existsSync(__dirname +
                `/tad/SVN-Big Noodle Titling.otf`)) {
            let getfon2ts = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/SVN-Big%20Noodle%20Titling.otf`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/SVN-Big Noodle Titling.otf`, Buffer.from(getfon2ts, "utf-8"));
        };
        if (!fs.existsSync(__dirname +
                `/tad/EBGaramond-VariableFont_wght.ttf`)) {
            let getfon2tcc = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/EBGaramond-VariableFont_wght.ttf`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/EBGaramond-VariableFont_wght.ttf`, Buffer.from(getfon2tcc, "utf-8"));
        }
        if (!fs.existsSync(__dirname +
                `/tad/ElaineSans-SemiBold.ttf`)) {
            let getfon2tccc = (await axios.get(`https://drive.google.com/u/0/uc?id=16dAZYfQxE40WTmQdLm0Fsipe9n9NTWth&export=download`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/ElaineSans-SemiBold.ttf`, Buffer.from(getfon2tccc, "utf-8"));
        }
        if (!fs.existsSync(__dirname +
                `/tad/felix.otf`)) {
            let getfon2tcccc = (await axios.get(`https://drive.google.com/u/0/uc?id=1Z683mRvmqEDxSMrKzcU35SjAdwXnW7Um&export=download`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/felix.otf`, Buffer.from(getfon2tcccc, "utf-8"));
        }
        if (!fs.existsSync(__dirname +
                `/tad/A-Space_Black.otf`)) {
            let gf = (await axios.get(`https://drive.google.com/u/0/uc?id=15k4vLRMILXztCDy7-bcFQ4Ydx1Wqaat2&export=download`, {
                    responseType: "arraybuffer"
                }))
                .data;
            fs.writeFileSync(__dirname + `/tad/A-Space_Black.otf`, Buffer.from(gf, "utf-8"));
        }
        const {
            threadID
            , messageID
            , senderID
        } = event;
        if (handleReply.step == 1) {
            if (isNaN(event.body)) return api.sendMessage('Không phải là một con số ?', event.threadID)
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn đã chọn kiểu là ${event.body} reply tin nhắn này để nhập id nhân vật`, threadID, function (err, info) {
                return global.client.handleReply.push({
                    step: 2
                    , name: "coveralime"
                    , author: handleReply.author
                    , kieu: event.body
                    , messageID: info.messageID
                })
            }, messageID);
        } else if (handleReply.step == 2) {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn đã chọn nhân vật là ${event.body} reply tin nhắn này để nhập tên chính`, threadID, function (err, info) {
                return global.client.handleReply.push({
                    step: 3
                    , name: "coveralime"
                    , author: handleReply.author
                    , kieu: handleReply.kieu
                    , idnv: event.body
                    , messageID: info.messageID
                })
            }, messageID);
        } else if (handleReply.step == 3) {
            api.unsendMessage(handleReply.messageID);
            if (handleReply.kieu == 9 && handleReply.step == 3) {
                return api.sendMessage(`Bạn đã chọn tên chính là ${event.body}, reply tin nhắn này để tạo này tạo màu`, threadID, function (err, info) {
                    return global.client.handleReply.push({
                        step: 5
                        , name: "coveralime"
                        , author: handleReply.author
                        , kieu: handleReply.kieu
                        , idnv: handleReply.idnv
                        , tenchinh: event.body
                        , messageID: info.messageID
                    })
                }, messageID);
            }
            if (handleReply.kieu == 8 && handleReply.step == 3) {
                return api.sendMessage(`Bạn đã chọn tên chính là ${event.body}, reply tin nhắn này để tạo này tạo kia`, threadID, function (err, info) {
                    return global.client.handleReply.push({
                        step: 3.4
                        , name: "coveralime"
                        , author: handleReply.author
                        , kieu: handleReply.kieu
                        , idnv: handleReply.idnv
                        , tenchinh: event.body
                        , messageID: info.messageID
                    })
                }, messageID);
            }
            if (handleReply.kieu == 7 && handleReply.step == 3) {
                return api.sendMessage(`Bạn đã chọn tên chính là ${event.body}, reply tin nhắn này để tạo độ mờ cho ảnh`, threadID, function (err, info) {
                    return global.client.handleReply.push({
                        step: 3.1
                        , name: "coveralime"
                        , author: handleReply.author
                        , kieu: handleReply.kieu
                        , idnv: handleReply.idnv
                        , tenchinh: event.body
                        , messageID: info.messageID
                    })
                }, messageID);
            }
            if (handleReply.kieu == 5 && handleReply.step == 3) {
                return api.sendMessage(`Bạn đã chọn tên chính là ${event.body}, reply tin nhắn này để chọn màu ( hãy ghi no nếu bạn muốn dùng màu mặc định )`, threadID, function (err, info) {
                    return global.client.handleReply.push({
                        step: 5
                        , name: "coveralime"
                        , author: handleReply.author
                        , kieu: handleReply.kieu
                        , idnv: handleReply.idnv
                        , tenchinh: event.body
                        , messageID: info.messageID
                    })
                }, messageID);
            } else {
                return api.sendMessage(`Bạn đã chọn tên chính là ${event.body} reply tin nhắn này để nhập tên phụ`, threadID, function (err, info) {
                    return global.client.handleReply.push({
                        step: 4
                        , name: "coveralime"
                        , author: handleReply.author
                        , kieu: handleReply.kieu
                        , idnv: handleReply.idnv
                        , tenchinh: event.body
                        , messageID: info.messageID
                    })
                }, messageID);
            }
        }
        if (handleReply.step == 3.4) {
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage(`Bạn Đã Chọn Nhập Cái Xàm Xàm thứ 1 là ${event.body}, reply để nhập cái xàm xàm thứ 2`, threadID, function (err, info) {
                return global.client.handleReply.push({
                    step: 3.5
                    , name: "coveralime"
                    , author: handleReply.author
                    , kieu: handleReply.kieu
                    , tenchinh: handleReply.tenchinh
                    , idnv: handleReply.idnv
                    , messageID: info.messageID
                    , xam1: event.body
                })
            })
        }
        if (handleReply.step == 3.5) {
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage(`Bạn Đã Chọn Nhập Cái Xàm Xàm thứ 2 là ${event.body}, reply chon mau`, threadID, function (err, info) {
                return global.client.handleReply.push({
                    step: 5
                    , name: "coveralime"
                    , author: handleReply.author
                    , kieu: handleReply.kieu
                    , tenchinh: handleReply.tenchinh
                    , idnv: handleReply.idnv
                    , messageID: info.messageID
                    , xam1: handleReply.xam1
                    , xam2: event.body
                })
            })
        }
        if (handleReply.step == 3.1) {
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage(`Bạn đã chọn độ mờ của ảnh là ${event.body}%, reply tin nhắn này để nhập màu`, threadID, function (err, info) {
                return global.client.handleReply.push({
                    step: 5
                    , name: "coveralime"
                    , author: handleReply.author
                    , kieu: handleReply.kieu
                    , idnv: handleReply.idnv
                    , tenchinh: handleReply.tenchinh
                    , domo: event.body
                    , messageID: info.messageID
                })
            }, messageID);
        } else if (handleReply.step == 4) {
            api.unsendMessage(handleReply.messageID);
            if (handleReply.kieu == 6) {
                return api.sendMessage(`Bạn đã chọn tên phụ là ${event.body}, reply tin nhắn này ghi những gì bạn thích`, threadID, function (err, info) {
                    return global.client.handleReply.push({
                        step: 4.1
                        , name: "coveralime"
                        , author: handleReply.author
                        , kieu: handleReply.kieu
                        , idnv: handleReply.idnv
                        , tenchinh: handleReply.tenchinh
                        , tenphu: event.body
                        , messageID: info.messageID
                    })
                }, messageID);
            } else {
                return api.sendMessage(`Bạn đã chọn tên phụ là ${event.body}, reply tin nhắn này để chọn màu ( hãy ghi no nếu bạn muốn dùng màu mặc định )`, threadID, function (err, info) {
                    return global.client.handleReply.push({
                        step: 5
                        , name: "coveralime"
                        , author: handleReply.author
                        , kieu: handleReply.kieu
                        , idnv: handleReply.idnv
                        , tenchinh: handleReply.tenchinh
                        , tenphu: event.body
                        , messageID: info.messageID
                    })
                }, messageID);
            }
        } else if (handleReply.step == 4.1) {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn đã chọn cái vớ vẩn gì đó là ${event.body}, reply để nhập link hoặc cc gì đó`, threadID, function (err, info) {
                return global.client.handleReply.push({
                    step: 4.2
                    , name: "coveralime"
                    , author: handleReply.author
                    , kieu: handleReply.kieu
                    , idnv: handleReply.idnv
                    , tenchinh: handleReply.tenchinh
                    , tenphu: handleReply.tenphu
                    , fact: event.body
                    , messageID: info.messageID
                })
            }, messageID);
        } else if (handleReply.step == 4.2) {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn đã chọn cái vớ vẩn gì đó thứ 2 là ${event.body}, reply để nhập màu`, threadID, function (err, info) {
                return global.client.handleReply.push({
                    step: 5
                    , name: "coveralime"
                    , author: handleReply.author
                    , kieu: handleReply.kieu
                    , idnv: handleReply.idnv
                    , tenchinh: handleReply.tenchinh
                    , tenphu: handleReply.tenphu
                    , fact: handleReply.fact
                    , abcxyzlm: event.body
                    , messageID: info.messageID
                })
            }, messageID);
        } else if (handleReply.step == 5) {
            const type = handleReply.kieu;
            const char = handleReply.idnv;
            const tenchinh = handleReply.tenchinh;
            const subname = handleReply.tenphu;
            const color = event.body;
            if (color == "no" || color == "No") {
                var color_ = lengthchar[char].colorBg;
            } else {
                var color_ = color;
            }
            if (type == 1) {
                let avtAnime = (
                        await axios.get(encodeURI(`${lengthchar[char].imgAnime}`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                let line = (await axios.get(encodeURI(
                        `https://i.imgur.com/4BQHmeI.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                let background = (await axios.get(encodeURI(`https://i.imgur.com/HUblFwC.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
                fs.writeFileSync(pathLine, Buffer.from(line, "utf-8"));
                fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
                let a = await loadImage(pathImg);
                let ab = await loadImage(pathAva);
                let az = await loadImage(pathLine);
                let canvas1 = createCanvas(1500, 1500);
                var ctx1 = canvas1.getContext("2d");
                let canvas = createCanvas(a.width, a.height);
                var ctx = canvas.getContext("2d");
                ctx1.fillStyle = "#ffff"
                ctx1.fillRect(0, 0, 1500, 1500)
                ctx1.save();
                ctx1.globalAlpha = "0.3";
                ctx1.drawImage(ab, 0, 0, 1500, 1500);
                ctx1.restore();
                ctx1.save();
                ctx1.fillStyle = "#000"
                ctx1.globalCompositeOperation = "color";
                ctx1.fillRect(0, 0, 1500, 1500)
                ctx1.restore();
                ctx.clearRect(0, 0, canvas.width, canvas.width);
                ctx.fillStyle = color_;
                ctx.fillRect(0, 0, canvas.width, canvas.width);
                ctx.globalCompositeOperation = "destination-in";
                ctx.drawImage(a, 0, 0, canvas.width, canvas.width);
                ctx.globalCompositeOperation = "destination-over";
                ctx.save();
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.width);
                ctx.restore();
                ctx.globalCompositeOperation = "source-over";
                ctx.save();
                ctx.fillStyle = "rgba(255, 255, 255,0.8)";
                ctx.restore();
                ctx.save();
                ctx.fillStyle = '#FFF';
                ctx.fillRect(0, 700, 1500, 337);
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = color_
                ctx.filter = 'grayscale(1)';
                ctx.globalAlpha = "0.7";
                //ctx.fillStyle = 'grayscale(1)';
                ctx.fillRect(0, 730, 1500, 275);
                ctx.drawImage(az, 0, 0, canvas.width, canvas.width);
                ctx.globalCompositeOperation = "multiply";
                ctx.drawImage(canvas1, -canvas.width / 4, -canvas.width / 4, canvas.width * 1.5, canvas.width * 1.5);
                ctx.restore();
                ctx.textAlign = "center";
                registerFont(__dirname + `/tad/GMV_DIN_Pro.ttf`, {
                    family: "GMV DIN Pro Cond"
                });
                ctx.fillStyle = "rgba(255, 255, 255,0.8)";
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 2;
                ctx.font = "250px GMV DIN Pro Cond";
                ctx.strokeText(tenchinh, canvas.width / 2, 664);
                ctx.fillText(tenchinh, canvas.width / 2, 945);
                ctx.restore();
                ctx.save();
                ctx.save();
                ctx.drawImage(ab, 0, 0, canvas.width, canvas.width);
                ctx.restore();
                ctx.save();
                registerFont(__dirname + `/tad/Asem-Kandis-PERSONAL-USE.ttf`, {
                    family: "Asem Kandis"
                });
                ctx.textAlign = "center";
                ctx.fillStyle = color_;
                ctx.font = "120px Asem Kandis"
                ctx.fillText(subname, canvas.width / 2, 200)
                ctx.save();
                ctx.beginPath();
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: "Ảnh Của Bạn Đây"
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , fs.unlinkSync(pathAva)
                    , fs.unlinkSync(pathLine)
                    , event.messageID
                );
            } else if (type == 2) {
                let avtAnime = (
                        await axios.get(encodeURI(`${lengthchar[char].imgAnime}`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                let line = (await axios.get(encodeURI(
                        `https://1.bp.blogspot.com/-5SECGn_32Co/YQkQ-ZyDSPI/AAAAAAAAv1o/nZYKV0s_UPY41XlfWfNIX0HbVoRLhnlogCNcBGAsYHQ/s0/line.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                let background = (await axios.get(encodeURI(`https://i.imgur.com/j8FVO1W.jpg`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
                fs.writeFileSync(pathLine, Buffer.from(line, "utf-8"));
                fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
                let amg = await loadImage(pathImg);
                let cmg = await loadImage(pathAva);
                let omg = await loadImage(pathLine);
                let canvas = createCanvas(amg.width, amg.height);
                let ctx = canvas.getContext("2d");
                ctx.fillStyle = "#ffffff"
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.fillStyle = color_
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                registerFont(__dirname + `/tad/SteelfishRg-Regular.otf`, {
                    family: "SteelfishRg-Regular"
                });
                ctx.font = `430px SteelfishRg-Regular`;
                ctx.textAlign = "center";
                ctx.fillStyle = "rgb(255 255 255 / 70%)"
                ctx.globalAlpha = 0.7
                ctx.fillText(tenchinh.toUpperCase(), canvas.width / 2, 1350)
                ctx.globalAlpha = 1
                ctx.strokeStyle = "white"
                ctx.lineWidth = 7
                ctx.textAlign = "center"
                ctx.strokeText(tenchinh.toUpperCase(), canvas.width / 2, 900)
                ctx.strokeText(tenchinh.toUpperCase(), canvas.width / 2, 1800)
                ctx.drawImage(cmg, 0, 0, 2000, 2000);
                ctx.drawImage(omg, 0, 0, canvas.width, canvas.height)
                registerFont(__dirname + `/tad/MTD William Letter.otf`, {
                    family: "MTD William Letter"
                });
                ctx.font = `300px MTD William Letter`;
                ctx.fillStyle = `#FFFFFF`
                ctx.textAlign = "center";
                ctx.fillText(subname, canvas.width / 2, 350);
                ctx.beginPath();
                ctx.beginPath();
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: "Ảnh Của Bạn Đây"
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , fs.unlinkSync(pathAva)
                    , fs.unlinkSync(pathLine)
                    , event.messageID
                );
            } else if (type == 3) {
                let avtAnime = (
                        await axios.get(encodeURI(`${lengthchar[char].imgAnime}`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                let background = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-p0IHqcx8eWE/YXZN2izzTrI/AAAAAAAAym8/T-hqrJ2IFooUfHPeVTbiwu047RkmxGLzgCNcBGAsYHQ/s0/layer2.jpg`), {
                            responseType: "arraybuffer"
                        , })
                    )
                    .data;
                let hieuung = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-F8w1tQRZ9s0/YXZZmKaylRI/AAAAAAAAynI/HBoYISaw-LE2z8QOE39OGwTUiFjHUH6xgCNcBGAsYHQ/s0/layer4.png`), {
                            responseType: "arraybuffer"
                        , })
                    )
                    .data;
                fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
                fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
                fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
                let h = await loadImage(pathImg);
                let u = await loadImage(pathAva);
                let k = await loadImage(pathLine);
                let canvas = createCanvas(h.width, h.height);
                let ctx = canvas.getContext("2d");
                ctx.drawImage(h, 0, 0, h.width, h.height);
                ctx.fillStyle = color_;
                ctx.filter = "grayscale(1)"
                ctx.fillRect(0, 164, canvas.width, 633)
                ctx.drawImage(k, 0, 0, h.width, h.height);
                ctx.globalAlpha = 0.5
                ctx.drawImage(u, 0, -320, canvas.width, canvas.width)
                ctx.beginPath();
                ctx.globalAlpha = 1
                ctx.transform(1, 0, -0.2, 1, 0, 0)
                registerFont(__dirname + `/tad/SVN-BigNoodleTitling.otf`, {
                    family: "SVN-BigNoodleTitling"
                });
                ctx.font = `italic 200px SVN-BigNoodleTitling`;
                ctx.fillStyle = `#FFFFFF`
                ctx.textAlign = "end";
                ctx.globalAlpha = 0.8
                ctx.fillText(tenchinh.toUpperCase(), 1215, 535);
                registerFont(__dirname + `/tad/SVN-BigNoodleTitling.otf`, {
                    family: "SVN-BigNoodleTitling"
                });
                ctx.font = `60px SVN-BigNoodleTitling`;
                ctx.fillStyle = `#FFFFFF`
                ctx.textAlign = "end";
                ctx.globalAlpha = 1
                var l = ctx.measureText(subname)
                    .width;
                ctx.fillRect(1500, 164, 150, 633)
                ctx.fillRect(canvas.width - l - 540, 580, l + 50, 75)
                ctx.fillStyle = color_
                ctx.fillText(subname.toUpperCase(), 1195, 640);
                ctx.fillStyle = `#FFFFFF`
                ctx.globalAlpha = 0.5
                ctx.fillRect(1300, 164, 150, 633)
                ctx.globalAlpha = 1
                ctx.transform(1, 0, 0.2, 1, 0, 0)
                ctx.filter = "grayscale(0)"
                ctx.drawImage(u, 1010, 97, 700, 700)
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: `Ảnh của bạn đây`
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , fs.unlinkSync(pathAva)
                    , fs.unlinkSync(pathLine)
                    , event.messageID
                );
            } else if (type == 4) {
                let background = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-JZxo4uTVIKQ/YaS7VBjAojI/AAAAAAAA1rk/mg_Bp0Z6_yUGLp1lfC9ugriYTGFfRaXTwCNcBGAsYHQ/s0/layer-2.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
                let background2 = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-j9JKCim94ks/YaIMA7fVnPI/AAAAAAAA1k8/g9e5X5FfRH4NiG-7hHRNikGxViI2o8pYQCNcBGAsYHQ/s0/layer-3.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathImg1, Buffer.from(background2, "utf-8"));
                let background3 = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-F8w1tQRZ9s0/YXZZmKaylRI/AAAAAAAAynI/HBoYISaw-LE2z8QOE39OGwTUiFjHUH6xgCNcBGAsYHQ/s0/layer4.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathImg2, Buffer.from(background3, "utf-8"));
                let ava = (await axios.get(encodeURI(`${lengthchar[char].imgAnime}`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
                if (!fs.existsSync(__dirname +
                        `/tad/UTM-Avo.ttf`)) {
                    let getfont = (await axios.get(`https://github.com/hanakuUwU/font/blob/main/UTM%20Avo.ttf?raw=true`, {
                            responseType: "arraybuffer"
                        }))
                        .data;
                    fs.writeFileSync(__dirname + `/tad/UTM-Avo.ttf`, Buffer.from(getfont, "utf-8"));
                }
                const test = "https://facebook.com/" + event.senderID;
                let l1 = await loadImage(pathAva);
                let l2 = await loadImage(pathImg);
                let l3 = await loadImage(pathImg1);
                let l4 = await loadImage(pathImg2);
                let a = await loadImage(pathImg);
                let canvas = createCanvas(a.width, a.height);
                var ctx = canvas.getContext("2d");
                registerFont(__dirname + `/tad/UTM-Avo.ttf`, {
                    family: "UTM-Avo"
                });
                ctx.save();
                ctx.fillStyle = color_;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
                ctx.save();
                ctx.drawImage(l2, 0, 0, canvas.width, canvas.height);
                ctx.restore();
                ctx.save();
                ctx.globalCompositeOperation = "multiply";
                ctx.globalAlpha = "0.5"
                ctx.drawImage(l1, -300, -300, 1500, 1500);
                ctx.restore();
                ctx.save();
                ctx.fillStyle = "#fff";
                ctx.transform(1, 0, 1, 1, 0, 0);
                ctx.fillRect(500, 0, 650, 740);
                ctx.restore();


                ctx.save();
                ctx.beginPath();
                ctx.save();
                ctx.transform(1, 0, 1, 1, 0, 0);
                ctx.rect(500, 0, 650, 740);
                ctx.restore();
                ctx.clip();
                ctx.save();
                ctx.globalAlpha = "0.1";
                ctx.drawImage(l1, 300, -300, 1500, 1500);
                ctx.restore();
                ctx.save();
                ctx.drawImage(l3, 0, 0, canvas.width, canvas.height);
                ctx.restore();
                ctx.save();
                ctx.globalCompositeOperation = "color";
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
                ctx.restore();
                var ttx = 950;
                var tty = 600;
                var ttpad = 180;
                var ttsize = "300px";
                ctx.save();
                ctx.beginPath();
                ctx.save();
                ctx.transform(1, 0, 1, 1, 0, 0);
                ctx.rect(500, 0, 650, 740);
                ctx.restore();
                ctx.clip();
                ctx.save();
                ctx.translate(ttx, tty);
                ctx.globalAlpha = 0.5;
                ctx.rotate(Math.PI / 180 * 45);
                ctx.strokeStyle = color_;
                ctx.lineWidth = 4;
                ctx.textAlign = "center";
                ctx.font = ttsize + " DIN Condensed";
                ctx.strokeText(subname.split("")
                    .join(String.fromCharCode(8203)), 0, 0);
                ctx.restore();
                ctx.save();
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = color_;
                ctx.lineWidth = 2;
                ctx.translate(ttx + ttpad, tty - ttpad);
                ctx.rotate(Math.PI / 180 * 45);
                ctx.textAlign = "center";
                ctx.font = ttsize + " DIN Condensed";
                ctx.fillText(subname.split("")
                    .join(String.fromCharCode(8202)), 0, 0);
                ctx.restore();
                ctx.strokeStyle = color_;
                ctx.globalAlpha = 0.4;
                ctx.lineWidth = 5;
                ctx.translate(ttx + ttpad * 2, tty - ttpad * 2);
                ctx.rotate(Math.PI / 180 * 45);
                ctx.textAlign = "center";
                ctx.font = ttsize + " DIN Condensed";
                ctx.strokeText(subname.split("")
                    .join(String.fromCharCode(8202)), 0, 0);
                ctx.restore();
                ctx.restore();
                ctx.save();
                ctx.shadowColor = "rgba(0,0,0, 0.3)";
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.drawImage(l1, 900, -200, 1000, 1000);
                ctx.restore();
                ctx.save();
                //ctx.style.letterSpacing = '5px';
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                ctx.font = "bold 65px UTM-Avo";
                ctx.fillText(tenchinh, 430, 390);
                ctx.restore();
                ctx.save();
                // ctx.style.letterSpacing = '10px';
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                ctx.font = "27px UTM-Avo";
                ctx.fillText(test.toUpperCase(), 430, 440);
                ctx.restore();
                ctx.save();
                ctx.fillStyle = "#fff";
                ctx.fillRect(430 - 300 / 2, 470, 300, 5)
                ctx.font = "27px UTM-Avo";
                ctx.fillText("+++".toUpperCase(), 150, 300);
                ctx.restore();
                ctx.beginPath();
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: "Ảnh Của Bạn Đây"
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , fs.unlinkSync(pathImg1)
                    , fs.unlinkSync(pathImg2)
                    , fs.unlinkSync(pathAva)
                    , event.messageID
                );
            } else if (type == 5) {
                let avtAnime = (
                        await axios.get(encodeURI(`${lengthchar[char].imgAnime}`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
                ///bg
                let bg1 = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-tZ8DTN-bXEY/YhScBI5VuSI/AAAAAAAA5QI/8OxatfQvJU8q4TWk8vo9OWawDRn0aQhOACNcBGAsYHQ/s0/a1.png`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathImg, Buffer.from(bg1, "utf-8"));
                //line
                let line1 = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-_GlhDWCWQLA/YhScA7so4UI/AAAAAAAA5QA/4NqayceKTTkbQrPT0Cu5TQCuEp-V95T3ACNcBGAsYHQ/s0/a2.png`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathLine, Buffer.from(line1, "utf-8"));
                //line
                let line2 = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-IiDSkRdLuK4/YhScA1Xd7WI/AAAAAAAA5QE/KlFoQuZpFc8W31A2C8-uUmXkpvLbmL6JQCNcBGAsYHQ/s0/a3.png`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathLine2, Buffer.from(line2, "utf-8"));
                //line
                let line7 = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-jagDZ8l1rwc/YhSbpTKubAI/AAAAAAAA5P4/GYy2WICTkHAM0AoJvYhsLc6asVsnbAR2wCNcBGAsYHQ/s0/l1.png`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathLine7, Buffer.from(line7, "utf-8"));
                //line
                let line3 = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-jagDZ8l1rwc/YhSbpTKubAI/AAAAAAAA5P4/GYy2WICTkHAM0AoJvYhsLc6asVsnbAR2wCNcBGAsYHQ/s0/l1.png`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathLine3, Buffer.from(line3, "utf-8"));
                //line
                let line4 = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-EE6U5xmi_QY/YhScRCT94XI/AAAAAAAA5QY/6WJM0j7URsgjisGTEN-tgOJ6NVx_Ql5-ACNcBGAsYHQ/s0/l2.png`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathLine4, Buffer.from(line4, "utf-8"));
                //line
                let line5 = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-hkTkESFE1OU/YhSdWD3kR_I/AAAAAAAA5Qk/Fw4rwDc5CxEaLacLatZJLT6FAnm5dNYYACNcBGAsYHQ/s0/b1.png`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathLine5, Buffer.from(line5, "utf-8"));
                //line
                let line6 = (
                        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-U-P92f1nTfk/YhSdVnqbEFI/AAAAAAAA5Qg/UgA37F2XTCY0u_Cu0fghfppITmPZIokFwCNcBGAsYHQ/s0/b2.png`), {
                            responseType: "arraybuffer"
                        }))
                    .data;
                fs.writeFileSync(pathLine6, Buffer.from(line6, "utf-8"));
                let a = await loadImage(pathAva)
                let a1 = await loadImage(pathImg)
                let a2 = await loadImage(pathLine)
                let a3 = await loadImage(pathLine2)
                let l1 = await loadImage(pathLine3)
                let l2 = await loadImage(pathLine4)
                let b1 = await loadImage(pathLine5)
                let b2 = await loadImage(pathLine6)
                let u = await loadImage(pathLine7)
                let canvas = createCanvas(1080, 1920);
                let c1 = createCanvas(canvas.width, canvas.height);
                let c2 = createCanvas(canvas.width, canvas.height);
                let c3 = createCanvas(canvas.width, canvas.height);
                let c4 = createCanvas(canvas.width, canvas.height);
                let ctx = canvas.getContext("2d");
                let ctx1 = c1.getContext("2d");
                let ctx2 = c2.getContext("2d");
                let ctx3 = c3.getContext("2d");
                let ctx4 = c4.getContext("2d");
                ctx1.save();
                ctx1.drawImage(a1, 0, 0, canvas.width, canvas.height);
                ctx1.globalCompositeOperation = "source-in";
                ctx1.drawImage(a, -100, -1000, 1700, 1700);
                ctx1.restore();
                ctx2.save();
                ctx2.drawImage(a2, 0, 0, canvas.width, canvas.height);
                ctx2.globalCompositeOperation = "source-in";
                ctx2.drawImage(a, -500, -500, 1700, 1700);
                ctx2.restore();
                ctx3.save();
                ctx3.drawImage(a3, 0, 0, canvas.width, canvas.height);
                ctx3.globalCompositeOperation = "source-in";
                ctx3.drawImage(a, -550, 700, 1900, 1900);
                ctx3.restore();
                ctx4.save();
                ctx4.drawImage(b2, 0, 0, canvas.width, canvas.height);
                ctx4.globalCompositeOperation = "source-in";
                ctx4.fillStyle = color_;
                ctx4.fillRect(0, 0, canvas.width, canvas.height);
                ctx4.globalCompositeOperation = "destination-atop";
                ctx4.drawImage(b1, 0, 0, canvas.width, canvas.height);
                ctx4.restore();
                ctx.save();
                ctx.fillStyle = color_;
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(u, 0, 0, canvas.width, canvas.height)
                ctx.drawImage(l1, 0, 0, canvas.width, canvas.height)
                ctx.drawImage(c1, 0, 0, canvas.width, canvas.height)
                ctx.drawImage(c2, 0, 0, canvas.width, canvas.height)
                ctx.drawImage(c3, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(c4, -50, 130, 800, 800);
                ctx.drawImage(l2, 0, 0, canvas.width, canvas.height)
                ctx.restore();
                ctx.save();
                registerFont(__dirname + `/tad/MTOJamai.ttf`, {
                    family: "MTOJamai"
                });
                ctx.fillStyle = "#fff"
                ctx.font = "bold 80px MTO Jamai";
                ctx.transform(1, -0.1, 0, 1, 0, 0);
                ctx.textAlign = "center"
                ctx.shadowColor = "#000000";
                ctx.shadowBlur = 10;
                for (i = 0; i < 20; i++) {
                    ctx.fillText(tenchinh, 370, 580);
                    ctx.fillText(tenchinh, 370, 580 - 90);
                    ctx.fillText(tenchinh, 370, 580 + 90);
                }
                ctx.restore();
                ctx.shadowColor = "#000000";
                ctx.shadowBlur = 10;
                ctx.drawImage(a, -150, 220, 1700, 1700)
                ctx.beginPath();
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: "Ảnh Của Bạn Đây"
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , fs.unlinkSync(pathAva)
                    , fs.unlinkSync(pathLine)
                    , fs.unlinkSync(pathLine2)
                    , fs.unlinkSync(pathLine3)
                    , fs.unlinkSync(pathLine4)
                    , fs.unlinkSync(pathLine5), // fs.unlinkSync(pathLine6),
                    fs.unlinkSync(pathLine7)
                    , event.messageID
                );
            } else if (type == 6) {
                let line1 = (await axios.get(encodeURI(`https://imgur.com/g2xNV2C.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(line, Buffer.from(line1, "utf-8"));
                let background = (await axios.get(encodeURI(`https://imgur.com/qBMs0FN.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
                let ava = (await axios.get(encodeURI(`${lengthchar[char].imgAnime}`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
                let icon3 = (await axios.get(encodeURI(`https://imgur.com/38Ws4qZ.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathIcongithub, Buffer.from(icon3, "utf-8"));
                let liness = (await axios.get(encodeURI(`https://imgur.com/UxQ5Z0u.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathLine, Buffer.from(liness, "utf-8"));
                let icon = (await axios.get(encodeURI(`https://imgur.com/zmMas6s.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathIcon, Buffer.from(icon, "utf-8"));
                let icon2 = (await axios.get(encodeURI(`https://imgur.com/QsJPESz.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathIconIG, Buffer.from(icon2, "utf-8"));
                let l1 = await loadImage(pathAva);
                let a = await loadImage(pathImg);
                let p = await loadImage(pathLine);
                let l = await loadImage(line);
                let g = await loadImage(pathIcon);
                let r = await loadImage(pathIconIG);
                let o = await loadImage(pathIcongithub);
                let canvas = createCanvas(a.width, a.height);
                var ctx = canvas.getContext("2d");
                ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(l1, -100, -70, 1000, 1000);
                ctx.beginPath();
                ctx.globalCompositeOperation = "destination-out";
                ctx.drawImage(p, 0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "destination-over";
                ctx.fillStyle = color_;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "source-over";
                ctx.beginPath();
                ctx.drawImage(g, 1153, 690, 50, 50);
                ctx.drawImage(r, 1209, 692, 50, 50);
                ctx.drawImage(o, 1255, 680, 75, 75);
                registerFont(__dirname + `/tad/phenomicon.ttf`, {
                    family: "phenomicon"
                });
                ctx.textAlign = "start";
                ctx.strokeStyle = color_;
                ctx.filter = "brightness(90%) contrast(110%)";
                ctx.font = "150px phenomicon";
                ctx.fillText(tenchinh, 790, 390);
                ctx.restore();
                ctx.save();
                ////
                ctx.textAlign = "start";
                ctx.fillStyle = color_;
                ctx.font = "70px phenomicon"
                ctx.fillText(subname, 1200, 450)
                registerFont(__dirname + `/tad/EBGaramond-VariableFont_wght.ttf`, {
                    family: "BGaramond-VariableFont_wght"
                });
                ctx.font = "30px BGaramond-VariableFont_wght"
                ctx.fillStyle = color_;
                const abc = await this.wrapText(ctx, handleReply.fact, 750);
                ctx.fillText(abc.join('\n'), 790, 550)
                    ////
                registerFont(__dirname + `/tad/SVN-Big Noodle Titling.otf`, {
                    family: "time"
                });
                ctx.textAlign = "start";
                ctx.fillStyle = "#ffff";
                ctx.font = "35px time"
                const xyz = await this.wrapText(ctx, handleReply.abcxyzlm, 300);
                ctx.fillText(xyz.join('\n'), 790, 739)
                ctx.textAlign = "start";
                ctx.fillStyle = "#B6D6F2";
                ctx.font = "35px time"
                ctx.fillText("@HanakuUwU", 1340, 730)
                ctx.globalAlpha = 0.5
                ctx.drawImage(l, 0, 0, l.width, l.height);
                ctx.save()
                ctx.beginPath();
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: "Ảnh Của Bạn Đây"
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , fs.unlinkSync(pathAva)
                    , fs.unlinkSync(pathLine)
                    , fs.unlinkSync(pathIconIG)
                    , fs.unlinkSync(pathIcongithub)
                    , fs.unlinkSync(line)
                    , event.messageID
                );
            } else if (type == 7) {
                let background = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-B43Y_MPdTy0/YndMMcTh7KI/AAAAAAAA71c/_Tl593OS4jsRmOJuDB6P1ql2v5g0-PpPACNcBGAsYHQ/s0/layer.png`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
                let ava = (await axios.get(encodeURI(`${lengthchar[char].imgAnime}`), {
                        responseType: "arraybuffer"
                    }))
                    .data;
                fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
                let l1 = await loadImage(pathAva);
                let l2 = await loadImage(pathImg);
                let obx = handleReply.domo;
                let canvas = createCanvas(1250, 1950);
                var ctx = canvas.getContext("2d");
                let canvas1 = createCanvas(1950, 1950);
                var ctx1 = canvas1.getContext("2d");
                let canvas2 = createCanvas(1950, 1950);
                var ctx2 = canvas2.getContext("2d");
                var haki = tenchinh
                var t = ctx2.measureText(haki)
                    .width
                registerFont(__dirname + `/tad/GMV_DIN_Pro.ttf`, {
                    family: "GMV DIN Pro Cond"
                });
                ctx1.drawImage(l2, 400, 600, 1000, 1000)
                ctx1.beginPath();
                ctx1.arc(900, 1100, 350, 0, Math.PI * 2)
                ctx1.clip();
                ctx1.fillStyle = color_
                ctx1.fillRect(0, 0, canvas.width, canvas.height)
                ctx1.textAlign = 'center'
                ctx1.font = '900 120px GMV DIN Pro Cond'
                ctx1.strokeStyle = 'rgba(255,255,255,0.5)'
                ctx1.lineWidth = 3
                for (var iop = 0; iop < 7; iop++) {
                    ctx1.strokeText(
                        haki.toUpperCase()
                        , canvas1.width / 2 - 75
                        , 380 + 400 + 120 * iop
                    )
                }
                ctx1.drawImage(l1, 400, 600, 1000, 1000)
                ctx2.fillStyle = `#FFFFFF`
                ctx2.font = `100px GMV DIN Pro Cond`;
                ctx2.fillRect(canvas.width / 2 - t + 125 / 2 - 440, 1300, t * 2 + 550, 100)
                ctx2.globalCompositeOperation = 'destination-out'
                ctx2.fillStyle = `#FFFFFF`
                ctx2.textAlign = 'center';
                ctx2.fillText(haki.toUpperCase(), canvas.width / 2 - 100, 1390);
                ctx.save();
                ctx.fillStyle = color_
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(l1, canvas.width / 2 - canvas.height + 1200 / 2 - 150, -1000, canvas.height + 1200, canvas.height + 1200)
                StackBlur.canvasRGB(canvas, 0, 0, canvas.width, canvas.height, obx);
                ctx.save()
                ctx.globalAlpha = '15'
                ctx.fillStyle = 'rgba(0,0,0)'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.shadowColor = 'rgba(0,0,0,0.2)'
                ctx.shadowBlur = 20
                ctx.drawImage(canvas1, -250, -250, 2000, 2000)
                ctx.shadowColor = 'rgba(0,0,0,0.2)'
                ctx.shadowBlur = 20
                ctx.drawImage(canvas2, 125, 100, 2000, 2000)
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: "Ảnh Của Bạn Đây"
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , fs.unlinkSync(pathAva)
                    , event.messageID
                );
            }
            if (handleReply.kieu == 8) {
                registerFont(__dirname + `/tad/felix.otf`, {
                    family: "felix"
                });
                registerFont(__dirname + `/tad/ElaineSans-SemiBold.ttf`, {
                    family: "ElaineSans"
                });
                let canvas = createCanvas(2920, 1080);
                let canvas1 = createCanvas(2920, 1080);
                let canvas2 = createCanvas(2920, 1080);
                let l1 = await loadImage(lengthchar[char].imgAnime);
                let ctx = canvas.getContext("2d");
                let ctx1 = canvas1.getContext("2d");
                let ctx2 = canvas2.getContext("2d");
                let canvas3 = createCanvas(1500, 1500);
                var ctx3 = canvas3.getContext("2d");
                ctx3.fillStyle = "#ffff"
                ctx3.fillRect(0, 0, 1500, 1500)
                ctx3.save();
                ctx3.globalAlpha = "0.3";
                ctx3.drawImage(l1, 0, 0, 1500, 1500);
                ctx3.restore();
                ctx3.save();
                ctx3.fillStyle = "#FFF"
                ctx3.globalCompositeOperation = "color";
                ctx3.fillRect(0, 0, 1500, 1500)
                ctx3.restore();
                ctx1.fillStyle = "white"
                ctx1.fillRect(0, 0, 2920, 1080)
                ctx1.transform(1, 0, -0.45, 1, -3, 0)
                ctx1.fillStyle = color_
                ctx1.fillRect(0, 0, 1480, 1080);
                ctx2.transform(1, 0, -0.45, 1, -3, 0)
                ctx2.fillStyle = "white"
                ctx2.fillRect(1050, 0, 10, 1080);
                ctx2.fillRect(630, 0, 10, 1080);
                ctx.drawImage(canvas1, 0, 0, 2920, 1080)
                ctx.drawImage(canvas3, 1950, -290, 1500, 1500)
                ctx.drawImage(l1, -220, -290, 1500, 1500)
                ctx.drawImage(canvas2, 0, 0, 2920, 1080)
                ctx.fillStyle = color_
                ctx.fillRect(1800, 650, 2600, 10)
                ctx.font = "200px felix";
                ctx.fillText(".", 1760, 663);
                ctx.font = "110px ElaineSans";
                ctx.textAlign = 'left';
                ctx.shadowColor = "#cfe2f3"
                ctx.shadowOffsetX = '5';
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = '10';
                ctx.fillText((handleReply.tenchinh)
                    .toUpperCase(), 1800, 570);
                ctx.font = "50px ElaineSans";
                ctx.fillText(handleReply.xam1, 1850, 630);
                var a = await this.wrapText(ctx, handleReply.xam2, 1030);
                ctx.fillText(a.join('\n'), 1850, 730)
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: "Ảnh Của Bạn Đây"
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , event.messageID
                );
            }
            if (handleReply.kieu == 9) {
                registerFont(__dirname + `/tad/A-Space_Black.otf`, {
                    family: "A-Space_Black"
                });
                let canvas = createCanvas(3920, 1080);
                let l1 = await loadImage(lengthchar[char].imgAnime);
                let ctx = canvas.getContext("2d");
                ctx.save();
                ctx.fillStyle = color_;
                ctx.fillRect(0, 0, 3920, 1080);
                ctx.save();
                ctx.globalAlpha = 0.2;
                ctx.drawImage(l1, -300, -230, 1600, 1600)
                ctx.drawImage(l1, 2650, -430, 1600, 1600)
                ctx.restore();
                ctx.shadowColor = "white";
                ctx.shadowBlur = 250;
                ctx.fillStyle = "white";
                ctx.transform(1, 0, -4.25, 1, -3, 0)
                ctx.fillRect(2550, -150, 2350, 3080);
                ctx.restore();
                ctx.save();
                ctx.translate(1950, 660);
                ctx.rotate(-0.075 * Math.PI);
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = "black";
                ctx.textAlign = 'center';
                ctx.font = 'italic 650px A-Space_Black';
                ctx.lineWidth = 4
                ctx.strokeText(handleReply.tenchinh.toUpperCase(), 0, 0);
                ctx.restore();
                ctx.save();
                ctx.translate(1850, 600);
                ctx.rotate(-0.075 * Math.PI);
                ctx.fillStyle = color_;
                ctx.textAlign = 'center';
                ctx.font = '450px A-Space_Black';
                ctx.fillText(handleReply.tenchinh.toUpperCase(), 0, 0);
                ctx.restore();
                ctx.drawImage(l1, 1250, -230, 1450, 1450)
                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                return api.sendMessage({
                        body: "Ảnh Của Bạn Đây"
                        , attachment: fs.createReadStream(pathImg)
                    }
                    , event.threadID
                    , () => fs.unlinkSync(pathImg)
                    , event.messageID
                );
            }
        }
    } catch (e) {
        console.log(e)
    }
}