const commands = require('../index')
module.exports.execute = async (client, message, locale, embed) => {
    if (!message.data.args) {
        embed.setTitle(locale.commands.help.help)
        embed.setDescription(locale.commands.help.desc)
        Object.keys(commands.categorys).forEach(cat => {
            embed.addField(cat.toUpperCase(), cmdFormat(commands.categorys[cat]))
        })
        embed.addField(
            locale.commands.help.more,
            locale.commands.help.moreDesc.bind({ prefix: message.data.prefix })
        )
        embed.addField(locale.commands.help.support, locale.commands.help.links)
        return message.channel.send(embed)
    } else {
        const cmd = commands[message.data.arg[0]]
        if (!cmd) return message.reply(locale.commands.help.noCommand)
        embed.setTitle(
            '> ' +
        locale.commands.help.commandInfo.bind({
            cmd: cmd.props.name.toUpperCase()
        })
        )
        embed.addField(
            locale.commands.help.description,
            '```fix\n' + cmd.props.desc + '```')
        embed.addField(
            locale.commands.help.usage,
            locale.error.usage(cmd.props.name, message.data.prefix)
        )
        embed.addField(
            locale.commands.help.other,
            '`' + cmd.props.alias.join('`, `') + '`'
        )
        embed.addField(
            locale.commands.help.docs,
            cmd.props.docs ? cmd.props.docs : locale.commands.help.nodoc
        )
        message.reply(embed)
    }
}

module.exports.props = {
    name: 'help',
    perms: 'general',
    alias: ['도움', 'commands', '도움말', '명령어'],
    args: [
        {
            name: 'cmd',
            type: 'text',
            required: false
        }
    ]
}

function cmdFormat(cmds) {
    var array = []
    Object.values(cmds).forEach(c => array.push(c.props.alias[0]))
    return '`' + array.join('`, `') + '`'
}
