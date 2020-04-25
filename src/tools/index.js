// Tool
module.exports.logger = require('@wonderbot/logger')
module.exports.database = require('./database/knex')

// Bot
module.exports.bot = {
    init: require('./bot/init'),
    handler: require('./bot/handler'),
    embed: require('./bot/embed'),
    customEmbed: require('./bot/customEmbed'),
    modlog: require('./bot/modlog')
}

module.exports.lib = require('./lib')

require('@wonderbot/format-date')

Object.keys(require('@wonderbot/utils')).forEach(t => {
    module.exports[t] = require('@wonderbot/utils')[t]
})
