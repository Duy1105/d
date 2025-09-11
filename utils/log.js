const chalk = require("chalk");

const randColor = () =>
  "#" + Array.from({ length: 3 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");

const log = (prefix, data, c1, c2 = c1) =>
  console.log(chalk.bold.hex(c1)(prefix) + chalk.bold.hex(c2)(data));

module.exports = (data, option) => {
  if (["warn", "error"].includes(option)) return log("» Lỗi « ", data, "#ff0000");
  log(`${option} ➟ `, data, randColor());
};

module.exports.loader = (data, option) => {
  const prefix = "[ Duy ] > ";
  switch (option) {
    case "warn": return log(prefix, data, randColor(), "#8B8878");
    case "error": return log(prefix, data, randColor());
    default: return log(prefix, data, randColor(), randColor());
  }
};
