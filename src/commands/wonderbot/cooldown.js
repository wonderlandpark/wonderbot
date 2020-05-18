module.exports.execute = async (
    client,
    message,
    locale,
    embed
) => {
    embed.setTitle(locale.commands.cooldown.title)
    embed.setDescription(locale.commands.cooldown.desc)
    embed.addField(locale.commands.cooldown.benefit, locale.commands.cooldown.benefitDesc)
    message.reply(embed)
    
}
module.exports.props = {
    name: 'cooldown',
    perms: 'general',
    alias: ['쿨타임', 'cooltime', '쿨다운', '프리미엄'],
    args: []
}
  
