const fs = require('fs')
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
    if(!message.data.args) return message.reply(locale.error.usage(props.name))
    const g = ((await knex('guilds').where({ id: message.guild.id }))[0])
    if (['초기화', 'reset'].includes(message.data.arg[0])) {
      await fs.writeFileSync(`./backup/${message.guild.id}_${code = makeid(5)}.json`, g.warn)
      await knex('guilds').update({ warn: "{}" }).where({ id: message.guild.id })
      message.reply(locale.commands.setwarn.backup.bind({ code }))
    }  else if(['한도', 'limit', '개수'].includes(message.data.arg[0])) {

    }
    else {
      message.reply(locale.error.usage(props.name))
    }

  }

module.exports.props = {
    name: 'setwarn',
    perms: 'dev',
    alias: ['경고설정'],
    args: [
      {
        name: 'option',
        type: 'option',
        required: true,
        options: ['초기화', '한도']
      },
      {
        name: 'option',
        type: 'option',
        required: false,
        options: ['초기화 - 없음', '한도 - 개수']
      },
    ]
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}