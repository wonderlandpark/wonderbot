const fs = require('fs')

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
      logger.WBsuccess(`Logged in as ${client.user.tag}`)
      // Fetch for all Guild
      const g = await tools.database('guilds')
      client.guilds.cache.forEach(async guild => {
        if (!g.find(r => r.id == guild.id)) {
          console.log(`[INSERT] NEW GUILD: ${guild.name}`)
          await tools.database('guilds').insert({ id: guild.id })
        }
      })
    })

    client.on('message', async message => {
      tools.bot.handler(client, message, config, devMode)
    })

    client.on('guildCreate', async guild => {
      const g = await tools.database('guilds')
      if (!g.find(r => r.id == guild.id)) {
        console.log(`[INSERT] NEW GUILD: ${guild.name}`)
        await tools.database('guilds').insert({ id: guild.id })
      }
      webhook.send(
        `**NEW GUILD**: TOTAL: ${client.guilds.cache.size}\nNAME: ${guild.name}\nOWNER: ${guild.owner.user.tag}\nMEMBER: ${guild.memberCount}\n\n\n--------------------------------------`
      )
    })

    client.on('guildDelete', async guild => {
      const g = await tools.database('guilds')
      webhook.send(
        `**LEFTED GUILD**: TOTAL: ${client.guilds.cache.size}\nNAME: ${guild.name}\nOWNER: ${guild.owner.user.tag}\nMEMBER: ${guild.memberCount}\n\n\n--------------------------------------`
      )
    })
    client.login(config.client.token)
  }
}
