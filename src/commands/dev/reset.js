module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if(client.onlineMode) return message.reply('점검모드로만 시즌초기화를 진행하실 수 있습니다.')
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
        return (bm + Number(b.money) - b.loan_money) - (am + Number(a.money) - a.loan_money)
    })
    message.reply('RESETING SEASON')
    if(season !== 'FREE') {
        if(leaderboard[0]) { 
            const first = JSON.parse(leaderboard[0].badges)
            first.push(`season-${season}-first`)
            await knex('users')
                .update({ badges: JSON.stringify(first) })
                .where({ id: leaderboard[0].id })
        }

        if(leaderboard[1]) {
            const second = JSON.parse(leaderboard[1].badges)
            second.push(`season-${season}-second`)
            await knex('users')
                .update({ badges: JSON.stringify(second) })
                .where({ id: leaderboard[1].id })
        }

        if(leaderboard[2]) {
            const third = JSON.parse(leaderboard[2].badges)
            third.push(`season-${season}-third`)
            await knex('users')
                .update({ badges: JSON.stringify(third) })
                .where({ id: leaderboard[2].id })
        }
        await message.reply('BADGES ADDED')
    }
    await knex('users').update({
        money: 2000,
        items: '{"wondercoin":1}',
        cooldown: '{}',
        action: 0,
        lotto: '[]',
        loan_date: 0,
        loan_point: 0
    })
    await message.reply('RESETED money and items')
    const debt = await knex('users').whereNot({ loan_money: 0 })
    for(const d of debt) {
        let mail = JSON.parse(d.mails)
        let cooldown = JSON.parse(d.cooldown)
        mail.push({ read: false, date: Number(new Date()), content: '안녕하세요, 원더은행입니다.\n새로운 시즌과 함께, 고객님께서 상환하지 않으신 빚이 있어 보유한 아이템을 압류하였으며 신용등급은 하락하였습니다.\n다음에는 꼭 시즌 종료전에는 상환부탁드립니다.', send: 'bank@wonderbot.xyz' })
        cooldown.mail = 0
        await knex('users').update({ cooldown: JSON.stringify(cooldown), mails: JSON.stringify(mail), loan_lvl: d.loan_lvl-1 < 5 ? 5 : d.loan_lvl-1, loan_money: 0 }).where({ id: d.id })
    }
    await message.reply(`SENT MAIL FOR DEBTS (COUNT: ${debt.length})`)
    await knex('stocks').update({ prices: '1000', now: 1000, lastchange: 0 })
    message.reply('STOCK DATA RESET')
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
