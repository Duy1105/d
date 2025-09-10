module.exports.config = {
  name: "luotdung",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Nam",//Mod by H.Thanh
  description: "Tùy chỉnh lượt dùng Bot",
  usages: "set/add/del/ || người dùng pay/mua/check/check all",
  commandCategory: "người dùng",
  cooldowns: 5
};

const fs = require("fs");
const path = __dirname + '/../../includes/handle/usages.json';
module.exports.onLoad = () => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
}

module.exports.run = async ({ event, api, args, Users, permssion }) => {
  const { threadID, messageID, senderID } = event;
  var usages = JSON.parse(require("fs").readFileSync(__dirname + `/../../includes/handle/usages.json`));
if(event.type == "message_reply") { id = event.messageReply.senderID }
  else id = senderID;
  const moment = require("moment-timezone"); 
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  let name = await Users.getNameUser(id)
  const data = await api.getThreadInfo(threadID);
  var num = parseInt(args[1]);
  let ld = JSON.parse(fs.readFileSync(path));
  const nmdl = this.config.name
  const cre = this.config.credits
  const prefix = config.PREFIX
   if (args.length == 0) {
    return api.sendMessage(`== LƯỢT DÙNG CONFIG ==\n\n${prefix}${nmdl} set + < số > => Thay đổi số lượt dùng Bot cho bản thân hoặc người được phản hồi tin nhắn\n ${prefix}${nmdl} add + < số > => Thêm lượt dùng Bot cho bản thân hoặc người được phản hồi tin nhắn\n ${prefix}${nmdl} del + < số > => Xóa lượt dùng Bot của bản thân hoặc người được phản hồi tin nhắn\n ${prefix}${nmdl} pay + < số > => Chuyển lượt dùng Bot của mình cho người được phản hồi tin nhắn\n ${prefix}${nmdl} check => Kiểm tra lượt dùng Bot của bản thân hoặc người được phản hồi tin nhắn\n ${prefix}${nmdl} check all => Kiểm tra lượt dùng Bot của tất cả thành viên trong nhóm\n ${prefix}${nmdl} mua => Mua lượt dùng Bot theo giá được niêm yết`, threadID, messageID);
  }if("Nam"!=cre)return;
   if (args[0] == "set") {
    if (permssion < 2) {
      return api.sendMessage("Cần quyền ADMIN trở lên để thực hiện lệnh", threadID, messageID);
                       }
    if (isNaN(args[1])) {
      return api.sendMessage("Số bạn chọn phải là con số hợp lệ", threadID, messageID);
    }
return api.sendMessage(`Đã thay đổi số lượt dùng Bot của ${name} thành ${num}`, threadID, async (error, info) => {
         ld[id] = { usages: num }
fs.writeFileSync(path, JSON.stringify(ld));
    }, messageID);
  }
  if (args[0] == "add") {
    if (permssion < 2) {
      return api.sendMessage("Cần quyền ADMIN trở lên để thực hiện lệnh", threadID, messageID);
    }
    if (isNaN(args[1])) {
      return api.sendMessage("Số bạn chọn phải là con số hợp lệ", threadID, messageID);
    }
    else if (num < 0) {
      return api.sendMessage("Số lượt cần cộng phải lớn hơn 0", threadID, messageID);
    }
return api.sendMessage(`Đã cộng thêm ${num} lượt dùng Bot cho ${name}`, threadID, async (error, info) => {
         ld[id] = { usages: parseInt(usages[id].usages) + parseInt(num) }
fs.writeFileSync(path, JSON.stringify(ld));
                }, messageID);
  }
  if (args[0] == "del") {
    if (permssion < 2) {
      return api.sendMessage("Cần quyền ADMIN trở lên để thực hiện lệnh", threadID, messageID);
    }
    if (isNaN(args[1])) {
      return api.sendMessage("Số bạn chọn phải là con số hợp lệ", threadID, messageID);
    }
    else if (num < 0) {
      return api.sendMessage("Số lượt cần trừ phải lớn hơn 0", threadID, messageID);
    }
return api.sendMessage(`→ Đã trừ ${num} lượt dùng Bot của ${name}`, threadID, async (error, info) => {
         ld[id] = { usages: parseInt(usages[id].usages) - parseInt(num) }
fs.writeFileSync(path, JSON.stringify(ld));
                }, messageID);
  }
  if (args[0] == "pay") {
    if (event.type == "message_reply") { id = event.messageReply.senderID }
    if (num > usages[senderID].usages || isNaN(args[1])) {
     return api.sendMessage(`Số lượt cần chuyển phải là con số và không được lớn hơn ${usages[senderID].usages}`, threadID, messageID);
    }
    else if (senderID == id) {
      return api.sendMessage(`Bạn phải phản hồi tin nhắn của người cần chuyển`, threadID, messageID);
    }
    let name = await Users.getNameUser(id)
    ld[id] = { usages: parseInt(usages[id].usages) + parseInt(num) }
fs.writeFileSync(path, JSON.stringify(ld));
 api.sendMessage(`Đã chuyển cho ${name} ${num} lượt dùng Bot`, threadID, async () => {
  ld[senderID] = { usages: parseInt(usages[senderID].usages) - parseInt(num) }
fs.writeFileSync(path, JSON.stringify(ld));
    }, messageID);
	}
  if (args[0] == "check" || args[0] == "c") {
     if (args[1] == "all" || args[1] == "a") {
      let storage = [], sl = [];
      for (const value of data.userInfo) storage.push({ "id": value.id, "name": value.name });
      let getDay = require("moment-timezone").tz("Asia/Ho_Chi_Minh").day();
      for (const user of storage) {
        if (!(user.id in usages)) usages[user.id] = {
          usages: 30,
          diemdanh: 0
        }
        sl.push({ "name": user.name, "sl": (typeof usages[user.id].usages == "undefined") ? 0 : usages[user.id].usages, "uid": user.id });
      }
      sl.sort((a, b) => {
        if (a.sl > b.sl) return -1;
        if (a.sl < b.sl) return 1;
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        a.name.localeCompare(b.name, undefined, { numeric: true });
      });
      msg = "\n===LƯỢT DÙNG CHECK===\n";
      let countsl = 0
      for (let e of sl) {
        msg += `\n${countsl += 1}. ${e.name} - ${e.sl} lượt`
      }
      msg += `\n\n===「 ${timeNow} 」===`;
      require("fs").writeFileSync(__dirname + `/../../includes/handle/usages.json`, JSON.stringify(usages, null, 4));
      return api.sendMessage(msg, threadID);
    }
    api.sendMessage(`Con zợ ${name} còn ${usages[id].usages} lượt dùng Bot`, threadID, messageID);
    }
  if (args[0] == "mua") {
  	return api.sendMessage(`Bạn hãy nhập số lượt cần mua bằng cách phản hồi tin nhắn này\n=> Bảng giá được niêm yết là 100.000$ = 100 lượt ( có thể mua lẻ số lượng )`,threadID, (error, info) => {
        global.client.handleReply.push({
            name: nmdl,
            messageID: info.messageID,
            author: senderID,
            type: "a",
        })
    }, messageID);
  }
}


