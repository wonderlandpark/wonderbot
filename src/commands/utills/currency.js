const fetch = require('node-fetch')
module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (!message.data.arg[1]) return message.reply(locale.commands.currency.usage)
  message.data.arg[0] = message.data.arg[0].replace(/원/, 'KRW').replace(/달러/, 'USD').replace(/엔/, 'JPY').replace(/헤알/, 'BRL')
  if(message.data.arg[0].length !== 3||!["USD","AED","ARS","AUD","BGN","BRL","BSD","CAD","CHF","CLP","CNY","COP","CZK","DKK","DOP","EGP","EUR","FJD","GBP","GTQ","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","KZT","MXN","MYR","NOK","NZD","PAB","PEN","PHP","PKR","PLN","PYG","RON","RUB","SAR","SEK","SGD","THB","TRY","TWD","UAH","UYU","ZAR"].includes(message.data.arg[0])) return message.reply(locale.commands.currency.notsupport)
  if(isNaN(Number(message.data.arg[1]))) return message.reply(locale.commands.currency.notnum)
  const data = await fetch(`https://api.exchangerate-api.com/v6/latest`).then(r=> r.json())
  const mul = Number(message.data.arg[1]) / data.rates[message.data.arg[0]]
  let text = ''
  Object.keys(data.rates).filter(r=>r!==message.data.arg[0] && ['KRW', 'USD','EUR', 'JPY', 'CNY', 'BRL'].includes(r)).forEach(el=>{
    text+=`${flags[el]} \`${(data.rates[el] * mul).toFixed(2)} ${el}\`\n`
  })
  embed.setTitle(message.data.arg[1] + message.data.arg[0])
  embed.setDescription(text + '\n' + locale.commands.currency.desc)
 
  message.reply(embed)

  
}

module.exports.props = {
  name: 'currency',
  perms: 'general',
  alias: ['환율'],
  args: [
    {
      name: 'currency',
      type: 'iso4217',
      required: true
    },
    {
      name: 'fromMoney',
      type: 'number',
      required: true
    },
    
    
  ]
}

const flags = {
  'KRW': ':flag_kr:'  , 'USD' : ':flag_us:' ,'EUR': ':flag_eu:' , 'JPY': ':flag_jp:' , 'CNY': ':flag_cn:' , 'BRL': ':flag_br:' } 
