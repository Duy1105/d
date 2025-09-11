module.exports.config = {
  name: 'autoban',
  version: '1.1.1',
  hasPermssion: 0,
  credits: 'D-Jukie',
  description: 'Tự động ban người dùng chửi bot',
  commandCategory: 'admin',
  usages: '',
  cooldowns: 0,
};

const moment = require('moment-timezone');

const KEYWORDS = [
  'ban t đi','Ban t đi','please ban me','Please ban me','bot loz','Bot loz','bot ngu','Bot ngu',
  'botngu','Botngu','bot dỏm','Bot dỏm','Bot lazada','bot lazada','Bot shoppe','bot shoppe',
  'bot tiki','Bot tiki','bot óc','Bot óc','dm bot','dmbot','Dmbot','Dm bot','Đm bot','clmm bot',
  'Clmm bot','bot đần','Bot đần','óc bot','Óc bot','Bot lỏ','kick bot','Kick bot','bot ngáo',
  'Bot ngáo','bot não','Bot não','bot cặc','Bot cặc','bot cac','Bot cac','Bot óc','bot óc',
  'bot lon','Bot lon','Bot lồn','bot lồn','Đỉ bot','đỉ bot','đỷ bot','Đỷ bot','chó bot','Chó bot',
  'Bot chó','bot chó','súc vật bot','Súc vật bot','bot này ngu','Bot này ngu','Bot láo','bot láo',
  'dcm bot','Dcm bot','bot mất dạy','Bot mất dạy','botoccho','Botoccho','Bot rác','bot rác',
  'Bot rac','bot rac','Botrac','botrac','bot ncc','Bot ncc','bot lỏ','cc bot','Cc bot','bot ncl',
  'Bot ncl','bot cút','Bot cút','Cút đi bot','cút đi bot','Duy ngu','duy ngu','admin ngu','Admin chó',
  'admin đểu','Admin ngu','Admin sv','admin lồn','Admin óc','admin óc','Admin rác','admin rác',
  'Admin ncc','admin ncc'
];

module.exports.handleEvent = async function ({ api, event, Users, Threads }) {
  if (!event || typeof event.body !== 'string') return;

  const msg = event.body;
  const userId = String(event.senderID);
  const threadId = String(event.threadID);

  // NGOẠI LỆ: ADMINBOT, NDH, CHÍNH BOT
  const botID = api.getCurrentUserID();
  const { ADMINBOT = [], NDH = [] } = global.config || {};
  if (ADMINBOT.map(String).includes(userId) || NDH.map(String).includes(userId) || userId === String(botID)) {
    return; // miễn trừ auto-ban
  }

  const isAbuse = KEYWORDS.some(k => msg.indexOf(k) !== -1);
  if (!isAbuse) return;

  const userData = await Users.getData(userId) || {};
  const name = userData.name || 'Người dùng';
  const threadData = await Threads.getData(threadId).catch(() => null);
  const threadName = threadData?.threadInfo?.threadName || 'Không rõ';

  const timeStr = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss DD/MM/YYYY');

  const data = userData.data || {};
  data.banned = true;
  data.reason = 'Chửi bot';
  data.dateAdded = timeStr;

  await Users.setData(userId, { data });
  global.data.userBanned.set(userId, { reason: data.reason, dateAdded: data.dateAdded });

  const userNotice =
    '⭐ ━━━━━━━━━ User Ban ━━━━━━━━━ ⭐\n' +
    '| ➜ Bạn Đã Bị Ban |  Chửi Bot , Admin\n' +
    `| ➜ Tên : ${name}\n` +
    `| ➜ Tid : ${threadId}\n` +
    '| ➜ Admin said you : Bịch Rác Di Động ∐w∐\n' +
    '| ➜ Xin Gỡ Ban Qua : https://www.facebook.com/duydo05 \n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

  api.sendMessage(userNotice, threadId, () => {
    const admins = (global.config && Array.isArray(global.config.ADMINBOT)) ? global.config.ADMINBOT : [];
    const adminMsg =
      '⭐ ━━━━━━━━━ User Ban ━━━━━━━━━ ⭐\n' +
      `| ➜ ${name} nhóm ${threadName}\n` +
      `| ➜ Chửi Bot : ${msg}\n` +
      `| ➜ Lúc : ${timeStr}\n` +
      `| ➜ Id Nhóm : ${threadId}\n` +
      `| ➜ Facebook.com/${userId}\n` +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    admins.forEach(adm => api.sendMessage(adminMsg, adm));
  });
};

module.exports.run = async function ({ api, event }) {
  api.sendMessage('⚡Tự động ban khi chửi bot (ngoại lệ: ADMINBOT, NDH, bot)\n⚡Module code by D-Jukie', event.threadID, event.messageID);
};
