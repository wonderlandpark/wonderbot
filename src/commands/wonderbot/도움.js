const commands = require('../index')
const Base = require('./help')
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
  Base.execute( client, message, locale, embed)
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
