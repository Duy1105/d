module.exports.config = {
  name: "2048",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Khoa x Nam",
  description: "2048",
  commandCategory: "game",
  usages: "",
  cooldowns: 0
};

const fs = require("fs-extra");
const path = require("path");
const { loadImage, createCanvas } = require("canvas");

const DIR = path.join(__dirname, "game2048");
const TILE_VALUES = "2,4,8,16,32,64,128,256,512,1024,2048".split(",");
const tileImgs = {};

// Helpers
const flatten = map => [].concat(...map);
const findMax = map => flatten(map).reduce((m, v) => (v > m ? v : m), 0);

function isGameOver(map) {
  const arr = flatten(map);
  if (arr.includes(0)) return false;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (r < 3 && map[r][c] === map[r + 1][c]) return false;
      if (c < 3 && map[r][c] === map[r][c + 1]) return false;
    }
  }
  return true;
}

async function draw(map, uid) {
  const canvas = createCanvas(2500, 1500);
  const ctx = canvas.getContext("2d");

  const name = global.data.userName.get(uid) || "Người chơi";
  const score = flatten(map).reduce((a, b) => a + b, 0);
  const max = findMax(map);

  const bg = await loadImage("https://raw.githubusercontent.com/KhoaDo472005/2048/main/board.png");
  ctx.drawImage(bg, 0, 0, 2500, 1500);

  ctx.font = "82px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fillText(name, 320, 130, 600);

  ctx.font = "75px Arial";
  ctx.textAlign = "left";
  ctx.fillText(String(score), 2250, 110, 300);
  ctx.fillText(String(max), 2250, 210, 300);

  ctx.textAlign = "center";
  ctx.font = "70px Arial";
  ctx.fillStyle = "#c2ff61";
  ctx.fillText(String(uid), 320, 220, 600);

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const val = map[r][c];
      if (!val) continue;
      const img = tileImgs[val];
      if (img) ctx.drawImage(img, 680 + 300 * c, 205 + 300 * r, 240, 240);
    }
  }

  const out = path.join(DIR, `${uid}.png`);
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  return out;
}

function delData(uid) {
  const json = path.join(DIR, `${uid}.json`);
  const png = path.join(DIR, `${uid}.png`);
  if (fs.existsSync(json)) fs.unlinkSync(json);
  if (fs.existsSync(png)) fs.unlinkSync(png);
}

function createMap() {
  const map = Array.from({ length: 4 }, () => [0, 0, 0, 0]);
  const drops = Math.random() < 0.8 ? 2 : 3;
  for (let i = 0; i < drops; i++) {
    const r = Math.floor(Math.random() * 4);
    const c = Math.floor(Math.random() * 4);
    if (map[r][c] === 0) map[r][c] = Math.random() < 0.8 ? 2 : 4;
    else i--;
  }
  return map;
}

function move(currentMap, direction) {
  const map = currentMap.map(row => row.slice());

  function moveLine(line) {
    let arr = line.filter(v => v !== 0);
    let zeros = line.length - arr.length;

    const rev = direction === "d" || direction === "r";
    if (rev) arr.reverse();

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        arr[i + 1] = 0;
        zeros++;
      }
    }

    if (rev) arr.reverse();
    arr = arr.filter(v => v !== 0);

    return (direction === "u" || direction === "l")
      ? arr.concat(Array(zeros).fill(0))
      : Array(zeros).fill(0).concat(arr);
  }

  const res = Array.from({ length: 4 }, () => Array(4).fill(0));

  if (direction === "u" || direction === "d") {
    for (let c = 0; c < 4; c++) {
      const col = [map[0][c], map[1][c], map[2][c], map[3][c]];
      const moved = moveLine(col);
      for (let r = 0; r < 4; r++) res[r][c] = moved[r];
    }
  } else {
    for (let r = 0; r < 4; r++) res[r] = moveLine(map[r]);
  }

  return res;
}

