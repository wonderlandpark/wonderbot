module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const s = [
    { id: 'wondercoin', name: '원더코인' },
    { id: 'gukbap', name: '국밥' },
    { id: 'diamond', name: '다이아몬드' },
    { id: 'coffee', name: '커피콩' },
    { id: 'figure', name: '피규어' }
  ]
  const stock = await knex('stocks').select('*')
  console.log(stock.map(r => r.now))
  message.channel.send(
    '```css\n [ ' +
      locale.commands.price.item +
      ' ]```\n```diff\n' +
      locale.commands.price.changed.bind({
        change: Math.round(new Date() / 1000 - (await knex('info'))[0].stock)
      }) +
      '\n' +
      stock
        .map(r =>
          locale.commands.price.price.bind({
            status:
              stock.find(a => a.name == r.name).lastchange < 0
                ? '-'
                : stock.find(a => a.name == r.name).lastchange > 0
                ? '+'
                : '~',
            update:
              stock.find(a => a.name == r.name).lastchange > 0
                ? '▲ ' + stock.find(a => a.name == r.name).lastchange
                : stock.find(a => a.name == r.name).lastchange < 0
                ? '▼ ' + stock.find(a => a.name == r.name).lastchange * -1
                : '~ ' + stock.find(a => a.name == r.name).lastchange,
            name: s.find(a => a.id == r.name).name,
            price: stock.find(a => a.name == r.name).now
          })
        )
        .join('\n') +
      '```\n' +
      locale.commands.price.lastchange.bind({
        lastchange: Math.round(
          180 - (new Date() / 1000 - (await knex('info'))[0].stock)
        )
      })
  )
}
module.exports.props = {
  name: 'price',
  perms: 'general',
  alias: ['가격', '시세'],
  args: [{}]
}
