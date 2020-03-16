const moment = require('moment')
module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const data = JSON.parse((await knex('info').select('disaster'))[0].disaster)
  let d
  if (!message.data.arg[0]) d = data.DisasterMsg[1].row.splice(0, 5)
  else
    d = data.DisasterMsg[1].row.filter(r =>
      r['location_name'].includes(message.data.arg[0])
    )
  d.splice(5, 10000)
  d.forEach(a => {
    embed.addField(
      '[' + a['location_name'] + '] - ' + a['create_date'],
      a['msg']
    )
  })
  message.reply(embed)
}
module.exports.props = {
  name: '재난문자',
  perms: 'general',
  alias: ['비상문자'],
  args: [
    {
      name: 'city',
      type: 'text',
      required: false
    }
  ]
}
