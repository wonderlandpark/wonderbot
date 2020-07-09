module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if (!message.data.arg[1]) {
        return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    }
    const res = find(message.data.arg[0])
    if (!res || res.length === 0) return message.reply(locale.error.search.nores)
    else if (res.length > 1)
        return message.reply(
            locale.error.search.many.bind({
                count: res.length,
                items: res.map(r => r.name + '\n').join('')
            })
        )
    if (!message.guild.me.hasPermission('ADD_REACTIONS')) {
        message.reply(
            locale.error.botperm.bind({ perms: locale.perm['ADD_REACTIONS'] })
        )
    }
    const user = (
        await knex('users')
            .select('*')
            .where({ id: message.author.id })
    )[0]
    const stock = (
        await knex('stocks')
            .select('*')
            .where({ name: res[0].id })
    )[0]
    var items = JSON.parse(user.items)
    var all = items[res[0].id] || 0
    var num = 0
    var mon = 0
    var total = 0
    if (['전부', '올인', '모두', 'all'].includes(message.data.arg[1])) {
        num = all
        total = num * stock.now
        mon = Number(user.money) + total
    } else if (['반인', '반', '절반', 'half'].includes(message.data.arg[1])) {
        num = Math.floor(all / 2)
        total = num * stock.now
        mon = Number(user.money) + total
    } else if (
        isNaN(Number(message.data.arg[1])) ||
    !Number.isInteger(Number(message.data.arg[1])) ||
    Number(message.data.arg[1]) < 1
    ) {
        return message.reply(locale.commands.sell.notvaild)
    } else {
        num = Number(message.data.arg[1])
        total = num * stock.now
        mon = Number(user.money) + total
    }
    if (num > all) return message.reply(locale.commands.sell.noitem)
    if (!items[res[0].id]) items[res[0].id] = num
    else items[res[0].id] -= num

    embed.addField(
        locale.commands.sell.bill,
        locale.commands.sell.ask.bind({
            item: res[0].name,
            count: num.formatIt(),
            total: total.formatIt()
        })
    )
    if(Number(user.money) !== 0 && total/10000000000000000000 > Number(user.money)) return message.reply(locale.error.more)

    var msg = message.channel.send(embed)
    await knex('users').update({ action: 1}).where({ id: message.author.id })
    const filter = (reaction, u) =>
        reaction.emoji.name === '💳' && u.id === message.author.id
    msg.then(async m => {
        m.react('💳')
        m.awaitReactions(filter, { max: 1, time: 10000, error: ['time'] }).then(
            async collected => {
                if (collected.size === 0) {
                    await knex('users').update({ action: 0}).where({ id: message.author.id })
                    return message.reply(locale.commands.sell.not)
                }
                await knex('users')
                    .update({ money: mon, items: JSON.stringify(items) })
                    .where({ id: message.author.id })
                embed = tools.bot.embed(client, message)
                embed.addField(
                    locale.commands.sell.finish,
                    locale.commands.sell.result.bind({
                        item: res[0].name,
                        count: num.formatIt(),
                        total: total.formatIt(),
                        money: mon.formatIt()
                    })
                )

                await knex('users').update({ action: 0}).where({ id: message.author.id })
                message.channel.send(embed)
            }
        )
    })
}

module.exports.props = {
    name: 'sell',
    perms: 'general',
    alias: ['판매', '판'],
    args: [
        {
            name: 'item',
            type: 'text',
            required: true
        },
        {
            name: 'count',
            type: 'number',
            required: true
        }
    ]
}

function find(str) {
    var s = [
        { id: 'wondercoin', name: '원더코인' },
        { id: 'gukbap', name: '국밥' },
        { id: 'diamond', name: '다이아몬드' },
        { id: 'coffee', name: '커피콩' },
        { id: 'figure', name: '피규어' }
    ]
    return s.filter(r => r.id.includes(str) || r.name.includes(str))
}
