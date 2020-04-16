module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const stocks = await knex('stocks').select('*')

  var user = (await knex('users').where({ id: message.author.id }))[0]
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
    locale.commands.wallet.money.bind({ money: (money + Number(user.money)).num2han() })
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
