module.exports.execute = async (
    client,
    message,
    locale,
    __embed,
    tools,
    knex
) => {
    if(!message.data.args) return message.reply('**유저 퇴장 기능 설정하기**\n유저가 서버를 나갈 경우 메세지를 보내 알립니다!\n\n다음과 같은 단축어를 사용할 수 있습니다.\n`{유저}` - 입장한 유저 맨션\n`{서버}` - 해당 서버명\n`{채널}` - 메세지가 전송되는 채널\n`{유저수}` - 서버의 유저 수\n`{접두사}` - 설정된 원더봇의 접두사\n\n다음과 같이 설정가능합니다.\n```fix\n{prefix}퇴장 #채널 {유저}님이 {서버}를 나갔습니다. 남은 유저: {유저수}명```'.bind({ prefix: message.data.prefix}))
    
    const res = JSON.parse((await knex('guilds').where({ id: message.guild.id }))[0].config)

    if(['비활성화', '끄기', 'off', 'disable'].includes(message.data.arg[0])) {
        if(!res.bye) return message.reply('이미 비활성화되어있습니다!')
        res.bye = false

        message.reply('퇴장 기능이 비활성화되었습니다.\n언제든지 `{prefix}퇴장 활성화`로 활성화시킬 수 있습니다!'.bind({ prefix: message.data.prefix }))
    } else if(['활성화', '켜기', 'on', 'enable'].includes(message.data.arg[0])) {
        if(res.bye) return message.reply('이미 활성화되어있습니다!')
        if(!res.byeText || !res.byeChannel || !message.guild.channels.cache.get(res.byeChannel)) return message.reply('설정된 퇴장메세지가 없습니다.\n`{prefix}퇴장 #채널 [퇴장 메세지]`로 설정해주세요!'.bind({ prefix: message.data.prefix }))
        res.bye = true

        message.reply('퇴장 기능이 <#{channel}>에서 활성화되었습니다.\n언제든지 `{prefix}퇴장 비활성화`로 비활성화시킬 수 있습니다!'.bind({ channel: res.byeChannel, prefix: message.data.prefix }))
    } else if(message.mentions.channels && message.data.arg2) {
        if(message.data.arg2.length > 1500) return message.reply('1500자 이하로 설정해주세요!')
        res.bye = true
        res.byeText = message.data.arg2
        res.byeChannel = message.mentions.channels.first().id

        message.reply('퇴장 기능이 <#{channel}>에서 활성화되었습니다.\n언제든지 `{prefix}퇴장 비활성화`로 비활성화시킬 수 있습니다!'.bind({ channel: res.byeChannel, prefix: message.data.prefix }))

    } else if(['테스트', 'test'].includes(message.data.arg[0])) {
        if(!res.bye) return message.reply('비활성화 되어있습니다.')
        const channel = message.guild.channels.cache.get(res.byeChannel)
        if(!channel) return message.reply('채널이 존재하지 않습니다. 다시 설정해주세요.')
        return message.channel.send(`<#${res.byeChannel}>에 다음과 같이 전송됩니다.\n\n${res.byeText.bind({ user: message.member, userID: message.member.id, 유저: message.member, 유저아이디: message.member.id,
            유저수: message.member.guild.memberCount, memberCount: message.member.guild.memberCount,
            서버: message.member.guild.name, 길드: message.member.guild.name, 서버아이디: message.member.guild.id, 길드아이디: message.member.guild.id, guildID: message.member.guild.id,
            채널: `<#${res.byeChannel}>`, channel: `<#${res.byeChannel}>`, 접두사: message.data.prefix, prefix: message.data.prefix
        })}`, { allowedMentions: { parse: ['roles', 'users'] }})

    } else if(['초기화', 'init'].includes(message.data.arg[0])) {
        res.bye = false
        delete res.bye
        delete res.byeChannel
        delete res.byeText

        message.reply('OK')
    }
    else return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))

    await knex('guilds').update({ config: JSON.stringify(res) }).where({ id: message.guild.id })
    
}

module.exports.props = {
    name: 'welcome',
    perms: 'admin',
    alias: ['퇴장', '퇴장기능'],
    args: [
        {
            name: 'option',
            type: 'option',
            required: true,
            options: ['활성화', '비활성화', '테스트', '#채널']
        },
        {
            name: 'text',
            type: 'text',
            required: false
        }
    ]
}
