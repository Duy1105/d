
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');

module.exports.config = {
    name: "set",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Ljzi",
    description: "Lệnh set tổng hợp",
    commandCategory: "admin",
    usages: "[cmd/money/name/prefix/qtv] [options]",
    cooldowns: 5
};

module.exports.languages = {
    "vi": {
        "successChange": "Đã chuyển đổi dấu lệnh của nhóm thành: %1",
        "missingInput": "Phần dấu lệnh cần đặt không được để trống",
        "resetPrefix": "Đã reset dấu lệnh thành mặc định: %1",
        "confirmChange": "Bạn có chắc muốn thay đổi dấu lệnh của nhóm thành: 「 %1 」\nVui lòng thả cảm xúc vào tin nhắn này để đổi dấu lệnh."
    }
};

module.exports.handleReaction = async function({ api, event, Threads, handleReaction, getText, Users }) {
    try {
        if (event.userID != handleReaction.author) return;
        const { threadID, messageID } = event;

        switch (handleReaction.type) {
            case 'prefix': {
                if (event.reaction != "❤") return;
                var data = (await Threads.getData(String(threadID))).data || {};
                data["PREFIX"] = handleReaction.PREFIX;
                await Threads.setData(threadID, { data });
                await global.data.threadData.set(String(threadID), data);
                api.unsendMessage(handleReaction.messageID);

                const thuebotDataPath = path.join(__dirname, 'data', 'thuebot.json');
                let rentalData = fs.existsSync(thuebotDataPath) ? JSON.parse(fs.readFileSync(thuebotDataPath)) : [];
                if (Array.isArray(rentalData)) {
                    const rentalInfo = rentalData.find(rental => rental.t_id === threadID);
                    let newNickname = rentalInfo ? rentalInfo.time_end : "Chưa thuê bot";
                    api.changeNickname(`「 ${handleReaction.PREFIX} 」 • ${global.config.BOTNAME}`, threadID, api.getCurrentUserID());
                    // | HSD: ${newNickname}
                }
                return api.sendMessage(getText("successChange", handleReaction.PREFIX), threadID, messageID);
            }

            case 'qtv_add': {
                if (event.reaction != "❤") return;
                var name = (await Users.getData(handleReaction.userID)).name;
                api.changeAdminStatus(threadID, handleReaction.userID, true, (err) => {
                    if (err) return api.sendMessage("📌 Bot không đủ quyền hạn để thêm quản trị viên!", threadID, messageID);
                    return api.sendMessage(`Đã thêm ${name} làm quản trị viên nhóm`, threadID, messageID);
                });
                break;
            }

            case 'qtv_remove': {
                if (event.reaction != "❤") return;
                var name = (await Users.getData(handleReaction.userID)).name;
                api.changeAdminStatus(threadID, handleReaction.userID, false, (err) => {
                    if (err) return api.sendMessage("📌 Bot không đủ quyền hạn để gỡ quản trị viên!", threadID, messageID);
                    return api.sendMessage(`Đã gỡ quản trị viên của ${name} thành công.`, threadID, messageID);
                });
                break;
            }
        }
    } catch (e) { 
        console.log(e);
    }
};

