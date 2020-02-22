module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const stock = await knex('stocks').select('*');
  message.channel.send(
    locale.commands.price.price.bind({
      wbc: stock.find(r => r.name == 'wondercoin').now
    })
  );
};
module.exports.props = {
  name: 'price',
  perms: 'general',
  alias: ['가격', '시세'],
  args: [{}]
};
