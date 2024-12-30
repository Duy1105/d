module.exports.config = {
 name: "antijoin",
 version: "1.0.0",
 credits: "D-Jukie",
 hasPermssion: 1,
 description: "Cấm thành viên mới vào nhóm",
 usages: "",
 commandCategory: "qtv",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('[🐥] 𝘽𝙤𝙩 𝙘𝙖̂̀𝙣 𝙦𝙪𝙮𝙚̂̀𝙣 𝙦𝙪𝙖̉𝙣 𝙩𝙧𝙞̣ 𝙫𝙞𝙚̂𝙣 𝙣𝙝𝙤́𝙢', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`[🐥] 𝘿𝙖̃ ${(data.newMember == true) ? "𝙗𝙖̣̂𝙩" : "𝙩𝙖̆́𝙩"} 𝙩𝙝𝙖̀𝙣𝙝 𝙘𝙤̂𝙣𝙜 𝙖𝙣𝙩𝙞𝙟𝙤𝙞𝙣 ( 𝙘𝙝𝙚̂́ 𝙙𝙤̣̂ 𝙘𝙝𝙤̂́𝙣𝙜 𝙩𝙧𝙖̂̉𝙪 𝙫𝙤̂ 𝙗𝙤𝙭 )`, event.threadID, event.messageID);
}