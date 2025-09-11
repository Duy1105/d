module.exports.config = {
  name: "prefix",
  version: "3.0.1",
  hasPermssion: 0,
  credits: "Pcoder (refactor)",
  description: "Xem hoặc đổi prefix nhóm",
  commandCategory: "người dùng",
  usages: "prefix [mới/reset]",
  cooldowns: 3
};

module.exports.handleEvent = async function ({ api, event, Threads }) {
  const moment = require("moment-timezone");
  const { threadID, messageID, body } = event;
  // Đặt gần đầu file
  const PREFIX_KEYWORDS = [
    'prefix', 'pref', 'pf', 'pre fix',
    'prefix bot', 'bot prefix', 'command prefix', 'cmd prefix',
    'check prefix', 'xem prefix', 'prefix là gì', 'prefix đâu', 'prefix?',
    'dấu lệnh', 'dấu gọi lệnh', 'dấu bot', 'dấu prefix',
    'ký tự lệnh', 'kí tự lệnh',
    'dau lenh', 'dau goi lenh', 'dau bot', 'dau prefix', 'ky tu lenh', 'ki tu lenh'
  ];

  const _esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const PREFIX_RE = new RegExp(`(?:^|\\W)(?:${PREFIX_KEYWORDS.map(_esc).join('|')})(?:$|\\W)`, 'i');
  if (typeof body !== 'string' || !PREFIX_RE.test(body)) return;
  const sysPrefix = global.config.PREFIX;
  const threadSetting = global.data.threadData.get(threadID) || {};
  const prefix = threadSetting.PREFIX || sysPrefix;

  const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  const days = {
    Sunday: "🌞 𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭",
    Monday: "🌙 𝐓𝐡𝐮̛́ 𝐇𝐚𝐢",
    Tuesday: "🔥 𝐓𝐡𝐮̛́ 𝐁𝐚",
    Wednesday: "🌊 𝐓𝐡𝐮̛́ 𝐓𝐮̛",
    Thursday: "🍀 𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦",
    Friday: "🌟 𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮",
    Saturday: "🎉 𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲"
  };
  const thu = days[moment.tz("Asia/Ho_Chi_Minh").format("dddd")] || "Unknown";

  // Lấy thread info từ cache nếu có, không có thì fetch
  const info = global.data.threadInfo.get(threadID) || (await Threads.getInfo(threadID)) || {};
  const threadName = info.threadName || "Unknown";
  const commandsSize = (global.client && global.client.commands && global.client.commands.size) || 0;

  const msg =
`╔══════════════╗
     🚀 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗡𝗙𝗢 🚀
╚══════════════╝
🎭 𝗕𝗼𝘅: ${threadName}
❗ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗕𝗼𝘅: ${prefix}
🔹 𝗣𝗿𝗲𝗳𝗶𝘅 𝗦𝘆𝘀𝘁𝗲𝗺: ${sysPrefix}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${global.config.BOTNAME}
📦 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${commandsSize} lệnh
🆔 𝗧𝗜𝗗: ${threadID}
⏰ 𝗧𝗶𝗺𝗲: ${time} || ${thu}`;

  const msgData = { body: msg };
  if (Array.isArray(global.lekhanh) && global.lekhanh.length > 0) {
    msgData.attachment = global.lekhanh.splice(0, 1);
  }

  return api.sendMessage(msgData, threadID, messageID);
};

module.exports.handleReaction = async function ({ api, event, Threads, handleReaction }) {
  if (event.userID != handleReaction.author) return;
  const { threadID, messageID } = event;

  const data = (await Threads.getData(String(threadID))).data || {};
  data.PREFIX = handleReaction.PREFIX;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(String(threadID), data);

  api.unsendMessage(handleReaction.messageID);
  return api.sendMessage(`✅ Đã đổi prefix nhóm thành: ${handleReaction.PREFIX}`, threadID, messageID);
};

module.exports.run = async ({ api, event, args, Threads }) => {
  const { threadID, messageID } = event;

  if (!args[0]) {
    return api.sendMessage("⚠️ Bạn phải nhập prefix cần thay đổi!\nVí dụ: prefix !  hoặc  prefix reset", threadID, messageID);
  }

  const newPrefix = String(args[0]).trim();

  if (newPrefix.toLowerCase() === "reset") {
    const data = (await Threads.getData(threadID)).data || {};
    data.PREFIX = global.config.PREFIX;

    await Threads.setData(threadID, { data });
    global.data.threadData.set(String(threadID), data);

    return api.sendMessage(`🔄 Prefix đã được reset về: ${global.config.PREFIX}`, threadID, messageID);
  }

  if (newPrefix.length > 8) {
    return api.sendMessage("⚠️ Prefix nên ngắn gọn (≤ 8 ký tự).", threadID, messageID);
  }

  return api.sendMessage(
    `❓ Bạn có chắc muốn đổi prefix nhóm thành: "${newPrefix}"?\n👉 Thả ❤️ để xác nhận`,
    threadID,
    (err, info) => {
      if (err) return;
      global.client.handleReaction.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        PREFIX: newPrefix
      });
    }
  );
};
