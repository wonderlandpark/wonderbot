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
  embed.addField(locale.commands.graph.graph, locale.commands.graph.desc)
  message.reply(embed)
}

module.exports.props = {
  name: 'graph',
  perms: 'general',
  alias: ['그래프'],
  args: []
}
