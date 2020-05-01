module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
) => {
  const status = await message.channel.send(locale.commands.ping.ping)
  const time = new Date()

  const users = await knex('users')
    .select('*')
    .limit(1)

  embed.addField(
    locale.commands.ping.this,
    locale.commands.ping.return.bind({
      bot: status.createdTimestamp - message.createdTimestamp,
      api: Match.round(client.ws.ping),
      db: new Date() - time
    })
  )

  status.edit({
    content: locale.commands.ping.pong,
    embed
  })
}
module.exports.props = {
    name: 'ping',
    perms: 'general',
    alias: ['핑', 'pong'],
    args: []
}
