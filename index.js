/*
Better Discord. Wonder_Bot

Author(s) : wonderlandpark

(C) Team. Wonder. All rights reserved.
*/

const tools = require("./tools");
tools.database
  .select("*")
  .from("users")
  .then(r => console.log(r));
const logger = tools.logger;
const config = require("./config");
const Bot = tools.bot.init;
logger.log("Starting Up...", "Cyan", true);
process.title = `Wonder_Bot - Ver. ${require("./package.json").version}, ${
  process.platform
}-${process.arch}`;

// Handlers
process.on("unhandledRejection", reason => {
  logger.error(reason);
});
process.on("uncaughtException", err => {
  logger.error(err.stack);
});
process.on("warning", err => {
  logger.warn(err.stack);
});
process.on("exit", () => {
  logger.WBerror(`Process has been Destroyed`);
  logger.log("Bye", "Cyan");
  console.log("\x1b[0m");
});

// Init
const WB = new Bot(config, (devMode = false));

// Protype

String.prototype.bind = function(parameters) {
  let text = this;
  const keys = text.match(/\{(.*?)\}/g);
  if (!keys) return this;

  keys.forEach(key => {
    const keyname = key.replace(/\{/, "").replace(/\}/, "");
    text = text.replace(key, String(parameters[keyname]) || "");
  });

  return text;
};

global.usage = function(cmd) {
  var text = "";
  var desc = "";
  var args = require("./commands/index.js")[cmd].props.args;
  args.forEach(a => {
    if (a.required) {
      text += `[${a.name}] `;
      desc += `[${a.name} - ${a.type}]`;
    } else {
      text += `(${a.name})`;
      desc += `(${a.name} - ${a.type})`;
    }
  });

  let arg = "";

  text = text.replace(key, String(parameters[keyname]) || "");

  return text;
};
