module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const s = [
        { id: 'wondercoin', name: '원더전자' },
        { id: 'gukbap', name: '솔로식품' },
        { id: 'diamond', name: '코인은행' },
        { id: 'coffee', name: '요루커피' },
        { id: 'figure', name: '예린완구' },
        { id: 'mary', name: '매리웨딩' }
    ]
    const stock = await knex('stocks').select('*')
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
              stock.find(a => a.name === r.name).lastchange < 0
                  ? '-'
                  : stock.find(a => a.name === r.name).lastchange > 0
                      ? '+'
                      : '~',
                  update:
              stock.find(a => a.name === r.name).lastchange > 0
                  ? '▲ ' + stock.find(a => a.name === r.name).lastchange
                  : stock.find(a => a.name === r.name).lastchange < 0
                      ? '▼ ' + stock.find(a => a.name === r.name).lastchange * -1
                      : '~ ' + stock.find(a => a.name === r.name).lastchange,
                  name: s.find(a => a.id === r.name).name,
                  price: stock.find(a => a.name === r.name).now
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
    alias: ['가격', '시세', '주가'],
    args: [{}]
}
