const Discord = require('discord.js');

module.exports = () => {
  const embed = new Discord.RichEmbed();
  embed.setTimestamp(new Date());
  return embed;
};
