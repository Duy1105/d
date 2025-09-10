const crypto = require('crypto');
const os = require("os");
const axios = require("axios");
const fs = require('fs');
const got = require('got');
const config = require('../config.json');
const package = require('../package.json');

module.exports.getYoutube = async function(t, e, i) {
	require("@distube/ytdl-core");
	const o = require("axios");
	if ("search" == e) {
		const e = require("youtube-search-api");
		return t ? a = (await e.GetListByKeyword(t, !1, 6)).items : console.log("Thiếu dữ liệu")
	}
	if ("getLink" == e) {
		var a = (await o.post("https://aiovideodl.ml/wp-json/aio-dl/video-data/", {
			url: "https://www.youtube.com/watch?v=" + t
		})).data;
			return "video" == i ? {
				title: a.title,
				duration: a.duration,
				download: {
					SD: a.medias[1].url,
					HD: a.medias[2].url
				}
			} : "audio" == i ? {
				title: a.title,
				duration: a.duration,
				download: a.medias[3].url
			} : void 0
		}
};

module.exports.throwError = function (command, threadID, messageID) {
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	return global.client.api.sendMessage(global.getText("utils", "throwError", ((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX), command), threadID, messageID);
}

module.exports.cleanAnilistHTML = function (text) {
	text = text
		.replace('<br>', '\n')
		.replace(/<\/?(i|em)>/g, '*')
		.replace(/<\/?b>/g, '**')
		.replace(/~!|!~/g, '||')
		.replace("&amp;", "&")
		.replace("&lt;", "<")
		.replace("&gt;", ">")
		.replace("&quot;", '"')
		.replace("&#039;", "'");
	return text;
}

module.exports.downloadFile = async function (url, path) {
	const { createWriteStream } = require('fs');

	const response = await axios({
		method: 'GET',
		responseType: 'stream',
		url
	});

	const writer = createWriteStream(path);

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};

module.exports.getContent = async function(url) {
	try {
		const response = await axios({
			method: 'GET',
			url
		});

		const data = response;

		return data;
	} catch (e) { return console.log(e); };
}

module.exports.getUID = async function (url) {
	try {
		if (url.match("profile.php") !== null) {
			if (url.match("&mi") !== null) return url.split("php?id=")[1].split("&")[0];
			return url.split("php?id=")[1];
		}
		var getUID = await getUIDFast(url);
		if (!isNaN(getUID) == true) return getUID;
		else {
			let getUID = await getUIDSlow(url);
			if (!isNaN(getUID)) return getUID;
			else return null;
		}
	} catch (e) { return console.log(e); };
}

async function getUIDFast(url) {
	var FormData = require("form-data");
	var Form = new FormData();
	var Url = new URL(url);
	Form.append('link', Url.href);
	try {
		var data = await got.post('https://id.traodoisub.com/api.php', {
			body: Form
		})
	} catch (e) {
		return console.log("Lỗi: " + e.message);
	}
	if (JSON.parse(data.body.toString()).error) return console.log(JSON.parse(data.body.toString()).error);
	else return JSON.parse(data.body.toString()).id || "co cai nit huhu";
}

async function getUIDSlow(url) {
	var FormData = require("form-data");
	var Form = new FormData();
	var Url = new URL(url);
	const username = Url.pathname.replace(/\//g, "")
	Form.append('username', username);
	try {
		var data = await axios({
			method: "POST",
			url: 'https://api.findids.net/api/get-uid-from-username',
			data: {
				username
			}
		})
		return data.data.data.id
	} catch (e) {
		console.log(e)
		return "errr"
	}
}

async function getVideoData(videoUrl) {
	if (!videoUrl || typeof videoUrl !== 'string') {
		return null;
	}

	// API endpoints để thử
	const apis = [
		{
			name: 'getfvid',
			url: 'https://getfvid.online/wp-json/aio-dl/video-data/',
			headers: {
				'authority': 'getfvid.online',
				'accept': '*/*',
				'accept-language': 'vi-VN,vi;q=0.9,en;q=0.8',
				'content-type': 'application/x-www-form-urlencoded',
				'origin': 'https://getfvid.online',
				'referer': 'https://getfvid.online/',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
			},
			payload: `url=${encodeURIComponent(videoUrl)}&token=292e8b8832c594c3fe843b9eb9d9dd16699901dd4d8c998301514542682b7346`
		}
	];

	for (const api of apis) {
		try {
			const response = await axios({
				method: 'POST',
				url: api.url,
				headers: api.headers,
				data: api.payload,
				timeout: 15000
			});

			if (response.status === 200 && response.data) {
				// Chuẩn hóa dữ liệu trả về
				const normalizedData = normalizeResponse(response.data);

				if (normalizedData && normalizedData.medias && normalizedData.medias.length > 0) {
					return normalizedData;
				}
			}
		} catch (error) {
			// Silently continue to next API
		}
	}
	return null;
}

function normalizeResponse(data) {
	try {
		// Khởi tạo cấu trúc dữ liệu chuẩn
		const result = {
			url: data.url || '',
			title: data.title || 'Downloaded Video',
			medias: []
		};

		// Xử lý medias từ response
		if (data.medias && Array.isArray(data.medias)) {
			result.medias = data.medias.map(media => ({
				url: media.url,
				type: getMediaType(media),
				quality: media.quality || 'default',
				size: media.size || 0,
				extension: media.extension || getExtensionFromType(getMediaType(media))
			}));
		} 
		// Fallback nếu có link trực tiếp
		else if (data.url) {
			result.medias.push({
				url: data.url,
				type: 'video',
				quality: 'default',
				size: 0,
				extension: 'mp4'
			});
		}

		return result.medias.length > 0 ? result : null;
	} catch (error) {
		return null;
	}
}

function getMediaType(media) {
	// Kiểm tra extension trước
	if (media.extension) {
		const ext = media.extension.toLowerCase();
		if (['mp4', 'avi', 'mkv', 'mov', 'webm'].includes(ext)) return 'video';
		if (['mp3', 'wav', 'aac', 'm4a', 'flac'].includes(ext)) return 'audio';
		if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
	}

	// Kiểm tra mime type
	if (media.mime_type) {
		if (media.mime_type.includes('video')) return 'video';
		if (media.mime_type.includes('audio')) return 'audio';
		if (media.mime_type.includes('image')) return 'image';
	}

	// Kiểm tra quality field
	if (media.quality && media.quality.toLowerCase() === 'audio') return 'audio';

	// Default
	return media.type || 'video';
}

function getExtensionFromType(type) {
	switch (type) {
		case 'video': return 'mp4';
		case 'audio': return 'mp3';
		case 'image': return 'jpg';
		default: return 'mp4';
	}
}

module.exports.getVideoData = getVideoData;

module.exports.randomString = function (length) {
	var result           = '';
	var characters       = 'ABCDKCCzwKyY9rmBJGu48FrkNMro4AWtCkc1flmnopqrstuvwxyz';
	var charactersLength = characters.length || 5;
	for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
}

module.exports.AES = {
	encrypt (cryptKey, crpytIv, plainData) {
		var encipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(cryptKey), Buffer.from(crpytIv));
				var encrypted = encipher.update(plainData);
		encrypted = Buffer.concat([encrypted, encipher.final()]);
		return encrypted.toString('hex');
	},
	decrypt (cryptKey, cryptIv, encrypted) {
		encrypted = Buffer.from(encrypted, "hex");
		var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(cryptKey), Buffer.from(cryptIv, 'binary'));
		var decrypted = decipher.update(encrypted);

		decrypted = Buffer.concat([decrypted, decipher.final()]);

		return String(decrypted);
	},
	makeIv () { return Buffer.from(crypto.randomBytes(16)).toString('hex').slice(0, 16); }
}

