/* eslint-disable no-undef */
const lib = require('../../tools/lib');

module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const user = message.mentions.members.first() || message.member;
  const obj = await knex
    .select('*')
    .from('users')
    .where({ id: user.id });
  if (obj.length == 0) return message.reply(locale.error.nouser);
  else {
    const u = (
      await knex.raw(
        `SELECT * FROM (SELECT *, PERCENT_RANK() OVER (ORDER BY money DESC) as per_rank FROM users) a WHERE id=?`,
        user.id
      )
    )[0][0];
    embed.addField(
      locale.commands.profile.profile.bind({ user: user.user.tag }),
      locale.commands.profile.wallet.bind({ money: u['money'] })
    );
    embed.addField(locale.commands.profile.allin, u['multiples']);
    embed.addField(
      locale.commands.profile.join,
      new Date(u['join'] * 1000).format(message.data.locale)
    );
    embed.addField(
      locale.commands.profile.rank,
      lib.emojis[getRank(u['per_rank'])] + `(${u['per_rank']}%)`
    );
    message.channel.send(embed);
  }
};

module.exports.props = {
  name: 'profile',
  perms: 'general',
  alias: ['프로필'],
  args: [
    {
      name: 'user',
      type: 'mention',
      required: false
    }
  ]
};

function getRank(per) {
  if (per == 0) per = 0.00001;
  if (per >= 0.9) rank = 'bronze';
  else if (per >= 0.75) rank = 'silver';
  else if (per >= 0.55) rank = 'gold';
  else if (per >= 0.4) rank = 'platinum';
  else if (per >= 0.3) rank = 'diamond';
  else if (per >= 0.2) rank = 'master';
  else rank = 'grandmaster';
  return rank;
}
