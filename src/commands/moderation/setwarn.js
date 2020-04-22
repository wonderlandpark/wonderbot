const fs = require('fs')
const Discord = require('discord.js')
const config = require('../../config')
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const webhook = new Discord.WebhookClient(
        config.client.webhook.error.id,
        config.client.webhook.error.token
    )

    if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const g = (await knex('guilds').where({ id: message.guild.id }))[0]
    if (['초기화', 'reset'].includes(message.data.arg[0])) {
        let code = makeid(5)
        await fs.writeFileSync(
            `./backup/${message.guild.id}_${code}.json`,
            g.warn
        )
        await knex('guilds')
            .update({ warn: '{}' })
            .where({ id: message.guild.id })
        webhook.send(
            `BACKUPED WARN DATA : ${message.guild.name} (${message.guild.id}) - ${code}`
        )
        message.reply(locale.commands.setwarn.backup.bind({ code }))
    } else if (['한도', 'limit', '개수'].includes(message.data.arg[0])) {
        if (
            isNaN(message.data.arg[1]) ||
      Number(message.data.arg[1]) > 20 ||
      Number(message.data.arg[1]) < 1 ||
      !Number.isInteger(Number(message.data.arg[1]))
        )
            return message.reply(locale.commands.setwarn.limit)

        const conf = JSON.parse(g.config)
        conf.warncount = Number(message.data.arg[1])
        await knex('guilds')
            .update({ config: JSON.stringify(conf) })
            .where({ id: message.guild.id })
        message.reply(
            locale.commands.setwarn.limited.bind({ limit: message.data.arg[1] })
        )
    } else {
        message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    }
}

module.exports.props = {
    name: 'setwarn',
    perms: 'admin',
    alias: ['경고설정'],
    args: [
        {
            name: 'option',
            type: 'option',
            required: true,
            options: ['초기화', '한도']
        },
        {
            name: 'option',
            type: 'option',
            required: false,
            options: ['초기화 - 없음', '한도 - 개수']
        }
    ]
}

function makeid(length) {
    var result = ''
    var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
