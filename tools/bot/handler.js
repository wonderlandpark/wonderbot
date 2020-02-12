const fs = require('fs')

const commands = require('../../commands')
const locales = require('../../locale')
const tools = require('../')
const Embed = require('./embed')

const knex = tools.database

const data = {
  register: [],
  cooldown: {},
  action: [],
  slot: {},
  onlineMode: 1
}

module.exports = async (client, message, config) => {
  const embed = new Embed(client, message)
  const locale = locales[message.data.locale]

  message.data = {
    raw: message.content,
    arg: message.content.split(' ').slice(1),
    args: message.content.slice(message.content.split(' ')[0].length + 1),
    arg2: message.content
      .split(' ')
      .splice(2)
      .join(' '),
    prefix: config.client.prefix,
    cmd: message.content
      .split(' ')[0]
      .replace(config.client.prefix, '')
      .toLowerCase(),
    locale: 'ko'
  }

  const basicRequirementLeaked =
    (message.author.bot) ||
    (!message.content.startsWith(config.client.prefix)) ||
    (!message.data.cmd) ||
    (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) ||
    (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) ||
    (!commands[message.data.cmd])
  if (basicRequirementLeaked) return

  if (!config.client.owners.includes(message.author.id) && !data.onlineMode) {
    return message.reply(locale.error.offline)
  }

  const log = `${new Date().textFormat('YYYY/MM/DD HH:MM:SS')} ${message.author.tag} : ${message.content}`

  fs.appendFile('./logs/cmd.log', log + '\n', error => {
    if (error) {
      throw error
    }

    console.log(log)
  })

  const userBlacklistHistory = await knex('blacklist')
    .select('*')
    .where({
      id: message.author.id
    })
  if (userBlacklistHistory.length && userBlacklistHistory[0].time > Date.now() / 1000) {
    return message.reply(locale.error.blacklist.bind({
      time: new Date(Math.round(userBlacklistHistory[0].time * 1000)).format(message.data.locale),
      reason: userBlacklistHistory[0].why
    }))
  }

  const users = await knex('users')
    .select('*')
    .where({
      id: message.author.id
    })
  if (!users.length) {
    return commands.register.execute(client, message, locale, embed, tools, knex, commands[message.data.cmd].props, data)
  }

  if (data.action.includes(message.author.id)) {
    return message.reply(locale.error.already)
  }

  const isUserRatelimited =
    (data.cooldown[message.author.id]) &&
    (Number(data.cooldown[message.author.id]) > Date.now()) &&
    (!JSON.parse(users[0].badges).includes('premium'))
  if (isUserRatelimited) {
    return message.reply(locale.error.cooldown.bind({
      time: Number(Number(data.cooldown[message.author.id]) - (Date.now() / 1000)).toFixed(2)
    }))
  }

  if (!message.member.hasPermission(commands[message.data.cmd].props.perms.required.perms)) {
    return message.reply(locale.error.noperm.bind({
      perms: commands[message.data.cmd].props.perms.name
    }))
  }
  if (
    commands[message.data.cmd].props.perms.required.id
      ? !commands[message.data.cmd].props.perms.required.id.includes(message.author.id)
      : false
  ) {
    return message.reply(locale.error.noperm.bind({
      perms: commands[message.data.cmd].props.perms.name
    }))
  }

  data.cooldown[message.author.id] = new Date(Date.now() + 3000)

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

      message.reply(locale.error.onerror.bind({
        error,
        cmd: message.data.cmd,
        msg: message.content,
        perm: message.guild.me.permissions.bitfield
      }))
    })
}
