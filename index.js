const { spawn } = require("child_process");
const fs = require("fs-extra");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

(async () => {
    try {
        const data = await fs.readFile('package.json', 'utf8');
        const packageJson = JSON.parse(data);
        const dependencies = packageJson.dependencies || {};
        const totalDependencies = Object.keys(dependencies).length;
        logger(`Hiện tại tổng có ${totalDependencies} Package`, '[ PACKAGE ]');
    } catch (err) {
        logger("Không thể đọc hoặc phân tích package.json", '[ PACKAGE ERROR ]');
    }
})();

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'utils/index.html'));
});

app.listen(port, () => {
    logger(`Server đang chạy tại cổng ${port}`, '[ SERVER ]');
});

try {
    const files = fs.readdirSync('./modules/commands');
    files.forEach(file => {
        if (file.endsWith('.js')) {
            require(`./modules/commands/${file}`);
        }
    });
    logger('Tiến Hành Check Lỗi', '[ Tự động kiểm tra ]');
} catch (error) {
    logger('Đã Có Lỗi Tại Lệnh:', '[ Tự động kiểm tra ]');
    console.error(error);
}

// Khởi động bot
function startBot(message) {
    if (message) logger(message, "[ MIRAI BOT ]");

    const child = spawn(
        "node",
        ["--trace-warnings", "--async-stack-traces", "mirai.js"],
        {
            cwd: __dirname,
            stdio: "inherit",
            shell: true,
        }
    );

    child.on("close", async (codeExit) => {
        if (codeExit === 1) {
            startBot("Bot Mirai đang khởi động lại");
        } else if (codeExit.toString().startsWith("2")) {
            const delay = parseInt(codeExit.toString().substring(1), 10) * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
            startBot("Bot Mirai đang hoạt động");
        }
    });

    child.on("error", (error) => {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ LỖI ]");
    });
}

async function getIpInfo() {
    try {
        const response = await fetch("https://ipinfo.io/json");
        const data = await response.json();
        logger(data.ip, "[ Địa chỉ IP ]");
        logger(data.country, "[ Quốc gia   ]");
        logger(data.city, "[ Thành phố  ]");
        logger(data.org, "[ Nhà Mạng   ]");
    } catch (error) {
        logger("Lỗi: " + error.message, "[ LỖI ]");
    }
}
getIpInfo();

setTimeout(() => {
    logger("Bot Mirai đang tải dữ liệu", "[ Kiểm tra   ]");
    startBot();
}, 70);
