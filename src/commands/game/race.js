const Race = require('./RaceManager')
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
    if (!message.data.args)
        return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    if(data.race[message.guild.id] && data.race[message.guild.id].destroyed) delete data.race[message.guild.id]
    switch(message.data.arg[0].toLowerCase()) {
    case '참가':
    case 'join':
        if(data.race[message.guild.id]) data.race[message.guild.id].join(message)
        else {
            if(isNaN(message.data.arg[1]) || !Number.isInteger(Number(message.data.arg[1]))) return message.reply('진행중인 게임이 존재하지 않습니다.\n`{prefix}경주 참가 [배팅금]`으로 새로운 게임을 만들어보세요!'.bind({ prefix: message.data.prefix }))
            if(message.data.arg[1] < 70 && Number(message.data.arg[1]) !== 0) return message.reply('70원 이상 또는 0원의 배팅금을 설정해야합니다!')
            const race = new Race(message, knex)
            if(!race) return message.reply('문제가 발생하였습니다. 다시 시도해주세요.')
            else {
                await race.join(message)
                if(race.members.size !== 0) data.race[message.guild.id] = race

            }
        }
        break

    case '나가기':
        if(data.race[message.guild.id]) return data.race[message.guild.id].leave(message)
        else {
            message.reply('진행중인 게임이 없습니다.\n`{prefix}경마 참가 [배팅금]`으로 새로운 게임을 시작하세요!'.bind({ prefix: message.data.prefix }))
        }
        break
        
    case '시작':
        if(data.race[message.guild.id]) return data.race[message.guild.id].play(message)
        else {
            message.reply('진행중인 게임이 없습니다.\n`{prefix}경마 참가 [배팅금]`으로 새로운 게임을 시작하세요!'.bind({ prefix: message.data.prefix }))
        }
        break

    case '폭파':
        if(data.race[message.guild.id]) return data.race[message.guild.id].destroy(message)
        else {
            message.reply('진행중인 게임이 없습니다.\n`{prefix}경마 참가 [배팅금]`으로 새로운 게임을 시작하세요!'.bind({ prefix: message.data.prefix }))
        }
        break
        
    default:
        message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    }
    
}
module.exports.props = {
    name: 'race',
    perms: 'general',
    alias: ['경주', '경마'],
    args:[{
        name: 'option',
        type: 'option',
        options: ['참가', '나가기', '시작', '폭파'],
        required: true
    }]
}