const config = require('../config');
const commands = {};
commands.general = require('./general');
commands.dev = require('./dev');
commands.account = require('./account');
commands.money = require('./money');
commands.fun = require('./fun');
commands.game = require('./game');
commands.utills = require('./utills');
commands.stats = require('./stats');
commands.season = require('./season')

module.exports.categorys = commands;
console.log('Ready for commands');
Object.keys(commands).forEach(c => {
  const category = commands[c];
  Object.values(category).forEach(command => {
    command.props.category = c;

    command.props.perms = config.permissions.find(
      p => p.name === command.props.perms
    );
    module.exports[command.props.name] = command;
    const alias = command.props.alias || [];

    alias.forEach(a => (module.exports[a] = command));
  });
});
