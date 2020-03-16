const moment = require('moment')
require('moment-with-locales-es6')
const config = require('../../config')
Date.prototype.format = function(locale) {
  const date = this.toLocaleString('en-US', {
    timeZone: config.client.bot.timezone
  })
  moment.locale(locale)
  return moment(new Date(date), 'YYYY-MM-DDTHH:mm:ssZ').format('llll')
}
Date.prototype.fromNow = function(locale) {
  const date = this.toLocaleString('en-US', {
    timeZone: config.client.bot.timezone
  })
  moment.locale(locale)
  return moment(new Date(date), 'YYYY-MM-DDTHH:mm:ssZ').fromNow()
}

Date.prototype.textFormat = function(format, locale) {
  const date = this.toLocaleString('en-US', {
    timeZone: config.client.bot.timezone
  })
  moment.locale(locale)
  return moment(new Date(date), 'YYYY-MM-DDTHH:mm:ssZ').format(format)
}
