const commands = require('../index')
const DOCURL = 'https://support.callisto.team/wonderbot/'
module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (!message.data.args) {
    embed.addField(locale.commands.help.help, locale.commands.help.desc)
    Object.keys(commands.categorys).forEach(cat => {
      embed.addField(locale.category[cat], cmdFormat(commands.categorys[cat]))
    })
    embed.addField(locale.commands.help.support, locale.commands.help.links)
    return message.channel.send(embed)
  } else {
    const cmd = commands[message.data.arg[0]]
    if (!cmd) return message.reply(locale.commands.help.noCommand)
    embed.setTitle(
      '> ' +
        locale.commands.help.commandInfo.bind({
          cmd: cmd.props.name.toUpperCase()
        })
    )
    embed.addField(
      locale.commands.help.description,
      '```fix\n' + cmd.props.desc + '```'
    )
    embed.addField(
      locale.commands.help.usage,
      locale.error.usage(cmd.props.name)
    )
    embed.addField(
      locale.commands.help.other,
      '`' + cmd.props.alias.join('`, `') + '`'
    )
    embed.addField(
      locale.commands.help.docs,
      cmd.props.docs ? DOCURL + cmd.props.docs : locale.commands.help.nodoc
    )
    message.reply(embed)
  }
}

module.exports.props = {
  name: '도움',
  perms: 'general',
  alias: ['도움', '도움말', '명령어'],
  args: [
    {
      name: 'cmd',
      type: 'text',
      required: false
    }
  ]
}

function cmdFormat(cmds) {
  var array = []
  Object.values(cmds).forEach(c => array.push(c.props.alias[0]))
  return '`' + array.join('`, `') + '`'
}
