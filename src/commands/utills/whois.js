const whois = require('whois')

module.exports.execute = async (
    client,
    message,
    locale
) => {
    if(!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    whois.lookup(message.data.arg[0], function(err, data) {
        if(err) return message.reply(err)
        message.channel.send(data.slice(0, 1900) + '\n...', { code: true })
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