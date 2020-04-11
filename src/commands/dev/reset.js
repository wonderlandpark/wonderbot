module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (!message.data.args) return message.reply(locale.error.usage(props.name))
  const stocks = await knex('stocks').select('*')
  const season = message.data.arg[0]

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
  const first = JSON.parse(leaderboard[0].badges)
  first.push(`season-${season}-first`)
  await knex('users')
    .update({ badges: JSON.stringify(first) })
    .where({ id: leaderboard[0].id })
  const second = JSON.parse(leaderboard[1].badges)
  second.push(`season-${season}-second`)
  await knex('users')
    .update({ badges: JSON.stringify(second) })
    .where({ id: leaderboard[1].id })
  const third = JSON.parse(leaderboard[2].badges)
  third.push(`season-${season}-first`)
  await knex('users')
    .update({ badges: JSON.stringify(third) })
    .where({ id: leaderboard[2].id })
  m = await message.reply('BADGES ADDED')
  await knex('users').update({
    money: 0,
    items: '{"wondercoin":1}',
    money_cooldown: 0
  })
  m.edit(m.content + '\nRESETED MONEY and ITEMS')
  await knex('stocks').update({ prices: '100', now: 100, lastchange: 0 })
  m.edit(m.content + '\nRESETED MONEY and ITEMS\nSTOCK DATA RESET')
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
