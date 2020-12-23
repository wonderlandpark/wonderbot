/*
Better Discord. Wonder_Bot

Author(s) : wonderlandpark

(C) Team. Wonder. All rights reserved.
*/


const tools = require('./tools')
const logger = tools.logger
const config = require('./config')
const Bot = tools.bot.init
const locale = require('./locale')
logger.log('Starting Up...', 'Cyan', true)
process.title = `Wonder_Bot - Ver. ${require('../package.json').version}, ${
    process.platform
}-${process.arch}`

// Handlers
process.on('unhandledRejection', reason => {
    logger.error(reason)
})
process.on('uncaughtException', err => {
    logger.error(err.stack)
})
process.on('warning', err => {
    logger.warn(err.stack)
})
process.on('exit', () => {
    logger.WBerror('Process has been Destroyed')
    logger.log('Bye', 'Cyan')
    console.log('\x1b[0m')
})

// Init
new Bot(config, (false))

// Prototype

String.prototype.bind = function(parameters, lang) {
    if (!lang) lang = 'ko'
    let text = this
    const glob = text.match(/%(.*?)%/g)
    if (glob) {
        glob.forEach(key => {
            const keyname = key.replace(/%/, '').replace(/%/, '')
            const string = String(locale[lang].global[keyname])
            // if(!string) return
            text = text.replace(key, String(string) || '')
        })
    }
    const keys = text.match(/\{(.*?)\}/g)
    if (!keys) return this

    keys.forEach(key => {
        const keyname = key.replace(/\{/, '').replace(/\}/, '')
        const string = String(parameters[keyname]) 
        // if(!string) return
        text = text.replace(key, String(string) || '')
    })

    return text
}
