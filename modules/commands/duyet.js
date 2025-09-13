module.exports.config = {
  name: "duyet",
  version: "1.0.2",
  hasPermssion: 2,
  credits: "DungUwU mod by Nam",
  description: "duyệt box dùng bot xD",
  commandCategory: "admin",
  cooldowns: 5
};

const fs = require("fs");
const dataPath = __dirname + "/cache/approvedThreads.json";
const dataPending = __dirname + "/cache/pendingdThreads.json";

module.exports.onLoad = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
};

module.exports.handleReply = async function ({ event, api, handleReply, args }) {
  if (handleReply.author != event.senderID) return;
  const { body, threadID, messageID } = event;
  const { type } = handleReply;
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let idBox = (args && args[0]) ? args[0] : threadID;

  if (type === "pending") {
    if (body === "A") {
      if (!data.includes(idBox)) data.push(idBox);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      api.sendMessage(`» Phê duyệt thành công box:\n${idBox}`, threadID, () => {
        const idx = dataP.indexOf(idBox);
        if (idx > -1) dataP.splice(idx, 1);
        fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
      }, messageID);
    }
  }
};

module.exports.run = async ({ event, api, args, Threads, Users }) => {
  const { threadID, messageID } = event;
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let msg = "";
  let idBox = (args[0]) ? args[0] : threadID;

  // Danh sách đã duyệt
  if (args[0] == "list" || args[0] == "l") {
    msg = "[ 𝗠𝗢𝗗𝗘 ] - 𝗗𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗰𝗮́𝗰 𝗻𝗵𝗼́𝗺 đ𝗮̃ 𝗱𝘂𝘆𝗲̣̂𝘁\n━━━━━━━━━━━━━━━━━━";
    let count = 0;
    for (const e of data) {
      try {
        const info = await api.getThreadInfo(e);
        const name = info.threadName || "Tên không tồn tại";
        msg += `\n\n(${++count}). ${name}\n🔰 𝗜𝗗: ${e}`;
      } catch {
        msg += `\n\n(${++count}). (Không đọc được tên)\n🔰 𝗜𝗗: ${e}`;
      }
    }
    return api.sendMessage(msg, threadID, messageID);
  }

  // Danh sách chờ duyệt
  if (args[0] == "pending" || args[0] == "p") {
    msg = `=====「 DS BOX CHƯA DUYỆT: ${dataP.length} 」 ====`;
    let count = 0;
    for (const e of dataP) {
      try {
        const info = await api.getThreadInfo(e);
        const threadName = info.threadName ? info.threadName : await Users.getNameUser(e);
        msg += `\n〘${++count}〙» ${threadName}\n${e}`;
      } catch {
        msg += `\n〘${++count}〙» (Không đọc được tên)\n${e}`;
      }
    }
    // mở chế độ duyệt nhanh bằng reply
    return api.sendMessage(msg, threadID, (error, info) => {
      if (error) return;
      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        type: "pending"
      });
    }, messageID);
  }

  // Help
  if (args[0] == "help" || args[0] == "h") {
    const tst = (await Threads.getData(String(event.threadID))).data || {};
    const pb = (tst.hasOwnProperty("PREFIX")) ? tst.PREFIX : global.config.PREFIX;
    const nmdl = module.exports.config.name;
    return api.sendMessage(
`=====「 𝗗𝗨𝗬𝗘̣̂𝗧 𝗕𝗢𝗫 」=====
━━━━━━━━━━━━━━━━━━

${pb}${nmdl} 𝗹/𝗹𝗶𝘀𝘁 => xem danh sách box được duyệt 🎀

${pb}${nmdl} 𝗽/𝗽𝗲𝗻𝗱𝗶𝗻𝗴 => xem danh sách box chưa duyệt 🎀

${pb}${nmdl} 𝗱/𝗱𝗲𝗹 <ID> => gỡ box khỏi danh sách được dùng bot 🎀

${pb}${nmdl} <ID> => duyệt box theo ID 🎀
`, threadID, messageID);
  }

  // Xóa duyệt
  if (args[0] == "del" || args[0] == "d") {
    idBox = (args[1]) ? args[1] : event.threadID;
    if (isNaN(parseInt(idBox)))
      return api.sendMessage("[ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗗𝗲𝗹 ] ➠  Không phải một con số", threadID, messageID);
    if (!data.includes(idBox))
      return api.sendMessage("[ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗗𝗲𝗹 ] ➠  Nhóm không được duyệt từ trước", threadID, messageID);

    // thông báo + cập nhật
    try {
      const info = await api.getThreadInfo(idBox);
      const threadName = info.threadName || "(Không đọc được tên)";
      api.sendMessage(
        `====『 𝗗𝗨𝗬𝗘̣̂𝗧 𝗗𝗘𝗟 』 ====
━━━━━━━━━━━━━━━━
[ 👨‍👩‍👧‍👦 ] 𝗡𝗵𝗼́𝗺: ${threadName}
[ 🔰 ] 𝗜𝗗: ${idBox}
🌟 Đ𝗮̃ 𝗴𝗼̛̃ 𝗸𝗵𝗼̉𝗶 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 đ𝘂̛𝗼̛̣𝗰 𝗽𝗵𝗲́𝗽 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗕𝗼𝘁`,
        threadID,
        () => {
          data.splice(data.indexOf(idBox), 1);
          fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        },
        messageID
      );
    } catch {
      // vẫn gỡ dù không đọc được tên
      data.splice(data.indexOf(idBox), 1);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      api.sendMessage(`🗑 Đã gỡ box ${idBox} khỏi danh sách duyệt`, threadID, messageID);
    }
    return;
  }

  // Kiểm tra/hành động duyệt
  if (isNaN(parseInt(idBox)))
    return api.sendMessage("[ 𝗞𝗜𝗘̂̉𝗠 𝗗𝗨𝗬𝗘̣̂𝗧 ]\n[🔰] 𝗜𝗗 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗻𝗵𝗮̣̂𝗽 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂", threadID, messageID);

  if (data.includes(idBox))
    return api.sendMessage(`[ 𝗞𝗜𝗘̂̉𝗠 𝗗𝗨𝗬𝗘̣̂𝗧 ]\n[🔰] 𝗜𝗗: ${idBox} đ𝗮̃ đ𝘂̛𝗼̛̣𝗰 𝗱𝘂𝘆𝗲̣̂𝘁 𝘁𝘂̛̀ 𝘁𝗿𝘂̛𝗼̛́𝗰`, threadID, messageID);

  // Duyệt box (GIỮ NGUYÊN CHỨC NĂNG, BỎ ẢNH RANDOM)
  api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] ➠ 𝗡𝗵𝗼́𝗺 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̃ đ𝘂̛𝗼̛̣𝗰 𝗔𝗗𝗠𝗜𝗡 𝗱𝘂𝘆𝗲̣̂𝘁 đ𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 💞", idBox, async (error) => {
    if (error) {
      api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] ➠ 𝗖𝗼́ 𝗹𝗼̂̃𝗶 𝘅𝗮̉𝘆 𝗿𝗮, 𝗸𝗶𝗲̂̉𝗺 𝘁𝗿𝗮 𝗜𝗗 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂ 𝘃𝗮̀ 𝗯𝗼𝘁 𝗱𝗮𝘆 𝘁𝗿𝗼𝗻𝗴 𝗻𝗵𝗼́𝗺", threadID, messageID);
      return;
    }

    // đổi nickname bot trong box mới duyệt
    try {
      await api.changeNickname(`『  ${global.config.PREFIX} 』 ➺ ${global.config.BOTNAME}`, idBox, api.getCurrentUserID());
    } catch {}

    // gửi thông điệp chào mừng (KHÔNG kèm ảnh)
    api.sendMessage(
`== 『 𝗞𝗲̂́𝘁 𝗡𝗼̂́𝗶 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴 』==
━━━━━━━━━━━━━━━━━━
→ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶: [ ${global.config.PREFIX} ]
→ 𝗡𝗵𝗮̣̂𝗽: ${global.config.PREFIX} 𝗮𝗱𝗺𝗶𝗻 𝗹𝗶𝘀𝘁 để xem thông tin admin bot
→ 𝗟𝗶𝗲̂𝗻 𝗵𝗲̣̂ 𝗮𝗱𝗺𝗶𝗻: https://www.facebook.com/duydo05`,
      idBox
    );

    // cập nhật danh sách
    if (!data.includes(idBox)) data.push(idBox);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    const idx = dataP.indexOf(idBox);
    if (idx > -1) {
      dataP.splice(idx, 1);
      fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    }

    // thông báo lại trong box gọi lệnh
    api.sendMessage(
      `=== [ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗕𝗼𝘅 ] ===
🔰 𝗣𝗵𝗲̂ 𝗱𝘂𝘆𝗲̣̂𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗻𝗵𝗼́𝗺 𝗰𝗼́ 𝗜𝗗: ${idBox}`,
      threadID, messageID
    );
  });
};
