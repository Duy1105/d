const moment = require("moment-timezone");

module.exports = function () {
  const intervalHours = 3;

  const checkRestart = () => {
    const now = moment.tz("Asia/Ho_Chi_Minh");
    const h = now.hours(), m = now.minutes(), s = now.seconds();

    if (h === 23 || h < 1) return;

    if (h % intervalHours === 0 && m === 0 && s === 0) {
      console.log("Đã tới thời gian khởi động lại. Thoát chương trình...");
      process.exit(1);
    }
  };

  setInterval(checkRestart, 1000);
};
