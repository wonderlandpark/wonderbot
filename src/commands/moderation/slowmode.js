module.exports.execute = async (
    client,
    message,
    locale
) => {
    if(!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    if(isNaN(Number(message.data.arg[0])) || !(Number(message.data.arg[0]) >= 0) || !(Number(message.data.arg[0]) <= 21600) || !Number.isInteger(Number(message.data.arg[0]))) return message.reply(locale.commands.slowmode.error)
    message.channel.setRateLimitPerUser(Number(message.data.arg[0]))
        .then(()=> {return message.reply(locale.commands.slowmode.set.bind({ sec: message.data.arg[0] }))})
        .catch(() => message.reply(locale.commands.slowmode.catch))
}

module.exports.props = {
    name: 'slowmode',
    perms: 'admin',
    alias: ['슬로우모드'],
    args: [
        {
            name: 'seconds',
            type: 'number',
            required: true
        }
    ]
}
