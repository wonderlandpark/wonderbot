module.exports.execute = async (
  client,
  message,
  locale,
  __embed,
  tools,
  knex,
  props,
  data
) => {
  let user
  const embed = tools.bot.customEmbed()

  if (!message.data.args) return message.reply(locale.error.usage(props.name))
  else {
    user =
      message.mentions.members.first() ||
      message.guild.members.get(message.data.arg[0])
  }
  if (!user) return message.reply(locale.error.usage(props.name))
  if (user.hasPermission(['KICK_MEMBERS']))
    return message.reply(locale.commands.kick.alsoPerm)
  await message.reply(locale.commands.kick.wait)
  try {
    await user.send(
      locale.commands.kick.notice.bind({
        guild: message.guild.name,
        reason: message.data.arg2
          ? message.data.arg2
          : locale.commands.kick.none,
        mod: message.author.tag
      })
    )
  } catch {}
  await user
    .kick(
      locale.commands.kick.why.bind({
        reason: message.data.arg2
          ? message.data.arg2
          : locale.commands.ban.none,
        by: message.author.tag
      })
    )
    .then(async () => {
      embed.setTitle(locale.commands.kick.Success)
      embed.setColor('#FF5675')
      embed.addField(
        locale.commands.kick.mod,
        locale.commands.kick.modDesc.bind({
          mod: message.author,
          tag: message.author.tag
        })
      )
      embed.addField(
        locale.commands.kick.user,
        locale.commands.kick.userDesc.bind({
          user: user.user,
          tag: user.user.tag
        })
      )
      embed.addField(
        locale.commands.kick.reason,
        locale.commands.kick.reasonDesc.bind({
          reason: message.data.arg2
            ? message.data.arg2
            : locale.commands.kick.none
        })
      )
      message.reply(embed)
      tools.bot.modlog(client, message.guild.id, embed)
    })
    .catch(e => {
      console.log(e)
      message.reply(locale.commands.kick.error)
    })
}

module.exports.props = {
  name: 'kick',
  perms: 'kick',
  alias: ['킥', '추방'],
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
