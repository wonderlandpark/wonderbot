module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const us = message.mentions.members.first() || message.member
    var users = await knex('users').select('*')
    const stocks = await knex('stocks').select('*')
    users.sort(function(a, b) {
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
        return bm + Number(b.money) - (am + Number(a.money))
    })
    var server = (await knex.select('*').from('users')).filter(r =>
        message.guild.members.cache.get(r.id)
    )
    server = server.sort(function(a, b) {
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

        return bm + Number(b.money) - (am + Number(a.money))
    })
    let u = users.find(el => el.id === us.id)

    if (!u) return message.reply(locale.error.nouser)
    else {
        embed.addField(
            locale.commands.profile.profile.bind({ user: us.user.tag }),
            locale.commands.profile.wallet.bind({ money: Number(u['money']).num2han() })
        )
        embed.addField(
            locale.commands.profile.top,
            locale.commands.profile.topdesc.bind({
                all: users.findIndex(el => el.id === us.id) + 1,
                guild: server.findIndex(el => el.id === us.id) + 1
            }),
            true
        )
        embed.addField(
            locale.commands.profile.badge,
            JSON.parse(u.badges).length === 0
                ? '소유한 뱃지가 없습니다.'
                : JSON.parse(u.badges).map(e => {
                    if (e.startsWith('season'))
                        return (
                            tools.lib.emojis[e.split('-')[2]] +
                ' **' +
                e.split('-')[1].toUpperCase() +
                `**시즌 ${ranks[e.split('-')[2]]}위`
                        )
                    else
                        return (
                            tools.lib.emojis[e] + ' ' + locale.commands.profile.badgeName[e]
                        )
                })
        )
        embed.addField(
            locale.commands.profile.join,
            new Date(u['join'] * 1000).format(message.data.locale)
        )
        message.channel.send(embed)
    }
}

module.exports.props = {
    name: 'profile',
    perms: 'general',
    alias: ['프로필'],
    args: [
        {
            name: 'user',
            type: 'mention',
            required: false
        }
    ]
}

const ranks = {
    first: 1,
    second: 2,
    third: 3
}
