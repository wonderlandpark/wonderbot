const Discord = require("discord.js");

const config = require("../../config");

module.exports = (client, message) => {
  const embed = new Discord.RichEmbed();
  embed.setAuthor(client.user.username, client.user.avatarURL);
  embed.setFooter(`${message.author.tag}`, message.author.avatarURL);
  embed.setTimestamp(new Date());
  embed.setColor(message.guild.me.displayColor);
  return embed;
};
