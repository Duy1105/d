const moment = require("moment-timezone");

module.exports.config = {
  name: "log",
  eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
  version: "1.0.0",
  credits: "Tpk",
  description: "Ghi lại thông báo các hoạt động của bot!",
  envConfig: { enable: true },
};

module.exports.run = async function ({ api, event, Users, Threads }) {
  const logger = require("../../utils/log");
  const botID = api.getCurrentUserID();
  const threadInfo = await api.getThreadInfo(event.threadID);
  const {
    threadName = "Tên không tồn tại",
    participantIDs,
    approvalMode,
    adminIDs,
    emoji,
  } = threadInfo;

  const pd = approvalMode ? "Bật" : "Tắt";
  const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);
  const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");

  let task = "";
  switch (event.logMessageType) {
    case "log:thread-name":
      const newName = event.logMessageData.name || "Tên không tồn tại";
      task = `Người dùng đổi tên nhóm thành: ${newName}`;
      await Threads.setData(event.threadID, { name: newName });
      break;

    case "log:subscribe":
      if (event.logMessageData.addedParticipants.some(i => i.userFbId == botID)) {
        task = "Bot vừa được thêm vào một nhóm mới!";
      }
      break;

    case "log:unsubscribe":
      if (event.logMessageData.leftParticipantFbId == botID && event.senderID != botID) {
        const data = (await Threads.getData(event.threadID)).data || {};
        data.banned = true;
        data.reason = "Kick bot không xin phép";
        data.dateAdded = time;
        await Threads.setData(event.threadID, { data });
        global.data.threadBanned.set(event.threadID, { reason: data.reason, dateAdded: data.dateAdded });
        task = "Bot đã bị kick khỏi nhóm!";
      }
      break;
  }

  if (!task) return;

  const report = 
`|› Tên nhóm: ${threadName}
|› TID: ${event.threadID}
|› Thành viên: ${participantIDs.length}
|› Phê duyệt: ${pd}
|› Quản trị viên: ${adminIDs.length}
|› Emoji: ${emoji || "Không sử dụng"}
──────────────────
|› Hành động: ${task}
|› Người thực hiện: ${nameUser}
|› UID: ${event.author}
|› Link: https://www.facebook.com/profile.php?id=${event.author}
──────────────────
⏰ =『${time}』= ⏰`;

  return api.sendMessage(report, global.config.ADMINBOT[0], err => {
    if (err) logger(report, "[ Logging Event ]");
  });
};
