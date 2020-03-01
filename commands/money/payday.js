module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  var u = (
    await knex
      .select('*')
      .from('users')
      .where({ id: message.author.id })
  )[0];
  var premium = JSON.parse(u.badges).includes('premium');
  var m = Number(u['money_cooldown']);
  if (m + 3600 > new Date() / 1000)
    return message.reply(
      locale.commands.payday.cooldown.bind({
        time: (Number(m + 3600 - new Date() / 1000) / 60).toFixed(1)
      })
    );
  else {
    if (premium) {
      await knex
        .update({
          money: Number(u['money']) + 200,
          money_cooldown: Number(Math.round(new Date() / 1000))
        })
        .where({ id: message.author.id })
        .from('users');
      message.reply(
        locale.commands.payday.premium.bind({
          money: (Number(u['money']) + 200).num2han()
        })
      );
    } else {
      await knex
        .update({
          money: Number(u['money']) + 100,
          money_cooldown: Number(Math.round(new Date() / 1000))
        })
        .where({ id: message.author.id })
        .from('users');
      message.reply(
        locale.commands.payday.success.bind({
          money: (Number(u['money']) + 100).num2han()
        })
      );
    }
  }
};

module.exports.props = {
  name: 'payday',
  perms: 'general',
  alias: ['돈받기'],
  args: [{}]
};
