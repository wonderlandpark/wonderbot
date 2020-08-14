const tier = [ 'VIP', '플레티넘', '골드', '실버', '브론즈' ]

module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const stocks = await knex('stocks').select('*')

    var user = (await knex('users').where({ id: message.author.id }))[0]
    embed.addField(
        locale.commands.wallet.wallet.bind({ user: message.author.tag }),
        locale.commands.wallet.what
    )
    var money = 0
    Object.keys(JSON.parse(user.items)).forEach(el => {
        money += stocks.find(i => i.name === el).now * JSON.parse(user.items)[el]
    })
    var items = ''
    Object.keys(JSON.parse(user.items)).forEach(el => {
        if (JSON.parse(user.items)[el] !== 0)
            items +=
        '\n' +
        locale.commands.wallet.items[el] +
        ': ' +
        JSON.parse(user.items)[el].formatIt() +
        ' 개'
    })

    embed.addField(
        locale.commands.wallet.will,
        locale.commands.wallet.money.bind({ money: (money + Number(user.money)).formatIt() })
    )
    embed.addField('빚', locale.commands.wallet.money.bind({ money: Number(user.loan_money).formatIt() }), true)
    embed.addField('신용등급', `**${tier[user.loan_lvl-1]}**(${user.loan_lvl}등급)입니다.`)
    embed.addField(
        locale.commands.wallet.item,
        items.length === 0 ? locale.commands.wallet.noitem : items.replace('\n', '')
    )
    message.channel.send(embed)
}

module.exports.props = {
    name: 'wallet',
    perms: 'general',
    alias: ['지갑'],
    args: [{}]
}
