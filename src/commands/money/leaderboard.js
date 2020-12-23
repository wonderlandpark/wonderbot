module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex,
    props,
    data
) => {
    const stocks = await knex('stocks').select('*')

    if (!['전체','전', 'ㅈ', '서버', 'ㅅ', '서','길드', 'global', 'guild', 'server'].includes(message.data.arg[0])) {
        message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    } else {
        if(new Date() - data.leaderboard.updated < 60000 && ['전체', '전', 'ㅈ', 'global'].includes(message.data.arg[0])) return message.channel.send(
            '```md\n' +
            locale.commands.leaderboard.leaderboard.bind({
                season: require('../../config').client.bot.season
            }) +
            `\n${
                ['전체', '전', 'ㅈ', 'global'].includes( message.data.arg[0])
                    ? locale.commands.leaderboard.global
                    : locale.commands.leaderboard.guild.bind({
                        server: message.guild.name
                    })
            }\n ` +
            (data.leaderboard.txt) +
            '```'
        )
        message.guild.members.fetch()
        var leaderboard =
           ['전체', '전', 'ㅈ', 'global'].includes(message.data.arg[0])
               ? await knex.select('*').from('users')
               : (await knex.select('*').from('users')).filter(r => message.guild.members.cache.get(r.id))
        let server = ''
        let txt = ''
        if(['전체', '전', 'ㅈ', 'global'].includes(message.data.arg[0])) {
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

            for (let i = 1; i < 16; i++) {
                let m = 0
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
                    (numberToKorean(m + Number(leaderboard[i - 1].money))||0) + locale.commands.money.won + (leaderboard[i - 1].loan_money !== 0 ? ' - 빚 ' + numberToKorean(leaderboard[i - 1].loan_money) + locale.commands.money.won : '')
                    + ')'
                }
            }
            data.leaderboard = { updated: new Date(), txt }
        } else if(['서버', 'ㅅ', '서','길드', 'global', 'guild', 'server'].includes(message.data.arg[0])) {
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

            for (let i = 1; i < 16; i++) {
                let m = 0
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
                    (numberToKorean(m + Number(leaderboard[i - 1].money))||0) + locale.commands.money.won + (leaderboard[i - 1].loan_money !== 0 ? ' - 빚 ' + numberToKorean(leaderboard[i - 1].loan_money) + locale.commands.money.won : '')
                    + ')'
                }
            }

            server = txt
        }
        
        message.channel.send(
            '```md\n' +
            locale.commands.leaderboard.leaderboard.bind({
                season: require('../../config').client.bot.season
            }) +
            `\n${
                ['전체', '전', 'ㅈ', 'global'].includes( message.data.arg[0])
                    ? locale.commands.leaderboard.global
                    : locale.commands.leaderboard.guild.bind({
                        server: message.guild.name
                    })
            }\n ` +
            (server || data.leaderboard.txt) +
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


function numberToKorean(number){
    var inputNumber  = number < 0 ? false : number
    var unitWords    = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극']
    var splitUnit    = 10000
    var splitCount   = unitWords.length
    var resultArray  = []
    var resultString = ''

    for (var i = 0; i < splitCount; i++){
        var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i)
        unitResult = Math.floor(unitResult)
        if (unitResult > 0){
            resultArray[i] = unitResult
        }
    }

    for (var a = 0; a < resultArray.length; a++){
        if(!resultArray[a]) continue
        resultString = String(resultArray[a]) + unitWords[a] + ' ' + resultString
    }

    return resultString.replace(/ $/, '')
}
