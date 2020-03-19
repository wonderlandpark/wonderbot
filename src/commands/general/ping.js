 module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  _tools,
  knex
) => {
  message.channel.send(locale.commands.ping.ping).then(m => {
    const time = new Date()
    knex
      .select('*')
      .from('users')
      .then(() => {
        embed.addField(
          locale.commands.ping.this,
          locale.commands.ping.return.bind({
            bot: m.createdTimestamp - message.createdTimestamp,
            api: Math.round(client.ws.ping),
            db: new Date() - time
          })
        )

        m.edit({ content: locale.commands.ping.pong, embed })
      })
  })
}
module.exports.props = {
  name: 'ping',
  perms: 'general',
  alias: ['핑', 'pong'],
  args: []
}
