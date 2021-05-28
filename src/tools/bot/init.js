const fs = require('fs')
const koreanbots = require('koreanbots')

const knex = require('../database/knex')
module.exports = class WB {
    constructor(config, devMode) {
        fs.lstat('./logs/cmd.log', function(err) {
            // eslint-disable-next-line no-sync
            if (err) fs.writeFileSync('./logs/cmd.log', '')
        })
        const Discord = require('discord.js')
        const client = new Discord.Client(config.client.app)
        const MyBot = new koreanbots.MyBot(config.client.secrets.koreanbots)
        const tools = require('../')
        const logger = tools.logger
        client.webhook = new Discord.WebhookClient(
            config.client.webhook.error.id,
            config.client.webhook.error.token
        )

        client.once('ready', async () => {
            client.onlineMode = true
            if (!client.shard) {
                logger.WBerror('Only Shard Alowed')
                process.exit(0)
            }
            logger.WBsuccess(
                `#${
                    client.guilds.cache.first()
                        ? client.guilds.cache.first().shardID
                        : 'UNUSED'
                } Shard Ready`
            )

            await knex('users').update({ action: 0 })
            if (
                (
                    await knex('shards').where({
                        id: client.guilds.cache.first().shardID
                    })
                ).length === 0
            )
                await knex('shards').insert({ id: client.guilds.cache.first().shardID })
            // Fetch for all Guild
            const g = await tools.database('guilds')
            client.guilds.cache.forEach(async guild => {
                if (!g.find(r => r.id === guild.id)) {
                    console.log(`[INSERT] NEW GUILD: ${guild.name}`)
                    await tools.database('guilds').insert({ id: guild.id })
                }
            })
            client.mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
            await knex('shards')
                .update({
                    lastupdate: Math.round(new Date() / 1000),
                    ping: client.ws.ping,
                    guilds: client.guilds.cache.size,
                    users: client.guilds.cache
                        .map(r => r.memberCount)
                        .reduce(
                            (accumulator, currentValue) => Number(accumulator) + currentValue
                        ),
                    memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
                })
                .where({ id: client.guilds.cache.first().shardID })

            setInterval(async () => {
                client.mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
                await knex('shards')
                    .update({
                        lastupdate: Math.round(new Date() / 1000),
                        ping: client.ws.ping,
                        guilds: client.guilds.cache.size,
                        users: client.guilds.cache
                            .map(r => r.memberCount)
                            .reduce(
                                (accumulator, currentValue) =>
                                    Number(accumulator) + currentValue
                            ),
                        memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
                    })
                    .where({ id: client.guilds.cache.first().shardID })
                MyBot.cache.clear()
            }, 60000)
        })

        client.on('message', async message => {
            tools.bot.handler(client, message, config, devMode)
        })
        
        client.on('guildMemberAdd', async member => {
            const guild = JSON.parse((await knex('guilds').where({ id: member.guild.id }))[0].config)

            if(!guild.welcome) return
            const channel = member.guild.channels.cache.get(guild.welcomeChannel)
            if(!channel) {
                delete guild.welcome
                delete guild.welcomeChannel
                delete guild.welcomeText

                return await knex('guilds').update({ config: JSON.stringify(guild) }).where({ id: member.guild.id })
            }

            channel.send(guild.welcomeText.bind({ user: member, userID: member.id, 유저: member, 유저아이디: member.id,
                유저수: member.guild.memberCount, memberCount: member.guild.memberCount,
                서버: member.guild.name, 길드: member.guild.name, 서버아이디: member.guild.id, 길드아이디: member.guild.id, guildID: member.guild.id,
                채널: `<#${guild.welcomeChannel}>`, channel: `<#${guild.welcomeChannel}>`, 접두사: config.prefix || config.client.prefix, prefix: config.prefix || config.client.prefix
            }), { allowedMentions: { parse: ['roles', 'users'] }})

        })

        client.on('guildMemberRemove', async member => {
            const guild = JSON.parse((await knex('guilds').where({ id: member.guild.id }))[0].config)

            if(!guild.bye) return
            const channel = member.guild.channels.cache.get(guild.byeChannel)
            if(!channel) {
                delete guild.bye
                delete guild.byeChannel
                delete guild.byeText

                return await knex('guilds').update({ config: JSON.stringify(guild) }).where({ id: member.guild.id })
            }

            channel.send(guild.byeText.bind({ user: member, userID: member.id, 유저: member, 유저아이디: member.id,
                유저수: member.guild.memberCount, memberCount: member.guild.memberCount,
                서버: member.guild.name, 길드: member.guild.name, 서버아이디: member.guild.id, 길드아이디: member.guild.id, guildID: member.guild.id,
                채널: `<#${guild.byeChannel}>`, channel: `<#${guild.byeChannel}>`, 접두사: config.prefix || config.client.prefix, prefix: config.prefix || config.client.prefix
            }), { allowedMentions: { parse: ['roles', 'users'] }})

        })

        client.on('guildCreate', async guild => {
            if (guild.shardID !== client.guilds.cache.first().shardID) return
            const hello = await client.shard.fetchClientValues('guilds.cache.size')
            const g = await knex('guilds')
            if (!g.find(r => r.id === guild.id)) {
                console.log(`[INSERT] NEW GUILD: ${guild.name}`)
                await knex('guilds').insert({ id: guild.id })
            }
            const invites = await guild.fetchInvites().then(r=> r.first()).catch(() => null)
            client.webhook.send(
                `**NEW GUILD**: TOTAL: ${hello.reduce(
                    (prev, val) => prev + val,
                    0
                )}\nNAME: ${guild.name}\nOWNER: ${(await client.users.fetch(guild.ownerID)).tag}\nMEMBER: ${
                    guild.memberCount
                }\nBOTCOUNT: ${guild.members.cache.filter(r=> r.user.bot).size}\nBOTS: ${guild.members.cache.filter(r=> r.user.bot).map(r=> r.user.username).join(', ')}\ndiscord.gg/${invites ? invites.code : 'null'}\n\n\n--------------------------------------`.slice(0, 1999)
            )
        })

        client.on('guildDelete', async guild => {
            if (guild.shardID !== client.guilds.cache.first().shardID) return
            const hello = await client.shard.fetchClientValues('guilds.cache.size')

            const invites = await guild.fetchInvites().then(r=> r.first()).catch(() => null)

            client.webhook.send(
                `**LEFTED GUILD**: TOTAL: ${hello.reduce(
                    (prev, val) => prev + val,
                    0
                )}\nNAME: ${guild.name}\nOWNER: ${(await client.users.fetch(guild.ownerID)).tag}\nMEMBER: ${
                    guild.memberCount
                }\nBOTCOUNT: ${guild.members.cache.filter(r=> r.user.bot).size}\nBOTS: ${guild.members.cache.filter(r=> r.user.bot).map(r=> r.user.username).join(', ')}\ndiscord.gg/${invites ? invites.code : 'null'}\n\n\n--------------------------------------`.slice(0, 1999)
            )
        })

        client.on('error', async error => {
            logger.error(error)
        })

        client.on('warn', async error => {
            logger.warn(error)
        })

        client.on('debug', async error => {
            logger.debug(error)
        })
        client.login(config.client.token)
    }
}
