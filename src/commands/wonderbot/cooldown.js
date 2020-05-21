module.exports.execute = async (
    client,
    message,
    locale,
    embed
) => {
    embed.setTitle(locale.commands.cooldown.title)
    embed.setDescription(locale.commands.cooldown.desc)
    embed.addField(locale.commands.cooldown.benefit, locale.commands.cooldown.benefitDesc.bind({ plan: message.data.premium ? locale.commands.cooldown.ends.bind({ date: message.data.premiumTime.format(message.data.locale), at: message.data.premiumTime.fromNow(message.data.locale)}) : locale.commands.cooldown.not}))
    message.reply(embed)
    
}
module.exports.props = {
    name: 'cooldown',
    perms: 'general',
    alias: ['쿨타임', 'cooltime', '쿨다운', '프리미엄'],
    args: []
}
  
