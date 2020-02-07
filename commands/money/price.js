const request = require('request');
module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const stock = await knex('stocks').select('*');
  request('https://data-asg.goldprice.org/dbXRates/USD', function(err, res, body) {
  if (err) throw err;
  if (res.statusCode !== 200) throw res.statusCode;
  const json = JSON.parse(body);
  message.channel.send(locale.commands.price.price.bind({
    xau: Math.round(json.items[0].xauPrice / 31),
    xag: Math.round(json.items[0].xagPrice),
    wbc: 'wondercoin'
  }));
  });
};

module.exports.props = {
  name: "price",
  perms: "general",
  alias: ["가격", '시세'],
  args: [{}]
};
