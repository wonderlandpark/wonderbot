module.exports.execute = (message, locale) => {
    // const config = require("./settings/config.json");
    // const prefix = (config.prefix)

    var flip = require('flip-text')

    if (!message.data.args) {
        return message.reply(locale.error.usage(this.props.name))
    }
    var txt = ''
    if (message.mentions.members.first()) {
        txt = message.guild.member(message.mentions.members.first().user)
            .displayName
    } else {
        txt = message.data.args
    }

    var txtfliped = flip(txt)
    message.reply(txtfliped)
}

module.exports.props = {
    name: 'flip',
    perms: 'general',
    alias: ['뒤집기'],
    args: [
        {
            name: 'user / text',
            type: 'usertext',
            required: true
        }
    ]
}
