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
        message.guild.members.cache.get(message.data.arg[0])
    const reason = message.data.arg2
        ? message.data.arg2
        : locale.commands.warn.none
    const guild = (await knex('guilds').where({ id: message.guild.id }))[0]
    const limit = JSON.parse(guild.config).warncount
    const warndata = JSON.parse(guild.warn)
    if (reason.length > 50) return message.reply(locale.commands.warn.tooLong)
    if (!user) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    if (user.user.bot) return message.reply(locale.commands.warn.bot)
    if (user.hasPermission(['ADMINISTRATOR']))
        return message.reply(locale.commands.warn.alsoPerm)
    if (!warndata[user.id]) warndata[user.id] = { count: 1, reason: [reason] }
    else {
        warndata[user.id].count++
        warndata[user.id].reason.push(reason)
    }
    await knex('guilds')
        .update({ warn: JSON.stringify(warndata) })
        .where({ id: message.guild.id })

    embed.setTitle(locale.commands.warn.warn)
    embed.setColor('#FF5675')
    embed.addField(
        locale.commands.warn.mod,
        locale.commands.warn.modDesc.bind({
            mod: message.author,
            tag: message.author.tag
        })
    )
    embed.addField(
        locale.commands.warn.user,
        locale.commands.warn.userDesc.bind({ user: user.user, tag: user.user.tag })
    )
    embed.addField(
        locale.commands.warn.reason,
        locale.commands.warn.reasonDesc.bind({
            reason,
            count: warndata[user.id].count,
            limit
        })
    )
    await message.reply(embed)
    tools.bot.modlog(client, message.guild.id, embed)
    if (limit <= warndata[user.id].count) {
        await message.reply(locale.commands.ban.wait)
        try {
            await user.send(
                locale.commands.ban.notice.bind({
                    guild: message.guild.name,
                    reason: locale.commands.warn.auto,
                    mod: client.user.tag
                })
            )
        } catch { return }
        await user
            .ban(locale.commands.warn.auto)
            .then(async () => {
                var embed = tools.bot.customEmbed()
                warndata[user.id] = { count: 0, reason: [] }
                embed.setTitle(locale.commands.ban.Success)
                embed.setColor('#FF5675')
                embed.addField(
                    locale.commands.ban.mod,
                    locale.commands.ban.modDesc.bind({
                        mod: client.user,
                        tag: client.user.tag
                    })
                )
                embed.addField(
                    locale.commands.ban.user,
                    locale.commands.ban.userDesc.bind({
                        user: user.user,
                        tag: user.user.tag
                    })
                )
                embed.addField(
                    locale.commands.ban.reason,
                    locale.commands.ban.reasonDesc.bind({
                        reason: locale.commands.warn.auto
                    })
                )
                await knex('guilds')
                    .update({ warn: JSON.stringify(warndata) })
                    .where({ id: message.guild.id })
                message.reply(embed)
                tools.bot.modlog(client, message.guild.id, embed)
            })
            .catch(() => {
                message.reply(locale.commands.ban.error)
            })
    }
}

module.exports.props = {
    name: 'warn',
    perms: 'admin',
    alias: ['경고'],
    args: [
        {
            name: 'user/id',
            type: 'text',
            required: true
        },
        {
            name: 'reason',
            type: 'text',
            required: false
        }
    ]
}