module.exports.onLoad = async () => {
  await fs.ensureDir(DIR);
  const imgs = await Promise.all(
    TILE_VALUES.map(v => loadImage(`https://raw.githubusercontent.com/KhoaDo472005/2048/main/no${v}.png`))
  );
  imgs.forEach((img, i) => (tileImgs[TILE_VALUES[i]] = img));
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, senderID } = event;

  const choices = ["1", "2"];
  let prompt = "Reply lựa chọn!\n1. Chơi mới\n2. Hướng dẫn";
  if (fs.existsSync(path.join(DIR, `${senderID}.json`))) {
    choices.push("3");
    prompt += "\n3. Chơi tiếp";
  }

  return api.sendMessage(
    prompt,
    threadID,
    (err, info) => {
      if (err) return;
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        invalidC: choices,
        type: "procedure"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ event, api, handleReply }) {
  const { threadID: tid, messageID: mid, senderID: sid, body } = event;
  const send = (...a) => api.sendMessage(...a);
  const unsend = id => api.unsendMessage(id);

  if (sid !== handleReply.author) return;

  try {
    if (handleReply.type === "procedure") {
      if (!handleReply.invalidC.includes(body)) return send("❌ Lựa chọn không hợp lệ!", tid, mid);

      // 1. Chơi mới
      if (body === "1") {
        unsend(handleReply.messageID);
        const map = createMap();
        fs.writeFileSync(path.join(DIR, `${sid}.json`), JSON.stringify(map, null, 2));
        return send(
          { body: "Rep U/D/L/R để di chuyển!", attachment: fs.createReadStream(await draw(map, sid)) },
          tid,
          (e, info) => {
            if (e) return;
            global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: sid, type: "play" });
          },
          mid
        );
      }

      // 2. Hướng dẫn
      if (body === "2") {
        return send(
          "Dùng U, D, L, R để di chuyển các ô.\n" +
            "Mục tiêu: hợp nhất để đạt ô 2048.\n" +
            "Khi bảng đầy và không còn ghép được, bạn thua!",
          tid,
          mid
        );
      }

      // 3. Chơi tiếp
      if (body === "3") {
        try {
          unsend(handleReply.messageID);
          const map = JSON.parse(fs.readFileSync(path.join(DIR, `${sid}.json`)));
          return send(
            { body: "Rep U/D/L/R để di chuyển!", attachment: fs.createReadStream(await draw(map, sid)) },
            tid,
            (e, info) => {
              if (e) return;
              global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: sid, type: "play" });
            },
            mid
          );
        } catch (err) {
          return send(`❌ Lỗi! Hãy thử lại hoặc chơi mới.\nChi tiết: ${err}`, tid, mid);
        }
      }
    }

    if (handleReply.type === "play") {
      const act = String(body || "").toLowerCase();
      if (!["u", "d", "l", "r"].includes(act))
        return send("Lựa chọn không hợp lệ!\nu: lên\nd: xuống\nl: trái\nr: phải", tid, mid);

      unsend(handleReply.messageID);

      const savePath = path.join(DIR, `${sid}.json`);
      const map = JSON.parse(fs.readFileSync(savePath));
      const newMap = move(map, act);

      // Win
      if (flatten(newMap).includes(2048)) {
        return send(
          { body: "🏆 Bạn đã thắng!", attachment: fs.createReadStream(await draw(newMap, sid)) },
          tid,
          () => delData(sid),
          mid
        );
      }

      // Nếu có thay đổi thì sinh ô mới
      if (flatten(map).join(" ") !== flatten(newMap).join(" ")) {
        while (true) {
          const r = Math.floor(Math.random() * 4);
          const c = Math.floor(Math.random() * 4);
          if (newMap[r][c] === 0) {
            newMap[r][c] = Math.random() < 0.8 ? 2 : 4;
            break;
          }
        }
      }

      // Game over
      if (isGameOver(newMap)) {
        return send(
          { body: "Trò chơi kết thúc!", attachment: fs.createReadStream(await draw(newMap, sid)) },
          tid,
          () => delData(sid),
          mid
        );
      }

      // Tiếp tục
      fs.writeFileSync(savePath, JSON.stringify(newMap, null, 2));
      return send(
        { body: "Rep U/D/L/R để di chuyển!", attachment: fs.createReadStream(await draw(newMap, sid)) },
        tid,
        (e, info) => {
          if (e) return;
          global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: sid, type: "play" });
        },
        mid
      );
    }
  } catch (err) {
    return send("Đã xảy ra lỗi! " + err, tid, mid);
  }
};
