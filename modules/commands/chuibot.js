const fs = require('fs-extra');
module.exports.config = {
  name: 'autoban',
  version: '1.1.0',
  hasPermssion: 0,
  credits: 'D-Jukie',
  description: 'Tự động ban người dùng chửi bot',
  commandCategory: 'admin',
  usages: '',
  cooldowns: 0,
}
module.exports.handleEvent = async function ({
  api,
  event,
  args,
  Users,
  Threads,
}) {
  var { threadID, reason } = event,
    id = '' + event.senderID,
    idgr = '' + event.threadID,
    name = (await Users.getData(event.senderID)).name,
    idbox = event.threadID,
    datathread = (await Threads.getData(event.threadID)).threadInfo
  const moment = require('moment-timezone')
  var gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss DD/MM/YYYY')
  const time = moment.tz('Asia/Ho_Chi_minh').format('HH:MM:ss L')
  if (!event.body) {
    return
  }
  if (
    event.body.indexOf('ban t đi') !== -1 ||
    event.body.indexOf('Ban t đi') !== -1 ||
    event.body.indexOf('please ban me') !== -1 ||
    event.body.indexOf('Please ban me') !== -1 ||
    event.body.indexOf('bot loz') !== -1 ||
    event.body.indexOf('Bot loz') !== -1 ||
    event.body.indexOf('bot ngu') !== -1 ||
    event.body.indexOf('Bot ngu') !== -1 ||
    event.body.indexOf('botngu') !== -1 ||
    event.body.indexOf('Botngu') !== -1 ||
    event.body.indexOf('bot dỏm') !== -1 ||
    event.body.indexOf('Bot dỏm') !== -1 ||
    event.body.indexOf('Bot lazada') !== -1 ||
    event.body.indexOf('bot lazada') !== -1 ||
    event.body.indexOf('Bot shoppe') !== -1 ||
    event.body.indexOf('bot shoppe') !== -1 ||
    event.body.indexOf('bot tiki') !== -1 ||
    event.body.indexOf('Bot tiki') !== -1 ||
    event.body.indexOf('bot óc') !== -1 ||
    event.body.indexOf('Bot óc') !== -1 ||
    event.body.indexOf('dm bot') !== -1 ||
    event.body.indexOf('dmbot') !== -1 ||
    event.body.indexOf('Dmbot') !== -1 ||
    event.body.indexOf('Dm bot') !== -1 ||
    event.body.indexOf('Đm bot') !== -1 ||
    event.body.indexOf('clmm bot') !== -1 ||
    event.body.indexOf('Clmm bot') !== -1 ||
    event.body.indexOf('bot đần') !== -1 ||
    event.body.indexOf('Bot đần') !== -1 ||
    event.body.indexOf('óc bot') !== -1 ||
    event.body.indexOf('Óc bot') !== -1 ||
    event.body.indexOf('Bot lỏ') !== -1 ||
    event.body.indexOf('kick bot') !== -1 ||
    event.body.indexOf('Kick bot') !== -1 ||
    event.body.indexOf('bot ngáo') !== -1 ||
    event.body.indexOf('Bot ngáo') !== -1 ||
    event.body.indexOf('bot não') !== -1 ||
    event.body.indexOf('Bot não') !== -1 ||
    event.body.indexOf('bot cặc') !== -1 ||
    event.body.indexOf('Bot cặc') !== -1 ||
    event.body.indexOf('bot cac') !== -1 ||
    event.body.indexOf('Bot cac') !== -1 ||
    event.body.indexOf('Bot óc') !== -1 ||
    event.body.indexOf('bot óc') !== -1 ||
    event.body.indexOf('bot lon') !== -1 ||
    event.body.indexOf('Bot lon') !== -1 ||
    event.body.indexOf('Bot lồn') !== -1 ||
    event.body.indexOf('bot lồn') !== -1 ||
    event.body.indexOf('Đỉ bot') !== -1 ||
    event.body.indexOf('đỉ bot') !== -1 ||
    event.body.indexOf('đỷ bot') !== -1 ||
    event.body.indexOf('Đỷ bot') !== -1 ||
    event.body.indexOf('chó bot') !== -1 ||
    event.body.indexOf('Chó bot') !== -1 ||
    event.body.indexOf('Bot chó') !== -1 ||
    event.body.indexOf('bot chó') !== -1 ||
    event.body.indexOf('súc vật bot') !== -1 ||
    event.body.indexOf('Súc vật bot') !== -1 ||
    event.body.indexOf('bot này ngu') !== -1 ||
    event.body.indexOf('Bot này ngu') !== -1 ||
    event.body.indexOf('Bot láo') !== -1 ||
    event.body.indexOf('bot láo') !== -1 ||
    event.body.indexOf('dcm bot') !== -1 ||
    event.body.indexOf('Dcm bot') !== -1 ||
    event.body.indexOf('bot mất dạy') !== -1 ||
    event.body.indexOf('Bot mất dạy') !== -1 ||
    event.body.indexOf('botoccho') !== -1 ||
    event.body.indexOf('Botoccho') !== -1 ||
    event.body.indexOf('Bot rác') !== -1 ||
    event.body.indexOf('bot rác') !== -1 ||
    event.body.indexOf('Bot rac') !== -1 ||
    event.body.indexOf('bot rac') !== -1 ||
    event.body.indexOf('Botrac') !== -1 ||
    event.body.indexOf('botrac') !== -1 ||
    event.body.indexOf('bot ncc') !== -1 ||
    event.body.indexOf('Bot ncc') !== -1 ||
    event.body.indexOf('bot lỏ') !== -1 ||
    event.body.indexOf('cc bot') !== -1 ||
    event.body.indexOf('Cc bot') !== -1 ||
    event.body.indexOf('bot ncl') !== -1 ||
    event.body.indexOf('Bot ncl') !== -1 ||
    event.body.indexOf('bot cút') !== -1 ||
    event.body.indexOf('Bot cút') !== -1 ||
    event.body.indexOf('Cút đi bot') !== -1 ||
    event.body.indexOf('cút đi bot') !== -1 ||
    event.body.indexOf('Duy ngu') !== -1 ||
    event.body.indexOf('duy ngu') !== -1 ||
    event.body.indexOf('admin ngu') !== -1 ||
    event.body.indexOf('Admin chó') !== -1 ||
    event.body.indexOf('admin đểu') !== -1 ||
    event.body.indexOf('Admin ngu') !== -1 ||
    event.body.indexOf('Admin sv') !== -1 ||
    event.body.indexOf('admin lồn') !== -1 ||
    event.body.indexOf('Admin óc') !== -1 ||
    event.body.indexOf('admin óc') !== -1 ||
    event.body.indexOf('Admin rác') !== -1 ||
    event.body.indexOf('admin rác') !== -1 ||
    event.body.indexOf('Admin ncc') !== -1 ||
    event.body.indexOf('admin ncc') !== -1
  ) {
    let data = (await Users.getData(id)).data || {}
    var namethread = datathread.threadName
    return (
      (data.banned = true),
      (data.reason = 'Chửi bot' || null),
      (data.dateAdded = time),
      await Users.setData(id, { data: data }),
      global.data.userBanned.set(id, {
        reason: data.reason,
        dateAdded: data.dateAdded,
      }),
      api.sendMessage(
'⭐ ━━━━━━━━━ User Ban ━━━━━━━━━ ⭐' + '\n' +
'| ➜ Bạn Đã Bị Ban' + ' | ' + ' Chửi Bot , Admin' + '\n' +
'| ➜ Tên : ' + name + '\n' +
'| ➜ Tid : ' + idgr + '\n' +
'| ➜ Admin said you : Bịch Rác Di Động ∐w∐' + '\n' +
'| ➜ Xin Gỡ Ban Qua : ' + 'https://www.facebook.com/duydo05 ' + '\n' +
'━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        threadID,
        () => {
          var idd = global.config.ADMINBOT
          for (let idad of idd) {
            api.sendMessage(
'⭐ ━━━━━━━━━ User Ban ━━━━━━━━━ ⭐' + '\n' +
'| ➜ ' + name + ' nhóm ' + namethread + '\n' +
'| ➜ Chửi Bot : ' + event.body + '\n' +
'| ➜ Lúc : ' + gio + '\n' +
'| ➜ Id Nhóm : ' + idgr + '\n' +
'| ➜ Facebook.com/' + id + '\n' +
'━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 
              idad
            )
          }
        }
      )
    )
    
  } else {
    return
  }
}
module.exports.run = async function ({
  api,
  event,
  args,
  Users,
  Threads,
  __GLOBAL,
}) {
  api.sendMessage(
    `⚡Tự động ban khi chửi bot\n⚡Module code by ⚡D-Jukie`,
    event.threadID,
    event.messageID
  )
}
