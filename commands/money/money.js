module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const user = message.mentions.members.first() || message.member;
  const money = await knex
    .select('*')
    .from('users')
    .where({ id: user.id });
  if (money.length == 0) return message.reply(locale.commands.money.not);
  embed.addField(
    locale.commands.money.money,
    locale.commands.money.text.bind({
      user: user.user.tag,
      money: money[0].money.num2han()
    })
  );
  message.channel.send(embed);
};

module.exports.props = {
  name: 'money',
  perms: 'general',
  alias: ['돈', '돈보기'],
  args: [{
    name: 'user',
    type: 'user',
    required: false
  },]
};
