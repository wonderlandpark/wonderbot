const commands = require('../index');
module.exports.execute = async (client, message, locale, embed) => {
  if (!message.data.args) {
    embed.addField(locale.commands.help.help, locale.commands.help.desc);
    Object.keys(commands.categorys).forEach(cat => {
      embed.addField(cat.toUpperCase(), cmdFormat(commands.categorys[cat]));
    });
    embed.addField(locale.commands.help.support, locale.commands.help.links);
    return message.channel.send(embed);
  }
};

module.exports.props = {
  name: 'help',
  perms: 'general',
  alias: ['commands'],
  args: [{}]
};

function cmdFormat(cmds) {
  var array = [];
  Object.values(cmds).forEach(c => array.push(c.props.name));
  return '`' + array.join('`, `') + '`';
}
