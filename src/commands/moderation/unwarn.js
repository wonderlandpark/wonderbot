module.exports.execute = async (
    client,
    message,
    locale,
    __embed,
    tools,
    knex,
    props
) => {
    var warns = tools.bot.customEmbed()
    var embed = tools.bot.customEmbed()

    if (!message.data.args) return message.reply(locale.error.usage(props.name))
    const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(message.data.arg[0])
    const guild = (await knex('guilds').where({ id: message.guild.id }))[0]
    const warndata = JSON.parse(guild.warn)
    if (!user) return message.reply(locale.error.usage(props.name))
    if (user.user.bot) return message.reply(locale.commands.unwarn.bot)
    if (user.hasPermission(['ADMINISTRATOR']))
        return message.reply(locale.commands.unwarn.alsoPerm)
    if (!warndata[user.id] || warndata[user.id].count < 1)
        return message.reply(locale.commands.unwarn.noWarn)
    else {
        var data = warndata[user.id]
        console.log(data.reason)
        for (let i = 0; i < data.reason.length; i++) {
            warns.addField(`${locale.commands.unwarn.warn}#${i + 1}`, data.reason[i])
        }
        await message.reply({
            content: locale.commands.unwarn.select,
            embed: warns
        })
        const filter = m => m.author.id === message.author.id
        console.log(data)
        await message.channel
            .awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
            .then(async collected => {
                const res = data.reason[Number(collected.first().content) - 1]
                if (!res) return message.reply(locale.commands.unwarn.wrongnum)
                else {
                    data.count--
                    data.reason.splice(Number(collected.first().content) - 1, 1)
                    warndata[user.id] = data
                    await knex('guilds')
                        .update({ warn: JSON.stringify(warndata) })
                        .where({ id: message.guild.id })

                    embed.setTitle(locale.commands.unwarn.unwarn)
                    embed.setColor('#FF5675')
                    embed.addField(
                        locale.commands.unwarn.mod,
                        locale.commands.unwarn.modDesc.bind({
                            mod: message.author,
                            tag: message.author.tag
                        })
                    )
                    embed.addField(
                        locale.commands.unwarn.user,
                        locale.commands.unwarn.userDesc.bind({
                            user: user.user,
                            tag: user.user.tag
                        })
                    )
                    embed.addField(
                        locale.commands.unwarn.reason,
                        locale.commands.unwarn.cleared.bind({ why: res })
                    )
                    await message.reply(embed)
                    tools.bot.modlog(client, message.guild.id, embed)
                }
            })
            .catch(collected => {
                console.log(collected)
                message.reply(locale.commands.unwarn.cancel)
            })
    }
}

module.exports.props = {
    name: 'unwarn',
    perms: 'admin',
    alias: ['경고취소', 'rmwarn'],
    args: [
        {
            name: 'user/id',
            type: 'text',
            required: true
        }
    ]
}
