const Canvas = require('canvas')
,Discord = require('discord.js')
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex,
    props
  ) => {
   embed.setTitle(locale.commands.serverinfo.serverinfo.bind({guild: message.guild.name}))
   embed.addField('ID', message.guild.id, true)
   embed.addField(locale.commands.serverinfo.region, locale.commands.serverinfo.regionList[message.guild.region], true)
   embed.addField(locale.commands.serverinfo.memberCount, locale.commands.serverinfo.memberDesc.bind({user: message.guild.memberCount}), true) 
   embed.addField(locale.commands.serverinfo.owner, message.guild.owner.user.tag, true)

   embed.addField(locale.commands.serverinfo.boost, locale.commands.serverinfo.boostDesc.bind({ count: message.guild.premiumSubscriptionCount, level: message.guild.premiumTier}))
   embed.addField(locale.commands.serverinfo.channel, locale.commands.serverinfo.channelDesc.bind({ text: message.guild.channels.cache.filter(r=> r.type === 'text').size, category: message.guild.channels.cache.filter(r=> r.type === 'category').size, voice: message.guild.channels.cache.filter(r=> r.type === 'voice').size}), true)
   embed.addField(locale.commands.serverinfo.verification, locale.commands.serverinfo.verificationLevel[message.guild.verificationLevel]) 
   embed.addField(locale.commands.serverinfo.filterName, locale.commands.serverinfo.filter[message.guild.explicitContentFilter])
   if(message.guild.iconURL()) embed.setThumbnail(message.guild.iconURL()) 

   else {
    embed.attachFiles(new Discord.MessageAttachment(createServerImg(message.guild.nameAcronym), 'attachment://icon.png'))      
    embed.setThumbnail('attachment://icon.png') 
}

   message.reply(embed)
}
  
  module.exports.props = {
    name: 'serverinfo',
    perms: 'general',
    alias: ['서버정보'],
    args: []
  }
  

function createServerImg(text){

    canvas = Canvas.createCanvas(200, 200)
    var context = canvas.getContext('2d');

    Canvas.registerFont('src/tools/fonts/NotoSans.ttf', { family: 'NotoSans' })

    context.beginPath();


    context.rect(0, 0, 200, 200);
    context.fillStyle = '#7289DA';

    context.fill();
    context.fillStyle = 'white';
    context.font = 'bold 80px NotoSans';
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, 100, 100, 200);

    return canvas.toBuffer()

}


