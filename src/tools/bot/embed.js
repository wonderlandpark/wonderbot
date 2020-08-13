const Discord = require('discord.js')

module.exports = (client, message) => {
    const embed = new Discord.MessageEmbed()
    embed.setFooter(`${message.author.tag}`, message.author.avatarURL())
    embed.setTimestamp(new Date())
    embed.setColor(message.guild ? message.guild.me.displayColor : '#93bfe6')
    return embed
}
