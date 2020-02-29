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
    let user
    if(!message.data.args) return message.reply(locale.error.usage(props.name))
    else {
        user = message.mentions.members.first() || message.guild.members.get(message.data.arg[0])
    }
    if(!user) return message.reply(locale.error.usage(props.name))
    if(user.hasPermission(['BAN_MEMBERS'])) return message.reply(locale.commands.ban.alsoPerm)
    await message.reply(locale.commands.ban.wait)
    await user.send(locale.commands.ban.notice.bind({guild: message.guild.name, reason: message.data.arg2 ? message.data.arg2 : '없음.', mod: message.author.tag}))
    .catch()
    await user.ban(message.data.arg2 ? message.data.arg2 : '없음.')
    .then(async ()=> {
    embed.addField(locale.commands.ban.isSuccess, locale.commands.ban.successDesc.bind({user: user.user.tag }))
    embed.addField(locale.commands.ban.success.random(), locale.commands.ban.nice.bind({reason: message.data.arg2 ? message.data.arg2 : '없음.' }))
    message.reply(embed)
        
    })
    .catch(()=> {
        message.reply(locale.commands.ban.error)})
  }

module.exports.props = {
    name: 'ban',
    perms: 'ban',
    alias: ['밴', '차단'],
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