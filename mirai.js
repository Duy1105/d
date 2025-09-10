//////////////////////////////////////////////////////
//========= Require all variable need use =========//
/////////////////////////////////////////////////////
const moment = require("moment-timezone");
const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
const { join, resolve } = require("path");
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
const login = require("./includes/fca-horizon-remastered"); 
const con = require('./config.json');
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;
global.client = new Object({
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String(),
 getTime: option => moment.tz("Asia/Ho_Chi_minh").format({
        seconds: "ss",
        minutes: "mm",
        hours: "HH",
        day: "dddd",
        date: "DD",
        month: "MM",
        year: "YYYY",
        fullHour: "HH:mm:ss",
        fullYear: "DD/MM/YYYY",
        fullTime: "HH:mm:ss DD/MM/YYYY"
    }[option])
});
global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array()
});
global.utils = require("./utils");
global.nodemodule = new Object();
global.config = new Object();
global.configModule = new Object();
global.moduleData = new Array();
global.language = new Object();
//////////////////////////////////////////////////////////
//========= Find and get variable from Config =========//
/////////////////////////////////////////////////////////
var configValue;
try {
    global.client.configPath = join(global.client.mainPath, "config.json");
    configValue = require(global.client.configPath);
}
catch {
    if (existsSync(global.client.configPath.replace(/\.json/g,"") + ".temp")) {
        configValue = readFileSync(global.client.configPath.replace(/\.json/g,"") + ".temp");
        configValue = JSON.parse(configValue);
        logger.loader(`Found: ${global.client.configPath.replace(/\.json/g,"") + ".temp"}`);
    }
}
try {
    for (const key in configValue) global.config[key] = configValue[key];
}
catch { return logger.loader("Can't load file config!", "error") }
const { Sequelize, sequelize } = require("./includes/database");
writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');
/////////////////////////////////////////
//========= Load language use =========//
/////////////////////////////////////////
const langPath = join(__dirname, "includes", "languages", `${global.config.language || "vi"}.lang`);
readFileSync(langPath, "utf8")
  .split(/\r?\n|\r/)
  .filter(l => l && !l.startsWith("#"))
  .forEach(line => {
    const i = line.indexOf("=");
    if (i < 0) return;
    const [h, ...r] = line.slice(0, i).split(".");
    if (!global.language[h]) global.language[h] = {};
    global.language[h][r.join(".") || line.slice(0, i)] = line.slice(i + 1).replace(/\\n/gi, "\n");
  });

global.getText = (ns, key, ...repls) => {
  if (!global.language[ns]) throw `${__filename} - Không tìm thấy ngôn ngữ chính: ${ns}`;
  return repls.reduce((t, v, i) => t.replace(new RegExp(`%${i + 1}`, "g"), v), global.language[ns][key]);
};

