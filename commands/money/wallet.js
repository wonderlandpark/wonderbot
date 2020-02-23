module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  
  const user = await knex.raw('SELECT * FROM (SELECT *, PERCENT_RANK() OVER (ORDER BY money DESC) as rank, ROW_NUMBER() OVER (ORDER BY money DESC) as ranking FROM users)a WHERE id=?', [message.author.id])
  const server = await knex
  .select('*')
  .from('users')
  .whereNot('money', 0)
  .whereIn(
    'id',
    message.guild.members.map(r => r.id)
  )
  .orderBy('money', 'DESC');
  const stocks = await knex('stocks').select('*')
  embed.addField(
    locale.commands.wallet.wallet.bind({ user: message.author.tag }),
    locale.commands.wallet.what
  );
  var money = 0
    Object.keys(JSON.parse(user[0][0].items)).forEach(el=> {
    money += stocks.find(i=> i.name == el).now * JSON.parse(user[0][0].items)[el]
  })
  var items = ''
    Object.keys(JSON.parse(user[0][0].items)).forEach(el=> {
      items += '\n' + locale.commands.wallet.items[el] + ': ' + JSON.parse(user[0][0].items)[el]
    })
  embed.addField(locale.commands.wallet.will, locale.commands.wallet.money.bind({ money: money + user[0][0].money }))
  embed.addField(locale.commands.wallet.top, locale.commands.wallet.topdesc.bind({ all: user[0][0].ranking, guild: server.findIndex(el=> el.id == message.author.id) + 1 }), true)
  embed.addField(locale.commands.wallet.item, items.replace('\n', ''))
  message.channel.send(embed);
};

module.exports.props = {
  name: 'wallet',
  perms: 'general',
  alias: ['지갑'],
  args: [{}]
};
