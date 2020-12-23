/* eslint-disable no-unreachable */
const whois = require('whois')

module.exports.execute = async (
    client,
    message,
    locale
) => {
    return message.reply('해당 기능은 비활성화 되었습니다.')
    if(!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    whois.lookup(message.data.arg[0], function(err, data) {
        if(err) return message.reply('결과가 없습니다.')
        message.channel.send((data || '정보가 없습니다.').slice(0, 1900) + '\n...', { code: true })
    })
}

module.exports.props = {
    name: 'whois',
    perms: 'general',
    alias: ['domain', '도메인', '후이즈'],
    args: [
        {
            name: 'domain',
            type: 'text',
            required: true
        }
    ]
}