module.exports.handleReply = async function ({ event, api, Currencies, handleReply }) {
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type } = handleReply;
    var usages = JSON.parse(require("fs").readFileSync(__dirname + `/../../includes/handle/usages.json`));
    const userMoney = (await Currencies.getData(senderID)).money;
    const input = parseInt(body);
    const money = parseInt(body) * 1000;
    let ld = JSON.parse(fs.readFileSync(path));
  switch (type) {
        case "a": {
            switch (body) {
                case body: { // tính làm thêm case mua bằng xp nữa :D
                  if (input > userMoney || isNaN(body) || userMoney < money) {
     return api.sendMessage(
       `Bạn không đủ số dư để thực hiện giao dịch hoặc số lượt không phải là con số`, threadID, messageID);
      }
                  else if (input <= 0) {
     return api.sendMessage(
       `Số lượt cần mua phải lớn hơn 0`, threadID, messageID);
      }
                 else { await Currencies.decreaseMoney(senderID, parseInt(money));
ld[senderID] = { usages: parseInt(usages[senderID].usages) + parseInt(input) }
fs.writeFileSync(path, JSON.stringify(ld));
                    return api.sendMessage(
                        `Mua thành công ${(input.toLocaleString(`en-US`))} lượt dùng\n=> Bạn bị - ${(money.toLocaleString(`en-US`))}$`
                  , threadID, messageID);
                }
              }
            }
        }
     }
   }