const fs = require('fs');

module.exports = class WB {
  constructor(config, devMode) {
    fs.lstat('./logs/cmd.log', function(err) {
      // eslint-disable-next-line no-sync
      if (err) fs.writeFileSync('./logs/cmd.log', '');
    });
    const Discord = require('discord.js');
    const client = new Discord.Client(config.client.app);
    const tools = require('../');
    const logger = tools.logger;

    client.once('ready', () => {
      logger.WBsuccess(`Logged in as ${client.user.tag}`);

      client.on('message', async message => {
        tools.bot.handler(client, message, config, devMode);
      });
    });

    client.login(config.client.token);
  }
};
