module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const stocks = await knex('stocks').select('*')
    const season = message.data.arg[0].toUpperCase()

    var leaderboard = await knex.select('*').from('users')

    leaderboard.sort(function (a, b) {
        var bm = 0
        var am = 0
        Object.keys(JSON.parse(b.items)).forEach(el => {
            bm += stocks.find(i => i.name === el).now * JSON.parse(b.items)[el]
        })
        Object.keys(JSON.parse(a.items)).forEach(el => {
            am += stocks.find(i => i.name === el).now * JSON.parse(a.items)[el]
        })
        if (Number.isNaN(am)) am = 0
        if (Number.isNaN(bm)) bm = 0
        return (bm + Number(b.money)) - (am + Number(a.money))
    })
    let m = await message.reply('RESETING SEASON')
    if(season !== 'FREE') {
    const first = JSON.parse(leaderboard[0].badges)
    first.push(`season-${season}-first`)
    await knex('users')
    .update({ badges: JSON.stringify(first) })
    .where({ id: leaderboard[0].id })
    const second = JSON.parse(leaderboard[1].badges)
    second.push(`season-${season}-second`)
    await knex('users')
        .update({ badges: JSON.stringify(second) })
        .where({ id: leaderboard[1].id })
    const third = JSON.parse(leaderboard[2].badges)
    third.push(`season-${season}-third`)
    await knex('users')
        .update({ badges: JSON.stringify(third) })
        .where({ id: leaderboard[2].id })
    await m.edit(m.content + '\nBADGES ADDED')
    }
    await knex('users').update({
        money: 0,
        items: '{"wondercoin":1}',
        money_cooldown: 0,
        cooldown: '{}',
        action: 0,
        lotto: '[]'
    })
    m.edit(m.content + '\nRESETED MONEY and ITEMS and COOLDOWNS and LOTTO')
    await knex('stocks').update({ prices: '100', now: 100, lastchange: 0 })
    m.edit(m.content + '\nRESETED MONEY and ITEMS\nSTOCK DATA RESET')
}

module.exports.props = {
    name: 'reset',
    perms: 'dev',
    alias: ['시즌초기화'],
    args: [
        {
            name: 'season',
            type: 'text',
            required: true
        }
    ]
}
