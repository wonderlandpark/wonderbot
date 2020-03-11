const Discord = require('discord.js');

module.exports = () => {
  const embed = new Discord.MessageEmbed()
  embed.setTimestamp(new Date());
  return embed;
};
