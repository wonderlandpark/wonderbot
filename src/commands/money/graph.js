module.exports.execute = async (
    client,
    message,
    locale,
    embed
) => {
    embed.addField(locale.commands.graph.graph, locale.commands.graph.desc)
    message.reply(embed)
}

module.exports.props = {
    name: 'graph',
    perms: 'general',
    alias: ['그래프'],
    args: []
}
