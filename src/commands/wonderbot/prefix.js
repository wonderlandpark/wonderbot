const config = require('../../config')
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    const guild = JSON.parse((await knex('guilds').where({ id: message.guild.id }))[0].config)
    if(!message.data.args) return message.reply(locale.commands.prefix.current.bind({ prefix: JSON.parse((await knex('guilds').where({ id: message.guild.id }))[0].config).prefix || config.client.prefix}))
    if(message.data.args.length > 16) return message.reply(locale.commands.prefix.filter)
    if(message.data.args.match(/<@![0-9]{18}>/)) return message.reply(locale.commands.prefix.mention)
    guild.prefix = message.data.args.replace(/\[SPACE\]|\[띄어쓰기\]/gi, ' ')
    if(guild.prefix.startsWith(' ')) return message.reply(locale.commands.prefix.space)
    await knex('guilds').update({ config: JSON.stringify(guild) }).where({ id: message.guild.id })
    return message.reply(locale.commands.prefix.changed.bind({ prefix: guild.prefix }))
}
  module.exports.props = {
    name: 'prefix',
    perms: 'general',
    alias: ['접두사', '접속사'],
    args: [
        {
            name: 'prefix',
            type: 'text',
            required: false
          }
    ]
  }
  