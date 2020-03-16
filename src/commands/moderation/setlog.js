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
  const conf = JSON.parse(
    (await knex('guilds').where({ id: message.guild.id }))[0].config
  )
  const channel = conf.modlog
  if (!message.mentions.channels.first()) {
    embed.addField(
      locale.commands.setlog.log,
      locale.commands.setlog.desc.bind({
        channel: message.guild.channels.cache.get(channel)
          ? message.guild.channels.cache.get(channel).name
          : locale.commands.setlog.undefined
      })
    )
    return message.reply(embed)
  } else {
    conf.modlog = message.mentions.channels.first().id
    await knex('guilds')
      .update({ config: JSON.stringify(conf) })
      .where({ id: message.guild.id })
    embed.addField(
      locale.commands.setlog.log,
      locale.commands.setlog.success.bind({
        channel: message.mentions.channels.first().name
      })
    )
    message.reply(embed)
  }
}

module.exports.props = {
  name: 'setlog',
  perms: 'admin',
  alias: ['로그설정'],
  args: [
    {
      name: 'channel',
      type: 'channel',
      required: false
    }
  ]
}
