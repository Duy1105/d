module.exports.config = {
  name: "console",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "Nguyễn Sơn", // Nhật Phú mod 🐧
  description: "Hiển thị log console khi có tin nhắn",
  commandCategory: "admin",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, Users, event }) {
  const chalk = require("chalk");
  const moment = require("moment-timezone");

  // Bỏ qua nếu bot hoặc thread tắt console
  const thread = global.data.threadData.get(event.threadID) || {};
  if (thread.console === true || event.senderID == global.data.botID) return;

  // Thời gian
  const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const textDay = days[new Date().getDay()];
  const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");

  // Thông tin
  const threadInfo = global.data.threadInfo.get(event.threadID);
  const nameBox = threadInfo?.threadName || "Tên không tồn tại";
  const boxId = event.threadID || "Không thể lấy ID";
  const nameUser = await Users.getNameUser(event.senderID);
  const uid = event.senderID;
  const msg = event.body || "Ảnh, video hoặc kí tự đặc biệt";

  // Random màu
  const colors = ["FF9900","FFFF33","33FFFF","FF99FF","FF3366","FFFF66","FF00FF","66FF99","00CCFF",
                  "FF0099","FF0066","008E97","F58220","38B6FF","7ED957","CCFFCC","CCFF99","CCFF66",
                  "CCFF33","CCFF00"];
  const rand = () => colors[Math.floor(Math.random() * colors.length)];

  // Log ra console
  console.log(
    chalk.hex("#" + rand())(`『💬』➝ Box Name: ${nameBox}`) +
    chalk.hex("#" + rand())(`\n『🔎』➝ Thread ID: ${boxId}`) +
    chalk.hex("#" + rand())(`\n『👥』➝ User Name: ${nameUser}`) +
    chalk.hex("#" + rand())(`\n『🎀』➝ User ID: ${uid}`) +
    chalk.hex("#" + rand())(`\n『📥』➝ Text: ${msg}`) +
    chalk.hex("#" + rand())(`\n『⏰』➝ Time: ${textDay} ${time}`) +
    chalk.hex("#" + rand())(`\n▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱`)
  );
};

module.exports.run = async function () {};
