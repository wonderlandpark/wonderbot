module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if(!message.data.args) return message.reply(locale.error.usage(props.name))
  const stocks = await knex('stocks').select('*')

    var leaderboard = await knex.select('*').from('users')
    var txt = ''
    leaderboard.sort(function(a, b) {
      var bm = 0
      var am = 0
      Object.keys(JSON.parse(b.items)).forEach(el => {
        bm += stocks.find(i => i.name == el).now * JSON.parse(b.items)[el]
      })
      Object.keys(JSON.parse(a.items)).forEach(el => {
        am += stocks.find(i => i.name == el).now * JSON.parse(a.items)[el]
      })
      if (Number.isNaN(am)) am = 0
      if (Number.isNaN(bm)) bm = 0
      return bm + b.money - (am + a.money)
    })
     const first = JSON.parse((await knex('users').where({ id: leaderboard[0].id }))[0].badges)
     await knex('users').update({ badges: first.push('')})
    message.reply(leaderboard[0].id + leaderboard[1].id + leaderboard[2].id)
    
  
}

module.exports.props = {
  name: 'reset',
  perms: 'dev',
  alias: ['시즌초기화'],
  args: [
    {
      name: 'season',
      type: 'text',
      required: true
    }
  ]
}