module.exports.homeDir = function () {
	var returnHome, typeSystem;
	const home = process.env["HOME"];
	const user = process.env["LOGNAME"] || process.env["USER"] || process.env["LNAME"] || process.env["USERNAME"];

	switch (process.platform) {
		case "win32": {
			returnHome = process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
			typeSystem = "win32"
			break;
		}
		case "darwin": {
			returnHome = home || (user ? '/Users/' + user : null);
			typeSystem = "darwin";
			break;
		}
		case "linux": {
			returnHome =  home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));
			typeSystem = "linux"
			break;
		}
		default: {
			returnHome = home || null;
			typeSystem = "unknow"
			break;
		}
	}

	return [typeof os.homedir === 'function' ? os.homedir() : returnHome, typeSystem];
}

module.exports.removeBackground = async(image) => {
	if(!image) return console.log('RemoveBG: thiếu dữ liệu');
	var resolveFunc = function () { };
		var rejectFunc = function () { };
		var returnPromise = new Promise(function (resolve, reject) {
			resolveFunc = resolve;
			rejectFunc = reject;
		});

	const path = require('path').resolve(__dirname, 'cache', `${Date.now()}.jpg`);
	const newPath = require('path').resolve(__dirname, 'cache', `${Date.now() + 1000}.jpg`);
	await global.utils.downloadFile(image, path);
	var FormData = require('form-data');
	var formData = new FormData();
		formData.append('size', 'auto');
		formData.append('image_file', fs.createReadStream(path), require('path').basename(path));
	var key = [
		'k2oqrAoyDZ3wMe5QqrKh4Ba3']
	axios({
			method: 'post',
			url: 'https://api.remove.bg/v1.0/removebg',
			data: formData,
			responseType: 'arraybuffer',
			headers: {
				...formData.getHeaders(),
				'X-Api-Key': key[Math.floor(Math.random() * key.length)],
			},
			encoding: null
	})
	.then((response) => {
			if(response.status != 200) return rejectFunc()
			fs.writeFileSync(newPath, response.data);
			fs.unlinkSync(path)
			resolveFunc(newPath)
	})
	.catch((error) => {
		return rejectFunc(error)
	});
	return returnPromise;
}