module.exports.run = async function({ api, event, args, Users, Threads, Currencies, getText }) {
    const { threadID, messageID, senderID, messageReply, mentions } = event;

    if (args.length === 0) {
        return api.sendMessage(
            "🛠️ LỆNH SET TỔNG HỢP\n" +
            "─────────────────────\n" +
            "📝 set cmd [add/remove/list] - Quản lý lệnh tùy chỉnh\n" +
            "💰 set money [add/set/clean/all] - Quản lý tiền\n" +
            "🏷️ set name [options] - Đặt biệt danh\n" +
            "⚙️ set prefix [prefix/reset] - Đặt prefix\n" +
            "👑 set qtv [add/remove] - Quản lý QTV\n" +
            "─────────────────────\n" +
            "💡 Sử dụng: set [loại] [tùy chọn]",
            threadID, messageID
        );
    }

    const type = args[0].toLowerCase();
    const subArgs = args.slice(1);

    switch (type) {
        case 'cmd': {
            if (event.senderID != global.config.ADMINBOT[0] && global.config.ADMINBOT.indexOf(event.senderID) === -1) {
                return api.sendMessage("⚠️ Bạn không có quyền sử dụng lệnh này!", threadID, messageID);
            }

            const customCommandsFile = path.join(__dirname, "data", "custom_commands.json");

            function loadCustomCommands() {
                if (fs.existsSync(customCommandsFile)) {
                    return JSON.parse(fs.readFileSync(customCommandsFile, "utf8"));
                }
                return {};
            }

            function saveCustomCommands(data) {
                fs.writeFileSync(customCommandsFile, JSON.stringify(data, null, 2));
            }

            const customCommands = loadCustomCommands();
            if (!customCommands[threadID]) {
                customCommands[threadID] = {};
            }

            switch (subArgs[0]) {
                case "add":
                    if (subArgs.length !== 3) return api.sendMessage("Sử dụng: set cmd add [tên lệnh gốc] [tên lệnh mới]", threadID, messageID);
                    customCommands[threadID][subArgs[2]] = subArgs[1];
                    saveCustomCommands(customCommands);
                    return api.sendMessage(`Đã thêm lệnh tùy chỉnh: "${subArgs[2]}" sẽ thực thi lệnh "${subArgs[1]}"`, threadID, messageID);

                case "remove":
                    if (subArgs.length !== 2) return api.sendMessage("Sử dụng: set cmd remove [tên lệnh tùy chỉnh]", threadID, messageID);
                    if (customCommands[threadID][subArgs[1]]) {
                        delete customCommands[threadID][subArgs[1]];
                        saveCustomCommands(customCommands);
                        return api.sendMessage(`Đã xóa lệnh tùy chỉnh "${subArgs[1]}"`, threadID, messageID);
                    }
                    return api.sendMessage(`Không tìm thấy lệnh tùy chỉnh "${subArgs[1]}"`, threadID, messageID);

                case "list":
                    const cmdList = Object.entries(customCommands[threadID])
                        .map(([custom, original]) => `${custom} => ${original}`)
                        .join('\n');
                    return api.sendMessage(cmdList ? `Danh sách lệnh tùy chỉnh:\n${cmdList}` : "Không có lệnh tùy chỉnh nào cho nhóm này.", threadID, messageID);

                default:
                    return api.sendMessage("Sử dụng: set cmd [add/remove/list]", threadID, messageID);
            }
        }

        case 'money': {
            if (event.senderID != global.config.ADMINBOT[0] && global.config.ADMINBOT.indexOf(event.senderID) === -1) {
                return api.sendMessage("⚠️ Bạn không có quyền sử dụng lệnh này!", threadID, messageID);
            }

            const mentionID = Object.keys(mentions);
            const money = parseInt(subArgs[1]);
            var message = [];
            var error = [];

            switch (subArgs[0]) {
                case "add": {
                    if (messageReply) {
                        var name = (await Users.getData(messageReply.senderID)).name;
                        await Currencies.increaseMoney(messageReply.senderID, money);
                        return api.sendMessage(`[ 𝗠𝗼𝗻𝗲𝘆 ] → Đã cộng tiền cho ${name} thành công ${money}$`, threadID);
                    } else if (mentionID.length != 0) {
                        for (singleID of mentionID) {
                            if (!money || isNaN(money)) return api.sendMessage("Số tiền không hợp lệ!", threadID, messageID);
                            try {
                                await Currencies.increaseMoney(singleID, money);
                                message.push(singleID);
                            } catch (e) { error.push(e); }
                        }
                        return api.sendMessage(`[ 𝗠𝗼𝗻𝗲𝘆 ] → Đã cộng thêm ${money}$ cho ${message.length} người`, threadID);
                    } else {
                        if (!money || isNaN(money)) return api.sendMessage("Số tiền không hợp lệ!", threadID, messageID);
                        try {
                            await Currencies.increaseMoney(senderID, money);
                            return api.sendMessage(`[ 𝗠𝗼𝗻𝗲𝘆 ] → Đã cộng thêm ${money}$ cho bản thân`, threadID);
                        } catch (e) { 
                            return api.sendMessage("[ Lỗi ] → Không thể cộng thêm tiền!", threadID);
                        }
                    }
                }

                case "set": {
                    if (mentionID.length != 0) {
                        for (singleID of mentionID) {
                            if (!money || isNaN(money)) return api.sendMessage("Số tiền không hợp lệ!", threadID, messageID);
                            try {
                                await Currencies.setData(singleID, { money });
                                message.push(singleID);
                            } catch (e) { error.push(e); }
                        }
                        return api.sendMessage(`[ 𝗠𝗼𝗻𝗲𝘆 ] → Đã set thành công ${money}$ cho ${message.length} người`, threadID);
                    } else {
                        if (!money || isNaN(money)) return api.sendMessage("Số tiền không hợp lệ!", threadID, messageID);
                        try {
                            await Currencies.setData(senderID, { money });
                            return api.sendMessage(`[ 𝗠𝗼𝗻𝗲𝘆 ] → Đã set thành công ${money}$ cho bản thân`, threadID);
                        } catch (e) { 
                            return api.sendMessage("[ Lỗi ] → Không thể set tiền!", threadID);
                        }
                    }
                }

                case "clean": {
                    if (mentionID.length != 0) {
                        for (singleID of mentionID) {
                            try {
                                await Currencies.setData(singleID, { money: 0 });
                                message.push(singleID);
                            } catch (e) { error.push(e); }
                        }
                        return api.sendMessage(`[ 𝗠𝗼𝗻𝗲𝘆 ] → Đã xóa thành công toàn bộ tiền của ${message.length} người`, threadID);
                    } else {
                        try {
                            await Currencies.setData(senderID, { money: 0 });
                            return api.sendMessage(`[ 𝗠𝗼𝗻𝗲𝘆 ] → Đã xóa thành công tiền của bản thân`, threadID);
                        } catch (e) { 
                            return api.sendMessage("[ Lỗi ] → Không thể xóa tiền!", threadID);
                        }
                    }
                }

                case "all": {
                    var name = (await Users.getData(senderID)).name;
                    if (!subArgs[1]) return api.sendMessage("Bạn chưa nhập số tiền!", threadID, messageID);
                    if (isNaN(subArgs[1])) return api.sendMessage("Số tiền không hợp lệ!", threadID, messageID);
                    if (subArgs[1] > 1000000000000) return api.sendMessage("Số tiền quá lớn!", threadID, messageID);

                    let { participantIDs } = await api.getThreadInfo(threadID);
                    for (let i of participantIDs) {
                        try {
                            await Currencies.increaseMoney(parseInt(i), parseInt(subArgs[1]));
                            message.push(i);
                        } catch (e) { error.push(e); }
                    }
                    return api.sendMessage(`${name} đã cộng thêm ${subArgs[1]}$ cho ${message.length} người`, threadID);
                }

                default:
                    return api.sendMessage("Sử dụng: set money [add/set/clean/all] [số tiền]", threadID, messageID);
            }
        }

        case 'name': {
            const filePath = path.join(__dirname, 'data', 'setname.json');
            if (!fs.existsSync(filePath)) {
                fs.writeJsonSync(filePath, []);
                return api.sendMessage('⚡️ Đã tạo dữ liệu. vui lòng sử dụng lại lệnh!', threadID, messageID);
            }

            const jsonData = fs.readJsonSync(filePath);
            const existingData = jsonData.find(data => data.id_Nhóm === threadID);
            const mention = Object.keys(mentions)[0];

            if (subArgs[0]?.toLowerCase() === 'add') {
                if (subArgs.length < 2) {
                    return api.sendMessage('⚠️ Vui lòng nhập kí tự.', threadID, messageID);
                }
                const newData = { id_Nhóm: threadID, kí_tự: subArgs.slice(1).join(' ') || '' };
                if (existingData) existingData.kí_tự = newData.kí_tự;
                else jsonData.push(newData);
                fs.writeJsonSync(filePath, jsonData);
                return api.sendMessage(`✅ Đã cập nhật kí tự setname.`, threadID, messageID);
            }

            if (subArgs[0]?.toLowerCase() === 'help') {
                return api.sendMessage(
                    "📝 Cách sử dụng:\n\n" +
                    "⚡️ Thêm kí tự setname:\n → set name add [kí_tự]\n" +
                    "👤 Đổi biệt danh cá nhân:\n → set name + [tên]\n" +
                    "📋 Xem người chưa có biệt danh:\n → set name check\n" +
                    "🔍 Tag người chưa có biệt danh:\n → set name call\n" +
                    "⚠️ Xóa người chưa có biệt danh (QTV):\n → set name del\n" +
                    "👥 Đặt biệt danh cho tất cả:\n → set name all\n" +
                    "🔄 Tự động thêm kí tự cho người chưa có:\n → set name auto",
                    threadID, messageID
                );
            }

            try {
                if (existingData) {
                    const userName = await Users.getNameUser(senderID);
                    const names = subArgs.length > 0 ? subArgs.join(' ') : userName;

                    if (mention) {
                        const newName = `${existingData.kí_tự} ${names.replace(mentions[mention], '')}`;
                        await api.changeNickname(newName, threadID, mention);
                    } else {
                        const targetID = messageReply ? messageReply.senderID : senderID;
                        const newName = `${existingData.kí_tự} ${names}`;
                        await api.changeNickname(newName, threadID, targetID);
                    }

                    return api.sendMessage(`✅ ${!subArgs[0] ? 'Gỡ' : 'Thay đổi'} biệt danh thành công!`, threadID, messageID);
                } else {
                    if (mention) {
                        const name = subArgs.join(' ');
                        await api.changeNickname(name.replace(mentions[mention], ''), threadID, mention);
                    } else {
                        const targetID = messageReply ? messageReply.senderID : senderID;
                        await api.changeNickname(subArgs.join(' '), threadID, targetID);
                    }

                    return api.sendMessage(`✅ ${!subArgs[0] ? 'Gỡ' : 'Thay đổi'} biệt danh thành công!`, threadID, messageID);
                }
            } catch (error) {
                return api.sendMessage('⚠️ Hiện tại nhóm đang bật liên kết mời nên không thể đổi biệt danh.', threadID, messageID);
            }
        }

        case 'prefix': {
            let dataThread = (await Threads.getData(threadID)).threadInfo;
            if (!dataThread.adminIDs.some(item => item.id == senderID) && event.senderID != global.config.ADMINBOT[0]) {
                return api.sendMessage("⚠️ Bạn không có quyền sử dụng lệnh này!", threadID, messageID);
            }

            if (typeof subArgs[0] == "undefined") return api.sendMessage(getText("missingInput"), threadID, messageID);
            let prefix = subArgs[0].trim();
            if (!prefix) return api.sendMessage(getText("missingInput"), threadID, messageID);

            if (prefix == "reset") {
                var data = (await Threads.getData(threadID)).data || {};
                data["PREFIX"] = global.config.PREFIX;
                await Threads.setData(threadID, { data });
                await global.data.threadData.set(String(threadID), data);
                var uid = api.getCurrentUserID();
                api.changeNickname(`「 ${global.config.PREFIX} 」 • ${global.config.BOTNAME}`, threadID, uid);
                return api.sendMessage(getText("resetPrefix", global.config.PREFIX), threadID, messageID);
            } else {
                return api.sendMessage(getText("confirmChange", prefix), threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: "set",
                        messageID: info.messageID,
                        author: senderID,
                        type: 'prefix',
                        PREFIX: prefix
                    });
                });
            }
        }

        case 'qtv': {
            let dataThread = (await Threads.getData(threadID)).threadInfo;
            if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID()) && !dataThread.adminIDs.some(item => item.id == senderID)) {
                return api.sendMessage('⚠️ Bạn không có quyền sử dụng lệnh này!', threadID, messageID);
            }

            if (subArgs.length == 0) {
                return api.sendMessage(
                    "===== [ 𝗦𝗘𝗧𝗤𝗧𝗩 ] =====\n" +
                    "──────────────────\n" +
                    "set qtv add @tag hoặc reply → thêm thành viên làm quản trị viên nhóm\n" +
                    "set qtv remove @tag hoặc reply → xóa quản trị viên của người khác",
                    threadID, messageID
                );
            }

            if (subArgs[0] == 'add') {
                let uid, uid1 = senderID;
                if (messageReply) {
                    uid = messageReply.senderID;
                } else if (Object.keys(mentions).length > 0) {
                    uid = Object.keys(mentions)[0];
                } else {
                    uid = senderID;
                }

                return api.sendMessage('Thả cảm xúc "❤" tin nhắn này để xác nhận', threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: "set",
                        type: 'qtv_add',
                        messageID: info.messageID,
                        author: uid1,
                        userID: uid
                    });
                });
            }

            if (subArgs[0] == 'remove') {
                let uid, uid1 = senderID;
                if (messageReply) {
                    uid = messageReply.senderID;
                } else if (Object.keys(mentions).length > 0) {
                    uid = Object.keys(mentions)[0];
                } else {
                    return api.sendMessage('Vui lòng reply hoặc tag người cần gỡ quyền QTV!', threadID, messageID);
                }

                return api.sendMessage('Thả cảm xúc "❤" tin nhắn này để xác nhận', threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: "set",
                        type: 'qtv_remove',
                        messageID: info.messageID,
                        author: uid1,
                        userID: uid
                    });
                });
            }
        }

        default:
            return api.sendMessage("❌ Loại lệnh không hợp lệ! Sử dụng: set [cmd/money/name/prefix/qtv]", threadID, messageID);
    }
};

