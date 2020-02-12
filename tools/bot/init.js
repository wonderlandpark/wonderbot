const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')

const tools = require('../')

module.exports = class WB {
  constructor (config, devMode) {
    const cmdLogPath = path.join(__dirname, 'logs', 'cmd.log')
    const client = new Discord.Client(config.client.app)

    if (!fs.existsSync(cmdLogPath)) {
      fs.writeFileSync(cmdLogPath, '')
    }

    client.once('ready', () => {
      tools.logger.WBsuccess(`Logged in as ${client.user.tag}`)

      client.on('message', async message => tools.bot.handler(client, message, config, devMode))
    })
    client.login(config.client.token)
  }
}
