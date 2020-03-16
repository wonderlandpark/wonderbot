module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  var users = await knex('users').select('*')
  const stocks = await knex('stocks').select('*')
  users.sort(function(a, b) {
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
  var user = users.find(r => r.id == message.author.id)
  var server = await knex
    .select('*')
    .from('users')
    .whereIn(
      'id',
      message.guild.members.cache.map(r => r.id)
    )
  server = server.sort(function(a, b) {
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
  embed.addField(
    locale.commands.wallet.wallet.bind({ user: message.author.tag }),
    locale.commands.wallet.what
  )
  var money = 0
  Object.keys(JSON.parse(user.items)).forEach(el => {
    money += stocks.find(i => i.name == el).now * JSON.parse(user.items)[el]
  })
  var items = ''
  Object.keys(JSON.parse(user.items)).forEach(el => {
    if (JSON.parse(user.items)[el] !== 0)
      items +=
        '\n' +
        locale.commands.wallet.items[el] +
        ': ' +
        JSON.parse(user.items)[el].num2han() +
        ' 개'
  })

  embed.addField(
    locale.commands.wallet.will,
    locale.commands.wallet.money.bind({ money: (money + user.money).num2han() })
  )
  embed.addField(
    locale.commands.wallet.top,
    locale.commands.wallet.topdesc.bind({
      all: users.findIndex(el => el.id == message.author.id) + 1,
      guild: server.findIndex(el => el.id == message.author.id) + 1
    }),
    true
  )
  embed.addField(
    locale.commands.wallet.item,
    items.length == 0 ? locale.commands.wallet.noitem : items.replace('\n', '')
  )
  message.channel.send(embed)
}

module.exports.props = {
  name: 'wallet',
  perms: 'general',
  alias: ['지갑'],
  args: [{}]
}
