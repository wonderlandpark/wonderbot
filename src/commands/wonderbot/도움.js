const Base = require('./help')

module.exports.execute = async (
    client,
    message,
    locale,
    embed
) => {
    Base.execute(client, message, locale, embed)
}

module.exports.props = {
    name: '도움',
    perms: 'general',
    alias: ['도움', '도움말', '명령어'],
    args: [
        {
            name: 'cmd',
            type: 'text',
            required: false
        }
    ]
}