let appStateFile, appState;
try {
  appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
  appState = require(appStateFile);
} catch {
  return logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error");
}
/////////////////////////////////////
// AUTO CLEAN CACHE CODE BY DONGDEV//
/////////////////////////////////////
if (con.autoCleanCache.Enable) {
  const folderPath = con.autoCleanCache.CachePath;
  const fileExts = con.autoCleanCache.AllowFileExtension.map(e => e.toLowerCase());

  fs.readdir(folderPath, (err, files) => {
    if (err) return console.error('Lỗi khi đọc thư mục:', err);

    files
      .filter(f => fileExts.includes(path.extname(f).toLowerCase()))
      .forEach(f => {
        const p = path.join(folderPath, f);
        fs.unlink(p, err => { if (err) logger(`Đã xoá các file jpg, mp4, gif, ttf, mp3`, "[ Tự động dọn rác ]", err); });
      });

    logger(`Đã xoá các file jpg, mp4, gif, ttf, mp3`, "[ Tự động dọn rác ]");
  });
} else {
  logger(`Auto Clean Cache Đã Bị Tắt`, "[ Tự động dọn rác ]");
}
////////////////////////////////////////////////////////////
//========= Login account and start Listen Event =========//
////////////////////////////////////////////////////////////
function onBot({ models: botModel }) {
  const loginData = { appState }
  login(loginData, async (loginError, apiData) => {
    if (loginError) return logger(JSON.stringify(loginError), `ERROR`)
    apiData.setOptions(global.config.FCAOption)
    writeFileSync(appStateFile, JSON.stringify(apiData.getAppState(), null, '\t'))
    global.client.api = apiData
    global.config.version = '1.2.14'
    global.client.timeStart = Date.now()

    const installDependency = (name, modName, cmd) => {
      try {
        if (!global.nodemodule[name]) {
          global.nodemodule[name] = listPackage[name] || listbuiltinModules.includes(name)
            ? require(name)
            : require(modName)
        }
      } catch {
        let ok = false, err
        logger.loader(global.getText('mirai', 'notFoundPackage', name, modName), 'warn')
        execSync(cmd, { stdio: 'inherit', env: process.env, shell: true, cwd: join(__dirname, 'nodemodules') })
        for (let i = 0; i < 3; i++) {
          try {
            require.cache = {}
            global.nodemodule[name] = listPackage[name] || listbuiltinModules.includes(name)
              ? require(name)
              : require(modName)
            ok = true; break
          } catch (e) { err = e }
          if (ok || !err) break
        }
        if (!ok || err) throw global.getText('mirai', 'cantInstallPackage', name, modName, err)
      }
    }

    const applyEnvConfig = mod => {
      if (!mod.config?.envConfig) return
      try {
        const name = mod.config.name
        global.configModule[name] ??= {}
        global.config[name] ??= {}
        for (const k in mod.config.envConfig) {
          global.configModule[name][k] = global.config[name][k] ?? mod.config.envConfig[k] ?? ''
          global.config[name][k] ??= mod.config.envConfig[k] ?? ''
        }
      } catch {}
    }

    const loadFiles = (dir, { isCommand, disabledKey, filterDisabled, allowNoCategory }) => {
      const files = readdirSync(dir).filter(f => f.endsWith('.js') && !(filterDisabled && global.config[disabledKey].includes(f)))
      for (const f of files) {
        try {
          const mod = require(join(dir, f))
          if (!mod.config || !mod.run || (!allowNoCategory && !mod.config.commandCategory))
            throw Error(global.getText('mirai', 'errorFormat'))
          if (isCommand ? global.client.commands.has(mod.config.name) : global.client.events.has(mod.config.name))
            throw Error(global.getText('mirai', 'nameExist'))

          if (typeof mod.config.dependencies === 'object') {
            for (const dep in mod.config.dependencies) {
              const ver = mod.config.dependencies[dep]
              const depPath = join(__dirname, 'nodemodules', 'node_modules', dep)
              const cmd = `npm --package-lock false --save install ${dep}${ver && ver !== '*' ? '@' + ver : ''}`
              installDependency(dep, depPath, cmd)
            }
          }

          applyEnvConfig(mod)
          if (mod.onLoad) {
            try { mod.onLoad({ api: apiData, models: botModel }) }
            catch (err) { throw Error(global.getText('mirai', 'cantOnload', mod.config.name, JSON.stringify(err))) }
          }

          if (isCommand) {
            if (mod.handleEvent) global.client.eventRegistered.push(mod.config.name)
            global.client.commands.set(mod.config.name, mod)
          } else global.client.events.set(mod.config.name, mod)
        } catch {}
      }
    }

    loadFiles(global.client.mainPath + '/modules/commands', { isCommand: true, disabledKey: 'commandDisabled', filterDisabled: true })
    loadFiles(global.client.mainPath + '/modules/events', { isCommand: false, disabledKey: 'eventDisabled', filterDisabled: true, allowNoCategory: true })

    writeFileSync(global.client.configPath, JSON.stringify(global.config, null, 4), 'utf8')
    unlinkSync(global.client.configPath + '.temp')

    const listener = require('./includes/listen')({ api: apiData, models: botModel })
    const callback = (err, msg) => {
      if (err) return logger(global.getText('mirai', 'handleListenError', JSON.stringify(err)), 'error')
      if (['presence', 'typ', 'read_receipt'].includes(msg.type)) return
      if (global.config.DeveloperMode) console.log(msg)
      listener(msg)
    }
    global.handleListen = apiData.listenMqtt(callback)
    try {} catch {}
  })
}
//////////////////////////////////////////////
//========= Connecting to Database =========//
//////////////////////////////////////////////
(async() => {
    try {
        await sequelize.authenticate();
        const authentication = {};
        authentication.Sequelize = Sequelize;
        authentication.sequelize = sequelize;
        const models = require('./includes/database/model')(authentication);
        const botData = {};
        botData.models = models
        onBot(botData);
    } catch (error) {}
  })()
process.on('unhandledRejection', (err, p) => {})
.on('uncaughtException', err => { console.log(err); });