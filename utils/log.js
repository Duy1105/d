const chalk = require("chalk");

function randomColor() {
  let color = "";
  for (let i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
  }
  return `#${color}`;
}

function logMessage(prefix, data, color1, color2 = color1) {
  console.log(
    chalk.bold.hex(color1).bold(prefix) + chalk.bold.hex(color2).bold(data),
  );
}

module.exports = (data, option) => {
  switch (option) {
    case "warn":
    case "error":
      logMessage("» Lỗi « ", data, "#ff0000");
      break;
    default:
      logMessage(`${option} ➟ `, data, randomColor());
      break;
  }
};

module.exports.loader = (data, option) => {
  const prefix = "[ Duy ] > ";
  switch (option) {
    case "warn":
      logMessage(prefix, data, randomColor(), "#8B8878");
      break;
    case "error":
      logMessage(prefix, data, randomColor());
      break;
    default:
      logMessage(prefix, data, randomColor(), randomColor());
      break;
  }
};
