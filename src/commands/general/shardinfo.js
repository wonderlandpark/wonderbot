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
  embed.setTitle(locale.commands.shardinfo.current)
  let user = 0
  client.guilds.cache.array().forEach(r=> user+=r.members.cache.size)
  embed.setDescription(locale.commands.shardinfo.desc.bind({ id: message.guild.shardID, guild: client.guilds.cache.size, user }))
  message.reply(embed)
}

module.exports.props = {
  name: 'shardinfo',
  perms: 'general',
  alias: ['샤드정보', 'shard', '정보', '샤드'],
  args: []
}
