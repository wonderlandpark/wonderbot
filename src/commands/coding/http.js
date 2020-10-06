const http = require('http')
const codes = Object.keys(http.STATUS_CODES).map(r=> { return { code: r, desc: http.STATUS_CODES[r] } })
module.exports.execute = async (
    client,
    message,
    locale,
    embed
) => {
    const res = codes.find(
        r =>
            r.code.startsWith(message.data.arg[0]) ||
      r.desc.toLowerCase().includes(message.data.args.toLowerCase())
    )
    if (!res) return message.reply('`NORES`')
    else {
        embed.setTitle(res.code)
        embed.setDescription(res.desc)
        message.reply(embed)
    }
}

module.exports.props = {
    name: 'http',
    perms: 'general',
    alias: ['상태코드', 'statuscode'],
    args: []
}
