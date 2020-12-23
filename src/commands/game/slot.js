const num = 15
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if (!message.data.args || isNaN(message.data.arg[0]) || !Number.isInteger(Number(message.data.arg[0])))
        return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    if (!message.guild.me.hasPermission('ADD_REACTIONS')) {
        message.reply(
            locale.error.botperm.bind({ perms: locale.perm['ADD_REACTIONS'] })
        )
    }
    const user = (
        await knex
            .select('*')
            .from('users')
            .where({ id: message.author.id })
    )[0]
    const m = Number(user.money)
    const cooldown = JSON.parse(user.cooldown) || {slot: 0}
    if (
        cooldown.slot * 1000 + 120000 > Number(new Date())
    )
        return message.reply(
            locale.commands.slot.cooldown.bind({
                time:  (
                    (
                        cooldown.slot * 1000 +
              120000 -
              Number(new Date())
                    ) / 1000
                ).toFixed(1)
            })
        )
    if (Number(message.data.arg[0]) < 100)
        return message.reply(locale.commands.slot.morethan)
    if(m/10000000000000000000 > message.data.arg[0]) return message.reply(locale.error.more)
    if (m < Number(message.data.arg[0]))
        return message.reply(locale.commands.slot.nomoney)
    const s = slot()
    var msg = message.reply(
        locale.commands.slot.ready.bind({ money: message.data.arg[0] })
    )
    const filter = (reaction, user) =>
        reaction.emoji.name === '🎰' && user.id === message.author.id
    await knex('users').update({ action: 1}).where({ id: message.author.id })
    msg.then(async ms => {
        ms.react('🎰')
        ms.awaitReactions(filter, { max: 1, time: 10000, error: ['time'] }).then(
            async collected => {
                if (collected.size === 0) {
                    await knex('users').update({ action: 0}).where({ id: message.author.id })
                    return message.reply(locale.commands.allin.not)
                }
                cooldown.slot = Math.round(Number(new Date())/1000)
                await knex('users').update({ cooldown: JSON.stringify(cooldown) }).where({ id: message.author.id })

                await message.reply(
                    locale.commands.slot.payed.bind({ money: message.data.arg[0] })
                )
                var mm = message.channel.send(
                    emoji[s.slot[0]] + emoji[s.slot[1]] + emoji[s.slot[2]]
                )
                mm.then(async gg => {
                    const reward = (
                        s.multi * Number(message.data.arg[0]) -
            Number(message.data.arg[0])
                    ).toFixed(0)
                    await setTimeout(async function() {
                        embed.addField(
                            '손익',
                            locale.commands.slot.res.bind({
                                plus: (s.multi * Number(message.data.arg[0])).toFixed(0),
                                bet: message.data.arg[0],
                                money:
                  reward < 0
                      ? reward * -1 + tools.lib.emojis.coin + ' 손해'
                      : reward + ' ' + tools.lib.emojis.coin + ' 이득'
                            })
                        )
                        embed.addField('잔고', (m + Number(reward)).formatIt() + tools.lib.emojis.coin)
                        await knex('users').update({ action: 0}).where({ id: message.author.id })
                        message
                            .reply(embed)

                        gg.edit(
                            gg.content
                                .replace(emoji[s.slot[0]], static[s.slot[0]])
                                .replace(emoji[s.slot[1]], static[s.slot[1]])
                                .replace(emoji[s.slot[2]], static[s.slot[2]])
                        )
                    }, 5000)

                    await knex
                        .update({ money: (m + Number(reward)) })
                        .from('users')
                        .where({ id: message.author.id })
                })
            }
        )
            .catch(async(e)=>{
                console.log(e)
                await knex('users').update({ action: 0}).where({ id: message.author.id })
                return message.reply(locale.commands.allin.not)
            })
    })

    function slot() {
        var a = tools.weighted(percent)
        var b = tools.weighted(percent)
        var c = tools.weighted(percent)
        if (a === b && b === c) multi = 1 / (num * percent[a] ** 3)
        else if (a === b) multi = 1 / (num * percent[a] ** 2)
        else if (b === c) multi = 1 / (num * percent[b] ** 2)
        else if (c === a) multi = 1 / (num * percent[c] ** 2)
        else {
            var multi = 0
        }

        return { slot: [a, b, c], multi: multi }
    }
}
module.exports.props = {
    name: 'slot',
    perms: 'general',
    alias: ['슬롯머신', '슬롯'],
    args: [
        {
            name: 'money',
            type: 'number',
            required: true
        }
    ]
}

const percent = {
    wonderbot: 0.03,
    seven: 0.05,
    gem: 0.10,
    star: 0.08,
    money: 0.15,
    melon: 0.26,
    pear: 0.45
}
const emoji = {
    wonderbot: '<a:slot:666617809849155608>',
    seven: '<a:slot:666617811061178388>',
    melon: '<a:slot:666617811883393024>',
    money: '<a:slot:666617810704793611>',
    star: '<a:slot:666617810792742930>',
    gem: '<a:slot:666619127611523083>',
    pear: '<a:slot:666617810033573888>'
}

const static = {
    wonderbot: '<:wonder:666837741329448960>',
    seven: '<:seven:666837898645209098>',
    melon: '<:melon:666837649536843776>',
    money: '<:money:666838282956570635>',
    star: '<:star:666837819423064085>',
    gem: '<:gem:666837459052658690>',
    pear: '<:pear:666838052081238036>'
}
