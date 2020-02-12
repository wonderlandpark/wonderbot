/* eslint-disable no-unused-vars */
module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props,
  data
) => {
  if (!message.data.arg[0]) return message.reply(locale.error.usage(props.name));
  const user = message.mentions.members.first() ? message.mentions.members.first().id : message.data.arg[0];
  const perm = message.data.arg[1] || false;
  embed.addField('URL', `[HERE](https://discordapp.com/oauth2/authorize?client_id=${user}&scope=bot&permissions=${perm ? perm : 8})`);
  message.channel.send(embed);
};

module.exports.props = {
  name: "botinvite",
  perms: "general",
  alias: ['봇초대'],
  args: [
    {
      name: "user/id",
      type: "text",
      required: true
    },
    {
      name: 'perm',
      type: 'number',
      required: false
    }
  ]
};
