const commands = require('../../commands')
const tools = require('../')
const knex = tools.database
const data = {
  register: [],
  cooldown: {},
  action: [],
  slot: {},
  trick: {},
  news: { time: 0, data: [] }
}

const fs = require('fs')
const uuid = require('uuid/v1')
const Discord = require('discord.js')
module.exports = async (client, message, config) => {

  client.shard.fetchClient = async props => {
    let arr = []
    await client.shard.fetchClientValues(props).then(r => {
      arr = r.concat(...r)
      arr.splice(0, r.length)
    })
    return arr
  }
  const embed = new require('./embed')(client, message)
  const webhook = new Discord.WebhookClient(
    config.client.webhook.error.id,
    config.client.webhook.error.token
  )

  const prefix = JSON.parse((await knex('guilds').where({ id: message.guild.id }))[0].config).prefix || config.client.prefix
  message.data = {
    raw: message.content,
    arg: message.content.replace(prefix, '').split(' ').slice(1),
    args: message.content.replace(prefix, '').split(' ').slice(1).join(' '),
    arg2: message.content.replace(prefix, '').split(' ').splice(2).join(' '),
    prefix: prefix,
    cmd: message.content
    .replace(prefix, '')
    .split(' ')[0]
    .toLowerCase(),
    locale: 'ko'
  }
  const locale = require('../../locale')[message.data.locale]
  if(message.content.match( new RegExp(`<@[!|]${client.user.id}>`) )) message.channel.send(locale.global.me.bind({ prefix }))
  if (
    message.author.bot ||
    !message.content.startsWith(prefix) ||
    !message.data.cmd ||
    !message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS') ||
    !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')
  )
    return
    
  if (!commands[message.data.cmd]) return
  
  var log = `${new Date().textFormat('YYYY/MM/DD hh:mm:ss')} [#${
    message.channel.name
  }] ${message.author.tag} : ${message.content}`
  fs.appendFile('./logs/cmd.log', log + '\n', function(err) {
    if (err) throw err
    console.log('\x1b[0m' + log)
  })
  if (!config.client.owners.includes(message.author.id) && !client.onlineMode)
    return message.reply(locale.error.offline)
  const user = (await knex
    .select('*')
    .from('users')
    .where({ id: message.author.id }))[0]
  if (!user)
    return commands['register'].execute(
      client,
      message,
      locale,
      embed,
      tools,
      knex,
      commands[message.data.cmd].props,
      data
    )
  var blacked = await knex
    .select('*')
    .from('blacklist')
    .where({ id: message.author.id })
  if (blacked.length == 1 && blacked[0].time > new Date() / 1000)
    return message.reply(
      locale.error.blacklist.bind({
        time: new Date(Math.round(blacked[0].time * 1000)).format(
          message.data.locale
        ),
        reason: blacked[0].why
      })
    )
  if (user.action)
    return message.reply(locale.error.already)
  if (
    data.cooldown[message.author.id] &&
    Number(data.cooldown[message.author.id]) > Number(new Date()) &&
    !JSON.parse(user.badges).includes('premium')
  ) {
    return message.reply(
      locale.error.cooldown.bind({
        time: Number(
          (Number(data.cooldown[message.author.id]) - Number(new Date())) / 1000
        ).toFixed(2)
      })
    )
  }

  if (
    !message.member.hasPermission(
      commands[message.data.cmd].props.perms.required.perms
    )
  )
    return message.reply(
      locale.error.noperm.bind({
        perms: commands[message.data.cmd].props.perms.name.toUpperCase()
      })
    )
  if (
    commands[message.data.cmd].props.perms.required.id
      ? !commands[message.data.cmd].props.perms.required.id.includes(
          message.author.id
        )
      : false
  )
    return message.reply(
      locale.error.noperm.bind({
        perms: commands[message.data.cmd].props.perms.name
      })
    )
  // eslint-disable-next-line require-atomic-updates
  data.cooldown[message.author.id] = new Date(Number(new Date()) + 3000)
  if (
    !client.users.cache.get(message.author.id) ||
    !message.guild.members.cache.get(message.author.id)
  ) {
    client.users.fetch(message.author.id)
    message.guild.members.fetch(message.author.id)
  }

  if(JSON.parse(user.mails).filter(r=> !r.read).length !== 0 && (new Date() / 1000) > ((JSON.parse(user.cooldown).mail)||0) + 86400){
    message.reply(locale.global.mail.bind({ mail: JSON.parse(user.mails).filter(r=> !r.read).length, prefix: message.data.prefix }))
    let cooldown = JSON.parse(user.cooldown)
    cooldown.mail  = Math.round(new Date() / 1000)
    await knex('users').update({ cooldown: JSON.stringify(cooldown) }).where({ id: message.author.id })
  }

  commands[message.data.cmd]
    .execute(
      client,
      message,
      locale,
      embed,
      tools,
      knex,
      commands[message.data.cmd].props,
      data
    )
    .catch(error => {
      console.error(error)
      let code = uuid()
      let time = Math.round(new Date() / 1000)
      embed.addField(
        'ERROR - WB/Rewrite',
        locale.error.debug.bind({
          code,
          user: message.author.tag,
          userid: message.author.id,
          channel: message.channel.name,
          channelid: message.channel.id,
          url: message.url,
          error,
          cmd: message.data.cmd,
          msg:
            message.content.length > 1000
              ? message.content.replace(0, 1000) + '\n...'
              : message.content,
          time: new Date(time * 1000).format('ko'),
          perm: message.guild.me.permissions.bitfield,
          guild: message.guild.name,
          guildid: message.guild.id
        })
      )
      webhook.send(embed).then(async m => {
        await knex('error').insert({
          id: code,
          date: time,
          user: message.member.id,
          cmd: message.data.cmd,
          content: message.content,
          msg: message.url,
          error: error.toString(),
          guild: message.guild.id,
          info: `https://discordapp.com/channels/${
            (await client.shard.fetchClientValues('channel.cache')).get(
              m.channel_id
            ).guild.id
          }/${m.channel_id}/${m.id}`
        })
        message.reply(locale.error.onerror.bind({ code }))
      })
    })
}
