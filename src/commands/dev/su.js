const commands = require('..')
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
    if (!message.mentions.members.first() || !message.data.arg[1])
        return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const CMD = commands[message.data.arg[1]]
    message.author = message.mentions.members.first().user
    const args = message.data.args.split(' ').slice(2).join(' ')
    const arg = message.data.args.split(' ').slice(2)
    const arg2 = message.data.args.split(' ').slice(3).join(' ')
    const cmd = message.data.arg[1]
    message.data.args = args
    message.data.arg = arg
    message.data.arg2 = arg2
    message.data.cmd = cmd
    message.data.premium = false
    message.data.premiumTime = new Date(0)

    await CMD.execute(
        client,
        message,
        locale,
        tools.bot.embed(client, message),
        tools,
        knex,
        CMD.props,
        data
    )
    
}

module.exports.props = {
    name: 'su',
    perms: 'dev',
    alias: ['명령어실행'],
    args: []
}
