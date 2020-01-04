const config = require('../config')
const commands = {}
commands.general = require('./general')
commands.dev = require('./dev')
commands.account = require('./account')
commands.money = require('./money')
module.exports.categorys = commands
Object.keys(commands).forEach(c => {
    const category = commands[c]
    Object.values(category).forEach(command => {
        command.props.category = c

        command.props.perms = config.permissions.find(p=> p.name === command.props.perms)
        module.exports[command.props.name] = command
        const alias = command.props.alias || []
       
        alias.forEach(a=>module.exports[a] = command)
    })
})
