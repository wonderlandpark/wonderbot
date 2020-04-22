const QRCode = require('qrcode')
module.exports.execute = async (
    client,
    message,
    locale,
    embed
) => {
    if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    QRCode.toString(message.data.args, async function(err, url) {
        console.log(url.length)
        if (url.length > 1000) return await message.reply(locale.error.toLong)
        embed.addField('QRCODE', '```\n' + url + '\n```')
        return message.reply(embed)
    })
}
module.exports.props = {
    name: 'qr',
    perms: 'general',
    alias: ['qr코드'],
    args: [
        {
            name: 'text',
            type: 'text',
            required: true
        }
    ]
}
