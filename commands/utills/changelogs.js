const request = require('request');
const config = require('../../config');
module.exports.execute = async (
  client,
  message,
  locale,
  embed
  ) => {
    const json = JSON.parse(await request(config.client.github));
    embed.setTitle('')
  };
  module.exports.props = {
    name: "changelogs",
    perms: "general",
    alias: ['changelog', '변경사항', '패치내역'],
    args: []
  };
