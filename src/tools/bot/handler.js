const Inko = require('inko')
const inko = new Inko()
const fs = require('fs')
const uuid = require('uuid/v1')


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

    const prefix = message.content.startsWith(config.client.prefix) && config.client.owners.includes(message.author.id) ? config.client.prefix : JSON.parse((await knex('guilds').where({ id: message.guild.id }))[0].config).prefix || config.client.prefix
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
        premium: undefined,
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
    if(message.channel.topic && message.channel.topic.includes('명령어금지') && !message.member.permissions.has('ADMINISTRATOR')){
        message.delete()
        return message.reply('해당 채널에서는 명령어 사용이 금지되있어요! 다른 채널에서 사용해주세요.').then(m=> m.delete({ timeout: 5000 }))
    }
    let CMD = commands[message.data.cmd] || commands[inko.en2ko(message.data.cmd)] || commands[inko.ko2en(message.data.cmd)]
    if (!CMD) return
  
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
            CMD.props,
            data
        )
    var blacked = await knex
        .select('*')
        .from('blacklist')
        .where({ id: message.author.id })
    if (blacked.length === 1 && blacked[0].time > new Date() / 1000)
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
    message.data.premium = new Date()/1000 < user.premium
    message.data.premiumTime = new Date(user.premium * 1000)
    if (
        data.cooldown[message.author.id] &&
    Number(data.cooldown[message.author.id]) > Number(new Date()) &&
    !message.data.premium
    ) {
        return message.reply(
            locale.error.cooldown.bind({
                time: Number(
                    (Number(data.cooldown[message.author.id]) - Number(new Date())) / 1000
                ).toFixed(2),
                prefix: message.data.prefix
            })
        )
    }

    if (
        !message.member.hasPermission(
            CMD.props.perms.required.perms
        )
    )
        return message.reply(
            locale.error.noperm.bind({
                perms: CMD.props.perms.name.toUpperCase()
            })
        )
    if (
        CMD.props.perms.required.id
            ? !CMD.props.perms.required.id.includes(
                message.author.id
            )
            : false
    )
        return message.reply(
            locale.error.noperm.bind({
                perms: CMD.props.perms.name
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

    CMD
        .execute(
            client,
            message,
            locale,
            embed,
            tools,
            knex,
            CMD.props,
            data
        )
        .catch(async error => {
            console.error(error)
            console.log(`${error.message}:${error.lineNumber}`)
            let code = uuid()
            let time = Math.round(new Date() / 1000)
            embed.addField(
                `ERROR - ${client.user.username}`,
                locale.error.debug.bind({
                    code,
                    user: message.author.tag,
                    userid: message.author.id,
                    channel: message.channel.name,
                    channelid: message.channel.id,
                    url: message.url,
                    error: error.stack,
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
            message.reply(locale.error.onerror.bind({ code }))
            client.webhook.send(embed)
        })
        
}
