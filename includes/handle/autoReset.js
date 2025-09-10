const moment = require("moment-timezone");
module.exports = function () {
  const intervalHours = 2;

  const checkRestart = () => {
    const currentTime = moment.tz("Asia/Ho_Chi_Minh");
    const hours = currentTime.hours();

    if (hours % intervalHours === 0 && currentTime.minutes() === 0 && currentTime.seconds() === 0) {
      console.log("Đã tới thời gian khởi động lại. Thoát chương trình...");
      process.exit(1);
    }
  };

  setInterval(checkRestart, 1000);
};
