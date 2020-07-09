module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const stocks = await knex('stocks').select('*')

    if (!['전체','전', 'ㅈ', '서버', 'ㅅ', '서','길드', 'global', 'guild', 'server'].includes(message.data.arg[0])) {
        message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    } else {
        message.guild.members.fetch()
        var leaderboard =
           ['전체', '전', 'ㅈ', 'global'].includes( message.data.arg[0])
               ? await knex.select('*').from('users')
               : (await knex.select('*').from('users')).filter(r =>
                   message.guild.members.cache.get(r.id)
               )
        var txt = ''
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
            return bm + Number(b.money) - (am + Number(a.money))
        })

        for (var i = 1; i < 11; i++) {
            var m = 0
            if (leaderboard[i - 1]) {
                Object.keys(JSON.parse(leaderboard[i - 1].items)).forEach(el => {
                    m +=
                        stocks.find(i => i.name === el).now *
                        JSON.parse(leaderboard[i - 1].items)[el]
                })
                let userData = await client.users.fetch(leaderboard[i - 1].id, false)
                txt +=
                    `\n${i}. [${
                        userData
                            ? userData.username +
                        '#' +
                        userData.discriminator.replace(/..$/, '**')
                            : 'None'
                    }](${locale.commands.leaderboard.all} ` +
                    (m + Number(leaderboard[i - 1].money)).formatIt() +
                    locale.commands.money.won +
                    ')'
            }
        }
        message.channel.send(
            '```md\n' +
            locale.commands.leaderboard.leaderboard.bind({
                season: require('../../config').client.bot.season
            }) +
            `\n${
                message.data.arg[0] === '전체' || message.data.arg[0] === 'global'
                    ? locale.commands.leaderboard.global
                    : locale.commands.leaderboard.guild.bind({
                        server: message.guild.name
                    })
            }\n ` +
            txt +
            '```'
        )
    }
}

module.exports.props = {
    name: 'leaderboard',
    perms: 'general',
    alias: ['리더보드', '랭킹', '순위', '리', 'ㄹ'],
    args: [
        {
            name: 'option',
            type: 'text',
            required: false,
            options: ['전체', '서버']
        }
    ]
}
