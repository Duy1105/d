//========= Require & Global =========//
const moment = require("moment-timezone");
const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync } = require("fs-extra");
const { join, resolve } = require("path");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const logger = require("./utils/log.js");
const login = require("./includes/fca-horizon-remastered");
const con = require("./config.json");
const listPackage = require("./package.json").dependencies;
const listbuiltinModules = require("module").builtinModules;
global.client = {
  commands: new Map(),
  events: new Map(),
  cooldowns: new Map(),
  eventRegistered: [],
  handleSchedule: [],
  handleReaction: [],
  handleReply: [],
  mainPath: process.cwd(),
  configPath: "",
  getTime: opt => moment.tz("Asia/Ho_Chi_Minh").format({
    seconds: "ss", minutes: "mm", hours: "HH",
    day: "dddd", date: "DD", month: "MM", year: "YYYY",
    fullHour: "HH:mm:ss", fullYear: "DD/MM/YYYY", fullTime: "HH:mm:ss DD/MM/YYYY"
  }[opt])
};
global.data = {
  threadInfo: new Map(),
  threadData: new Map(),
  userName: new Map(),
  userBanned: new Map(),
  threadBanned: new Map(),
  commandBanned: new Map(),
  threadAllowNSFW: [],
  allUserID: [],
  allCurrenciesID: [],
  allThreadID: []
};
global.utils = require("./utils");
global.nodemodule = {};
global.config = {};
global.configModule = {};
global.moduleData = [];
global.language = {};
//========= Load Config =========//
global.client.configPath = join(global.client.mainPath, "config.json");
let configValue;
try {
  configValue = require(global.client.configPath);
} catch {
  const tempPath = global.client.configPath.replace(/\.json$/, ".temp");
  if (existsSync(tempPath)) {
    configValue = JSON.parse(readFileSync(tempPath));
    logger.loader(`Found: ${tempPath}`);
  }
}
try {
  Object.assign(global.config, configValue);
} catch {
  return logger.loader("Can't load file config!", "error");
}
const { Sequelize, sequelize } = require("./includes/database");
writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');
//========= Load Language =========//
const langPath = join(__dirname, "includes", `${global.config.language || "vi"}.lang`);
readFileSync(langPath, "utf8")
  .split(/\r?\n|\r/).filter(l => l && !l.startsWith("#"))
  .forEach(line => {
    const [k, v] = line.split("=");
    if (!v) return;
    const keys = k.split(".");
    const h = keys.shift();
    global.language[h] ??= {};
    global.language[h][keys.join(".") || k] = v.replace(/\\n/gi, "\n");
  });
