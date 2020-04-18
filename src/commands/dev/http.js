const codes = require('./http-status-code.json').list
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
  const res = codes.find(
    r =>
      r.code.startsWith(message.data.arg[0]) ||
      r.desc.toLowerCase().includes(message.data.args.toLowerCase())
  )
  if (!res) return message.reply('`NORES`')
  else {
    embed.setTitle(res.code)
    embed.setDescription(res.desc)
    message.reply(embed)
  }
}

module.exports.props = {
  name: 'http',
  perms: 'general',
  alias: ['상태코드', 'statuscode'],
  args: [
    
  ]
}
