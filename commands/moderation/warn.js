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
    if(!message.data.args) return message.reply(locale.error.usage(props.name))
    const user = message.mentions.members.first() || message.guild.members.get(message.data.arg[0])
    if(!user) return message.reply(locale.error.usage(props.name))
    if(user.hasPermission(['ADMINISTRATOR'])) return message.reply(locale.commands.warn.alsoPerm)
    embed.addField(locale.commands.warn.alsoPerm, )

  }

module.exports.props = {
    name: 'warn',
    perms: 'admin',
    alias: ['경고'],
    args: [
      {
        name: 'user/id',
        type: 'text',
        required: true
      },
      {
        name: 'reason',
        type: 'text',
        required: false
      }
    ]
}