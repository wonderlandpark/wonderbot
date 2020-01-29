Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

String.prototype.emojiID = function() {
  return this.replace(/<|>/gi, "").split(":")[2];
};

module.exports.weighted = require("./weighted");
