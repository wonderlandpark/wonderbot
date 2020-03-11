var success = [];
var fail = [];
var created = [];

module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  const user = message.mentions.members.first() ? message.mentions.members.first().id : message.data.arg[1]
  const m = (await knex('users').where({ id: user }))[0].money
  const money = Number(message.data.arg[2])
  if(['더하기', 'add', '더', 'ㄷ'].includes(message.data.arg[0])){
    await knex('users').update({ money: m + money }).where({ id: user })
    await message.reply('ADDED')
  }
  else if(['빼기', 'sub', '빼', 'ㅂ'].includes(message.data.arg[0])){
    await knex('users').update({ money: m - money }).where({ id: user })
    message.reply('SUBTRACTED')
  }
  else if(['설정', 'set', '설', 'ㅅ'].includes(message.data.arg[0])){
    await knex('users').update({ money: money }).where({ id: user })
    message.reply('SETTED')
  }
  else {
    return message.reply(locale.error.usage(props.name))
  }
};

module.exports.props = {
  name: 'editmoney',
  perms: 'dev',
  alias: ['돈수정'],
  args: [
    {
      name: 'option',
      type: 'option',
      required: true,
      options: ['더하기', '빼기', '설정']
    }
  ]
};
