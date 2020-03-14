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
      message.guild.members.cache.get(message.data.arg[0])
  }
  if (!user) return message.reply(locale.error.usage(props.name))
  if (user.hasPermission(['BAN_MEMBERS']))
    return message.reply(locale.commands.ban.alsoPerm)
  await message.reply(locale.commands.ban.wait)
  try {
    await user.send(
      locale.commands.ban.notice.bind({
        guild: message.guild.name,
        reason: message.data.arg2
          ? message.data.arg2
          : locale.commands.ban.none,
        mod: message.author.tag
      })
    )
  } catch {}
  await user
    .ban(
      locale.commands.ban.why.bind({
        reason: message.data.arg2
          ? message.data.arg2
          : locale.commands.ban.none,
        by: message.author.tag
      })
    )
    .then(async () => {
      embed.setTitle(locale.commands.ban.Success)
      embed.setColor('#FF5675')
      embed.addField(
        locale.commands.ban.mod,
        locale.commands.ban.modDesc.bind({
          mod: message.author,
          tag: message.author.tag
        })
      )
      embed.addField(
        locale.commands.ban.user,
        locale.commands.ban.userDesc.bind({
          user: user.user,
          tag: user.user.tag
        })
      )
      embed.addField(
        locale.commands.ban.reason,
        locale.commands.ban.reasonDesc.bind({
          reason: message.data.arg2
            ? message.data.arg2
            : locale.commands.ban.none
        })
      )
      message.reply(embed)
      tools.bot.modlog(client, message.guild.id, embed)
    })
    .catch(e => {
      console.log(e)
      message.reply(locale.commands.ban.error)
    })
}

module.exports.props = {
  name: 'ban',
  perms: 'ban',
  alias: ['밴', '치딘'],
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
