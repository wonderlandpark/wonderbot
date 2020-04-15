const fs = require('fs')
const knex = require('../database/knex')
module.exports = class WB {
  constructor(config, devMode) {
    fs.lstat('./logs/cmd.log', function(err) {
      // eslint-disable-next-line no-sync
      if (err) fs.writeFileSync('./logs/cmd.log', '')
    })
    const Discord = require('discord.js')
    const client = new Discord.Client(config.client.app)
    const tools = require('../')
    const logger = tools.logger
    const webhook = new Discord.WebhookClient(
      config.client.webhook.error.id,
      config.client.webhook.error.token
    )

    client.once('ready', async () => {
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
        if (!g.find(r => r.id == guild.id)) {
          console.log(`[INSERT] NEW GUILD: ${guild.name}`)
          await tools.database('guilds').insert({ id: guild.id })
        }
      })
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
        console.log('UPDATED')
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
      }, 60000)
    })

    client.on('message', async message => {
      tools.bot.handler(client, message, config, devMode)
    })

    client.on('guildCreate', async guild => {
      if (guild.shardID !== client.guilds.cache.first().shardID) return
      const hello = await client.shard.fetchClientValues('guilds.cache.size')
      const g = await tools.database('guilds')
      if (!g.find(r => r.id == guild.id)) {
        console.log(`[INSERT] NEW GUILD: ${guild.name}`)
        await tools.database('guilds').insert({ id: guild.id })
      }
      webhook.send(
        `**NEW GUILD**: TOTAL: ${hello.reduce(
          (prev, val) => prev + val,
          0
        )}\nNAME: ${guild.name}\nOWNER: ${guild.owner.user.tag}\nMEMBER: ${
          guild.memberCount
        }\n\n\n--------------------------------------`
      )
    })

    client.on('guildDelete', async guild => {
      if (guild.shardID !== client.guilds.cache.first().shardID) return
      const hello = await client.shard.fetchClientValues('guilds.cache.size')

      webhook.send(
        `**LEFTED GUILD**: TOTAL: ${hello.reduce(
          (prev, val) => prev + val,
          0
        )}\nNAME: ${guild.name}\nOWNER: ${guild.owner.user.tag}\nMEMBER: ${
          guild.memberCount
        }\n\n\n--------------------------------------`
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
