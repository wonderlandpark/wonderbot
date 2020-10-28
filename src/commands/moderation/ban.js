module.exports.execute = async (
    client,
    message,
    locale,
    __embed,
    tools
) => {
    let user
    const embed = tools.bot.customEmbed()

    if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    else {
        user =
            message.mentions.members.first() ||
            await message.guild.members.fetch(message.data.arg[0]).then(r=> r).catch(() => null)
    }
    if (!user) {
        const id = message.data.arg[0].match(/<@[!|](\d+)>/)
        let u
        console.log(id ? id[1] : message.data.arg[0])
        try {
            u = await client.users.fetch(id ? id[1] : message.data.arg[0])
        } catch(e) {
            console.error(e)
            return message.reply('올바르지 않은 유저 ID입니다.')
        }
        if(!u) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
        return await message.guild.members.ban(u.id, { reason: message.data.arg[1] || locale.commands.ban.none })
            .then(async () => {
                embed.setTitle(locale.commands.ban.Success)
                embed.setColor('#FF5675')
                embed.addField(
                    locale.commands.ban.mod,
                    locale.commands.ban.modDesc.bind({
                        mod: message.author,
                        tag: message.author.tag
                    })
                )
                embed.addField(
                    locale.commands.ban.user,
                    locale.commands.ban.userDesc.bind({
                        user: u,
                        tag: u.tag
                    })
                )
                embed.addField(
                    locale.commands.ban.reason,
                    locale.commands.ban.reasonDesc.bind({
                        reason: message.data.arg2
                            ? message.data.arg2
                            : locale.commands.ban.none
                    })
                )
                message.reply(embed)
                tools.bot.modlog(client, message.guild.id, embed)
            })
    }
    if (user.hasPermission(['BAN_MEMBERS']))
        return message.reply(locale.commands.ban.alsoPerm)
    await message.reply(locale.commands.ban.wait)
    try {
        await user.send(
            locale.commands.ban.notice.bind({
                guild: message.guild.name,
                reason: message.data.arg2
                    ? message.data.arg2
                    : locale.commands.ban.none,
                mod: message.author.tag
            })
        )
    } catch(e) { console.error(e) }
    await message.guild.members.ban(
        user.id,
        { reason: locale.commands.ban.why.bind({
            reason: message.data.arg2
                ? message.data.arg2
                : locale.commands.ban.none,
            by: message.author.tag
        }) }
    )
        .then(async () => {
            embed.setTitle(locale.commands.ban.Success)
            embed.setColor('#FF5675')
            embed.addField(
                locale.commands.ban.mod,
                locale.commands.ban.modDesc.bind({
                    mod: message.author,
                    tag: message.author.tag
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
                    reason: message.data.arg2
                        ? message.data.arg2
                        : locale.commands.ban.none
                })
            )
            message.reply(embed)
            tools.bot.modlog(client, message.guild.id, embed)
        })
        .catch(e => {
            console.log(e)
            message.reply(locale.commands.ban.error)
        })
}

module.exports.props = {
    name: 'ban',
    perms: 'ban',
    alias: ['밴', '치단', '벤'],
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
