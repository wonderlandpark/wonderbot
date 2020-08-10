const config = require('../config')
const commands = {}
const locale = require('../locale').ko
commands.wonderbot = require('./wonderbot')
commands.moderation = require('./moderation')
commands.money = require('./money')
commands.game = require('./game')
commands.info = require('./info')
commands.utills = require('./utills')
commands.fun = require('./fun')
commands.stats = require('./stats')
commands.coding = require('./coding')
commands.dev = require('./dev')

module.exports.categorys = commands
console.log('Ready for commands')
Object.keys(commands).forEach(c => {
    const category = commands[c]
    Object.values(category).forEach(command => {
        command.props.category = c
        command.props.desc = locale.commands[command.props.name]
            ? locale.commands[command.props.name].CMDDESC
            : locale.error.nodesc || locale.error.nodesc
        command.props.docs = locale.commands[command.props.name]
            ? locale.commands[command.props.name].DOCS
            : undefined || undefined

        command.props.perms = config.permissions.find(
            p => p.name === command.props.perms
        )
        module.exports[command.props.name] = command
        const alias = command.props.alias || []

        alias.forEach(a => (module.exports[a] = command))
    })
})