global.getText = (ns, key, ...repls) => {
  if (!global.language[ns]) throw `${__filename} - Không tìm thấy ngôn ngữ chính: ${ns}`;
  return repls.reduce((t, v, i) => t.replace(new RegExp(`%${i + 1}`, "g"), v), global.language[ns][key]);
};
//========= Load AppState =========//
let appStateFile, appState;
try {
  appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
  appState = require(appStateFile);
} catch {
  return logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error");
}
//========= Auto Clean Cache =========//
if (con.autoCleanCache.Enable) {
  const { CachePath: folderPath, AllowFileExtension } = con.autoCleanCache;
  const fileExts = AllowFileExtension.map(e => e.toLowerCase());
  fs.readdir(folderPath, (err, files) => {
    if (err) return console.error("Lỗi khi đọc thư mục:", err);
    files.filter(f => fileExts.includes(path.extname(f).toLowerCase()))
         .forEach(f => fs.unlink(path.join(folderPath, f), e =>
           e && logger(`Đã xoá file: ${f}`, "[Tự động dọn rác]", e)
         ));
    logger("Đã xoá các file jpg, mp4, gif, ttf, mp3", "[Tự động dọn rác]");
  });
} else {
  logger("Auto Clean Cache Đã Bị Tắt", "[Tự động dọn rác]");
}
//========= Login account and start Listen Event =========//
function onBot({ models: botModel }) {
  login({ appState }, (loginError, apiData) => {
    if (loginError) return logger(JSON.stringify(loginError), "ERROR");
    apiData.setOptions(global.config.FCAOption);
    writeFileSync(appStateFile, JSON.stringify(apiData.getAppState(), null, 2));
    global.client.api = apiData;
    global.config.version = "1.2.14";
    global.client.timeStart = Date.now();
    // Install dependency nếu thiếu
    const installDependency = (name, cmd) => {
      try {
        if (!global.nodemodule[name]) global.nodemodule[name] = require(name);
      } catch {
        logger.loader(global.getText("mirai", "notFoundPackage", name, name), "warn");
        execSync(cmd, { stdio: "inherit", cwd: __dirname });
        delete require.cache[require.resolve(name)];
        global.nodemodule[name] = require(name);
      }
    };
    // Apply env config
    const applyEnvConfig = mod => {
      if (!mod.config?.envConfig) return;
      const name = mod.config.name;
      global.configModule[name] ??= {};
      global.config[name] ??= {};
      for (const k in mod.config.envConfig) {
        global.configModule[name][k] ??= global.config[name][k] ?? mod.config.envConfig[k] ?? "";
        global.config[name][k] ??= mod.config.envConfig[k] ?? "";
      }
    };
    // Load command/event modules
    const loadFiles = (dir, { isCommand, disabledKey, filterDisabled, allowNoCategory }) => {
      const disabled = Array.isArray(global.config[disabledKey]) ? global.config[disabledKey] : [];
      readdirSync(dir).filter(f => f.endsWith(".js") && !(filterDisabled && disabled.includes(f)))
        .forEach(f => {
          try {
            const mod = require(join(dir, f));
            if (!mod.config || !mod.run || (!allowNoCategory && !mod.config.commandCategory))
              throw Error(global.getText("mirai", "errorFormat"));
            if ((isCommand ? global.client.commands : global.client.events).has(mod.config.name))
              throw Error(global.getText("mirai", "nameExist"));
            // Cài deps riêng cho module
            if (mod.config.dependencies) {
              for (const dep in mod.config.dependencies) {
                const ver = mod.config.dependencies[dep];
                const cmd = `npm install ${dep}${ver && ver !== "*" ? "@" + ver : ""} --no-package-lock`;
                installDependency(dep, cmd);
              }
            }
            applyEnvConfig(mod);
            if (mod.onLoad) mod.onLoad({ api: apiData, models: botModel });

            if (isCommand) {
              if (mod.handleEvent) global.client.eventRegistered.push(mod.config.name);
              global.client.commands.set(mod.config.name, mod);
            } else {
              global.client.events.set(mod.config.name, mod);
            }
          } catch (e) {
            logger(`Lỗi load module ${f}: ${e.message}`, "warn");
          }
        });
    };
    loadFiles(join(global.client.mainPath, "modules/commands"), { isCommand: true, disabledKey: "commandDisabled", filterDisabled: true });
    loadFiles(join(global.client.mainPath, "modules/events"), { isCommand: false, disabledKey: "eventDisabled", filterDisabled: true, allowNoCategory: true });

    writeFileSync(global.client.configPath, JSON.stringify(global.config, null, 2));
    if (existsSync(global.client.configPath + ".temp")) unlinkSync(global.client.configPath + ".temp");

    const listener = require("./includes/listen")({ api: apiData, models: botModel });
    global.handleListen = apiData.listenMqtt((err, msg) => {
      if (err) return logger(global.getText("mirai", "handleListenError", JSON.stringify(err)), "error");
      if (!["presence", "typ", "read_receipt"].includes(msg.type)) {
        if (global.config.DeveloperMode) console.log(msg);
        listener(msg);
      }
    });
  });
}
//========= Connecting to Database =========//
(async () => {
  try {
    await sequelize.authenticate();
    const models = require("./includes/database/model")({ Sequelize, sequelize });
    onBot({ models });
  } catch (error) {
    logger(`DB connect error: ${error.message}`, "error");
  }
})();