module.exports.config = {
  name: "adduser",
  version: "1.0.1",
  hasPermssion: 1,
  credits: "D-Jukie",
  description: "Thêm người dùng vào nhóm bằng link hoặc uid",
  commandCategory: "qtv",
  usages: "+adduser <link|uid>",
  cooldowns: 5
};

const LINK_RE = /(facebook\.com|fb\.me|m\.facebook\.com)\//i;

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  if (!args[0])
    return api.sendMessage("Cách dùng:\n+adduser <link facebook>\n+adduser <uid>", threadID, messageID);

  const info = await api.getThreadInfo(threadID);
  const { participantIDs = [], approvalMode = false, adminIDs = [] } = info;

  let uid = args[0];
  try {
    if (LINK_RE.test(args[0])) {
      uid = await api.getUID(args[0] || event.messageReply?.body);
    }
    uid = String(uid);
  } catch (e) {
    return api.sendMessage("Không lấy được UID từ link, thử lại bằng UID.", threadID, messageID);
  }

  if (participantIDs.map(String).includes(uid))
    return api.sendMessage("Thành viên đã có trong nhóm.", threadID, messageID);

  api.addUserToGroup(uid, threadID, (err) => {
    if (err) return api.sendMessage("Không thể thêm vào nhóm.", threadID, messageID);
    const botIsAdmin = adminIDs.some(a => String(a.id) === String(api.getCurrentUserID()));
    if (approvalMode && !botIsAdmin)
      return api.sendMessage("Đã thêm vào danh sách phê duyệt.", threadID, messageID);
    return api.sendMessage("Thêm thành viên thành công.", threadID, messageID);
  });
};
