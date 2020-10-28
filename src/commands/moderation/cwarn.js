module.exports.execute = async (
    client,
    message,
    locale,
    __embed,
    tools,
    knex
) => {
    var embed = tools.bot.customEmbed()

    if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const user =
    message.mentions.members.first() ||
    await message.guild.members.fetch(message.data.arg[0]).then(r=> r).catch(() => null)
    const guild = (await knex('guilds').where({ id: message.guild.id }))[0]
    const warndata = JSON.parse(guild.warn)
    if (!user) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    if (user.user.bot) return message.reply(locale.commands.cwarn.bot)
    if (user.hasPermission(['ADMINISTRATOR']))
        return message.reply(locale.commands.cwarn.alsoPerm)
    if (!warndata[user.id] || warndata[user.id].count === 0)
        return message.reply(locale.commands.cwarn.noWarn)
    else {
        warndata[user.id] = { count: 0, reason: [] }
    }
    await knex('guilds')
        .update({ warn: JSON.stringify(warndata) })
        .where({ id: message.guild.id })

    embed.setTitle(locale.commands.cwarn.cwarn)
    embed.setColor('#FF5675')
    embed.addField(
        locale.commands.cwarn.mod,
        locale.commands.cwarn.modDesc.bind({
            mod: message.author,
            tag: message.author.tag
        })
    )
    embed.addField(
        locale.commands.cwarn.user,
        locale.commands.cwarn.userDesc.bind({ user: user.user, tag: user.user.tag })
    )
    embed.addField(locale.commands.cwarn.reason, locale.commands.cwarn.cleared)
    await message.reply(embed)
    tools.bot.modlog(client, message.guild.id, embed)
}

module.exports.props = {
    name: 'cwarn',
    perms: 'admin',
    alias: ['경고초기화', 'warnclear', 'clearwarn'],
    args: [
        {
            name: 'user/id',
            type: 'text',
            required: true
        }
    ]
}
