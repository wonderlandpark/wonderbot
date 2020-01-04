// Tool
module.exports.logger = require('./logger')

module.exports.database = require('./database/knex')
// Bot
module.exports.bot = {
    init : require('./bot/init'),
    handler : require('./bot/handler')
}

require('./date')

Object.keys(require('./function')).forEach(t=>{
    module.exports[t] = require('./function')[t]
})