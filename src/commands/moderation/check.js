module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if (
        message.mentions.members.first() &&
        !message.member.hasPermission(['ADMINISTRATOR'])
    )
        return message.reply(locale.commands.check.noperm)
    const user = message.mentions.members.first() || message.member
    const g = (await knex('guilds').where({ id: message.guild.id }))[0]
    var warn = JSON.parse(g.warn)[user.id]
    if (!warn) warn = { count: 0, reason: [] }
    const limit = JSON.parse(g.config).warncount
    embed.setTitle(locale.commands.check.check)
    embed.setDescription(locale.commands.check.desc.bind({ user }))
    embed.addField(
        locale.commands.check.count,
        locale.commands.check.limit.bind({ count: warn.count, limit })
    )
    var i = 1
    warn.reason.forEach(el => {
        embed.addField(
            locale.commands.check.warn.bind({ count: i }),
            locale.commands.check.reason.bind({ reason: el })
        )
        i++
    })
    message.reply(embed)
}

module.exports.props = {
    name: 'check',
    perms: 'general',
    alias: ['경고확인', '확인', 'warncheck'],
    args: [
        {
            name: 'user',
            type: 'user',
            required: false
        }
    ]
}