module.exports.streamUrl = async function(url) {
	const res = await axios({
		url: url,
		method: 'GET',
		responseType: 'stream'
	});
	return res.data;
}

/*
module.exports.catbox = async function(link) {
	try {
		const path = require('path');
		const FormData = require('form-data');
		const { headers } = await axios.head(link);
		const contentType = headers['content-type'];
		const extension = contentType.split('/')[1] || 'bin';
		const filePath = path.join(process.cwd(), 'modules', 'commands', 'cache', `${Date.now()}.${extension}`);
		const response = await axios({ method: 'GET', url: link, responseType: 'stream' });
		const writer = fs.createWriteStream(filePath);
		response.data.pipe(writer);
		await new Promise((resolve, reject) => writer.on('finish', resolve).on('error', reject));
		const formData = new FormData();
		formData.append('reqtype', 'fileupload');
		formData.append('fileToUpload', fs.createReadStream(filePath));
		const { data } = await axios.post('https://catbox.moe/user/api.php', formData, {
			headers: formData.getHeaders(),
		});
		fs.unlinkSync(filePath);
		return data;
	} catch (error) {
		throw new Error(`Error uploading catbox: ${error.message}`);
	}
};
*/
module.exports.catbox = async function(filePathOrUrl) {
		try {
				const fs = require('fs');
				const path = require('path');
				const axios = require('axios');
				const FormData = require('form-data');

				let filePath = filePathOrUrl;

				// Nếu đầu vào là URL từ xa (bắt đầu bằng http)
				if (/^https?:\/\//.test(filePathOrUrl)) {
						const { headers } = await axios.head(filePathOrUrl);
						const contentType = headers['content-type'];
						const extension = contentType.split('/')[1] || 'bin';
						filePath = path.join(process.cwd(), 'modules', 'commands', 'cache', `${Date.now()}.${extension}`);

						const response = await axios({ method: 'GET', url: filePathOrUrl, responseType: 'stream' });
						const writer = fs.createWriteStream(filePath);
						response.data.pipe(writer);
						await new Promise((resolve, reject) => writer.on('finish', resolve).on('error', reject));
				}

				// Upload file local
				const formData = new FormData();
				formData.append('reqtype', 'fileupload');
				formData.append('fileToUpload', fs.createReadStream(filePath));

				const { data } = await axios.post('https://catbox.moe/user/api.php', formData, {
						headers: formData.getHeaders(),
				});

				// Nếu filePath là file tạm tải từ URL thì xoá
				if (filePath !== filePathOrUrl) {
						fs.unlinkSync(filePath);
				}

				return data;
		} catch (error) {
				throw new Error(`Error uploading catbox: ${error.message}`);
		}
};
