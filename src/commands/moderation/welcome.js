module.exports.execute = async (
    client,
    message,
    locale,
    __embed,
    tools,
    knex
) => {
    if(!message.data.args) return message.reply('**유저 환영 기능 설정하기**\n새로운 유저가 서버에 들어올 경우 메세지를 보내 환영합니다!\n\n다음과 같은 단축어를 사용할 수 있습니다.\n`{유저}` - 입장한 유저 맨션\n`{서버}` - 해당 서버명\n`{채널}` - 메세지가 전송되는 채널\n`{유저수}` - 서버의 유저 수\n`{접두사}` - 설정된 원더봇의 접두사\n\n다음과 같이 설정가능합니다.\n```fix\n{prefix}환영 #채널 {유저}님, {서버}에 오신 것을 환영합니다! {유저수}번째 유저입니다!!!```'.bind({ prefix: message.data.prefix}))
    
    const res = JSON.parse((await knex('guilds').where({ id: message.guild.id }))[0].config)

    if(['비활성화', '끄기', 'off', 'disable'].includes(message.data.arg[0])) {
        if(!res.welcome) return message.reply('이미 비활성화되어있습니다!')
        res.welcome = false

        message.reply('환영 기능이 비활성화되었습니다.\n언제든지 `{prefix}환영 활성화`로 활성화시킬 수 있습니다!'.bind({ prefix: message.data.prefix }))
    } else if(['활성화', '켜기', 'on', 'enable'].includes(message.data.arg[0])) {
        if(res.welcome) return message.reply('이미 활성화되어있습니다!')
        if(!res.welcomeText || !res.welcomeChannel || !message.guild.channels.cache.get(res.welcomeChannel)) return message.reply('설정된 환영메세지가 없습니다.\n`{prefix}환영 #채널 [환영 메세지]`로 설정해주세요!'.bind({ prefix: message.data.prefix }))
        res.welcome = true

        message.reply('환영 기능이 <#{channel}>에서 활성화되었습니다.\n언제든지 `{prefix}환영 비활성화`로 비활성화시킬 수 있습니다!'.bind({ channel: res.welcomeChannel, prefix: message.data.prefix }))
    } else if(message.mentions.channels && message.data.arg2) {
        res.welcome = true
        res.welcomeText = message.data.arg2
        res.welcomeChannel = message.mentions.channels.first().id

        message.reply('환영 기능이 <#{channel}>에서 활성화되었습니다.\n언제든지 `{prefix}환영 비활성화`로 비활성화시킬 수 있습니다!'.bind({ channel: res.welcomeChannel, prefix: message.data.prefix }))

    } else if(['초기화', 'init'].includes(message.data.arg[0])) {
        res.welcome = false
        delete res.welcome
        delete res.welcomeChannel
        delete res.welcomeText

        message.reply('OK')
    }
    else return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))

    await knex('guilds').update({ config: JSON.stringify(res) }).where({ id: message.guild.id })
    
}

module.exports.props = {
    name: 'welcome',
    perms: 'admin',
    alias: ['환영', '환영기능'],
    args: [
        {
            name: 'option',
            type: 'option',
            required: true,
            options: ['활성화', '비활성화', '#채널']
        },
        {
            name: 'text',
            type: 'text',
            required: false
        }
    ]
}
