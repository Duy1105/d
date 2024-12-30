module.exports.config = {
    name: "antiout",
    version: "1.0.0",
    credits: "DungUwU (Khánh Milo Fix)",
    hasPermssion: 1,
    description: "Bật tắt antiout",
    usages: "antiout on/off",
    commandCategory: "qtv",
    cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
    else data["antiout"] = false;
  const timeStart = Date.now();
  const dcm = process.uptime();
  var hieu = Math.floor(dcm / (60 * 60));
  var simp = Math.floor((dcm % (60 * 60)) / 60);
  var rin = Math.floor(dcm % 60);
    
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    
     return api.sendMessage({body:`=====『 𝐀𝐍𝐓𝐈𝐎𝐔𝐓 』=====\n◆━━━━━━━━━━━━━◆\n𝐊𝐢́𝐜𝐡 𝐡𝐨𝐚̣𝐭 ${(data["antiout"] == true) ? "𝐛𝐚̣̂𝐭" : "𝐭𝐚̆́𝐭"} 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐜𝐡𝐨̂́𝐧𝐠 𝐨𝐮𝐭 𝐜𝐡𝐮̀𝐚✅\n𝐁𝐨𝐭 đ𝐚̃ 𝐨𝐧𝐥𝐢𝐧𝐞 đ𝐮̛𝐨̛̣𝐜 𝐭𝐨̂̉𝐧𝐠 𝐜𝐨̣̂𝐧𝐠 ${hieu} 𝐆𝐢𝐨̛̀ ${simp} 𝐏𝐡𝐮́𝐭 ${rin} 𝐆𝐢𝐚̂𝐲`,attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://www.duynro.id.vn/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID,event.messageID)
 }