const Periodic = require('./periodic.json').elements
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex,
    props
) => {
    if (!message.data.args) return message.reply(locale.error.usage(props.name))
    const res = Periodic.find(
        r => r.symbol.toLowerCase() === message.data.arg[0].toLowerCase()
    )
    if (!res) return message.reply(locale.error.search.noperiodic)
    embed.addField(res.name, res.summary)
    embed.addField(locale.commands.periodic.appear, res.appearance)
    embed.addField(locale.commands.periodic.number, res.number, true)
    embed.addField(
        locale.commands.periodic.table,
        `x: ${res.xpos} y: ${res.ypos}`,
        true
    )
    embed.addField(
        locale.commands.periodic.temp,
        locale.commands.periodic.info.bind({ melt: res.melt, boil: res.boil })
    )
    embed.addField(locale.commands.periodic.found, res.discovered_by, true)
    embed.addField(
        locale.commands.periodic.docs,
        `[${locale.commands.periodic.wiki}](${res.source})`
    )
    message.reply(embed)
    message.channel.send(
        `> ${locale.commands.periodic.spectra}: ${res.spectral_img}`
    )
}

module.exports.props = {
    name: 'periodic',
    perms: 'general',
    alias: ['원소기호'],
    args: [
        {
            name: 'periodic',
            type: 'text',
            required: false
        }
    ]
}
