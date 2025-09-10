module.exports.config = {
	name: "delete",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Drasew",
	description: "delete các dữ liệu",
	commandCategory: "admin",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args ,Currencies }) => {
  const permission = ["100037140780211"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Bạn đéo đủ quyền hạn để xóa dữ liệu", event.threadID, event.messageID);
  if (args[0] == "expbox") {
     const data = await api.getThreadInfo(event.threadID);
    for (const user of data.userInfo) {
        var currenciesData = await Currencies.getData(user.id)
        if (currenciesData != false) {
            var exp = currenciesData.exp;
            if (typeof exp != "undefined") {
                exp -= exp;
                await Currencies.setData(user.id, { exp });
            }
        }
    }
    api.sendMessage(`Đang xử lý vui lòng đợi trong giây lát....!! `, event.threadID, (err, info) =>
        setTimeout(() => {
          api.unsendMessage(info.messageID)
        }, 20000), event.messageID);
  return api.sendMessage("Số exp của thành viên nhóm đã được reset về mức 0 !", event.threadID);
  }
  if (args[0] == "expall") {
     const allUserID = global.data.allUserID;
        for (const singleUser of allUserID) {
          var currenciesData = await Currencies.getData(singleUser)
          if (currenciesData != false) {
            var exp = currenciesData.exp;
            if (typeof exp != "undefined") {
              exp -= exp;
              await Currencies.setData(singleUser, { exp });
            }
          }
        }
    api.sendMessage(`Đang xử lý vui lòng đợi trong giây lát....!! `, event.threadID, (err, info) =>
        setTimeout(() => {
          api.unsendMessage(info.messageID)
        }, 20000), event.messageID);
  return api.sendMessage("Số exp của toàn bộ người dùng trên server đã được reset về mức 0 !", event.threadID);
  }
	if (args[0] == "moneybox") {
    const data = await 
		api.getThreadInfo(event.threadID);
    for (const user of data.userInfo) {
        var currenciesData = await Currencies.getData(user.id)
        if (currenciesData != false) {
            var money = currenciesData.money;
            if (typeof money != "undefined") {
                money -= money;
                await Currencies.setData(user.id, { money });
            }
        }
    }
    api.sendMessage(`Đang xử lý vui lòng đợi trong giây lát....!! `, event.threadID, (err, info) =>
        setTimeout(() => {
          api.unsendMessage(info.messageID)
        }, 20000), event.messageID);
  return api.sendMessage("Số money của thành viên nhóm đã được reset về mức 0 !", event.threadID);
  }
  if (args[0] == "moneyall") {
     const allUserID = global.data.allUserID;
        for (const singleUser of allUserID) {
          var currenciesData = await Currencies.getData(singleUser)
          if (currenciesData != false) {
            var money = currenciesData.money;
            if (typeof money != "undefined") {
              money -= money;
              await Currencies.setData(singleUser, { money });
            }
          }
        }
    api.sendMessage(`Đang xử lý vui lòng đợi trong giây lát....!! `, event.threadID, (err, info) =>
        setTimeout(() => {
          api.unsendMessage(info.messageID)
        }, 20000), event.messageID);
  return api.sendMessage("Số money của toàn bộ người dùng trên server đã được reset về mức 0 !", event.threadID);
  }
	else 
		return api.sendMessage(`Bạn có thể dùng:\n\n${global.config.PREFIX}${this.config.name} expbox [ nó sẽ reset exp tất cả người dùng ở nhóm hiện tại về 0 ]\n\n${global.config.PREFIX}${this.config.name} moneybox [ nó sẽ reset money tất cả người dùng ở nhóm hiện tại về 0 ]\n\n${global.config.PREFIX}${this.config.name} expall [ xóa toàn bộ exp tất cả người dùng trên sever ]\n\n${global.config.PREFIX}${this.config.name} moneyall [ xóa toàn bộ money tất cả người dùng trên sever ]`, event.threadID, event.messageID)

}