const { spawn } = require("child_process");
const fs = require("fs-extra");
const logger = require("./utils/log");
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
(async () => {
  try {
    const { dependencies = {} } = JSON.parse(await fs.readFile("package.json", "utf8"));
    logger(`Hiện tại tổng có ${Object.keys(dependencies).length} Package`, "[ PACKAGE ]");
  } catch {
    logger("Không thể đọc hoặc phân tích package.json", "[ PACKAGE ERROR ]");
  }
})();
app.get("/", (_, res) => res.sendFile(path.resolve(__dirname, "utils/index.html")));
app.listen(port, () => logger(`Server đang chạy tại cổng ${port}`, "[ SERVER ]"));
try {
  fs.readdirSync("./modules/commands")
    .filter(f => f.endsWith(".js"))
    .forEach(f => require(`./modules/commands/${f}`));
  logger("Tiến Hành Check Lỗi", "[ Tự động kiểm tra ]");
} catch (e) {
  logger("Đã Có Lỗi Tại Lệnh:", "[ Tự động kiểm tra ]");
  console.error(e);
}
function startBot(msg) {
  if (msg) logger(msg, "[ MIRAI BOT ]");
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
    cwd: __dirname, stdio: "inherit", shell: true
  });
  child.on("close", async code => {
    if (code === 1) return startBot("Bot Mirai đang khởi động lại");
    if (code.toString().startsWith("2")) {
      const delay = parseInt(code.toString().substring(1), 10) * 1000;
      await new Promise(r => setTimeout(r, delay));
      startBot("Bot Mirai đang hoạt động");
    }
  });
  child.on("error", err => logger("Đã xảy ra lỗi: " + JSON.stringify(err), "[ LỖI ]"));
}
async function getIpInfo() {
  try {
    const { ip, country, city, org } = await (await fetch("https://ipinfo.io/json")).json();
    logger(ip, "[ Địa chỉ IP ]");
    logger(country, "[ Quốc gia   ]");
    logger(city, "[ Thành phố  ]");
    logger(org, "[ Nhà Mạng   ]");
  } catch (e) {
    logger("Lỗi: " + e.message, "[ LỖI ]");
  }
}
getIpInfo();
setTimeout(() => {
  logger("Bot Mirai đang tải dữ liệu", "[ Kiểm tra   ]");
  startBot();
}, 70);
