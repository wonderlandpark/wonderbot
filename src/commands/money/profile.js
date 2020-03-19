/* eslint-disable no-undef */
const lib = require('../../tools/lib')

module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const us = message.mentions.members.first() || message.member
  var users = await knex('users').select('*')
  const stocks = await knex('stocks').select('*')
  users.sort(function(a, b) {
    var bm = 0
    var am = 0
    Object.keys(JSON.parse(b.items)).forEach(el => {
      bm += stocks.find(i => i.name == el).now * JSON.parse(b.items)[el]
    })
    Object.keys(JSON.parse(a.items)).forEach(el => {
      am += stocks.find(i => i.name == el).now * JSON.parse(a.items)[el]
    })
    if (Number.isNaN(am)) am = 0
    if (Number.isNaN(bm)) bm = 0
    return bm + b.money - (am + a.money)
  })
  var user = users.find(r => r.id == us.id)
  var server = await knex
    .select('*')
    .from('users')
    .whereIn(
      'id',
      message.guild.members.cache.map(r => r.id)
    )
  server = server.sort(function(a, b) {
    var bm = 0
    var am = 0
    Object.keys(JSON.parse(b.items)).forEach(el => {
      bm += stocks.find(i => i.name == el).now * JSON.parse(b.items)[el]
    })
    Object.keys(JSON.parse(a.items)).forEach(el => {
      am += stocks.find(i => i.name == el).now * JSON.parse(a.items)[el]
    })
    if (Number.isNaN(am)) am = 0
    if (Number.isNaN(bm)) bm = 0

    return bm + b.money - (am + a.money)
  })
  u = users.find(el=> el.id == us.id)

  if (!u) return message.reply(locale.error.nouser)
  else {
    embed.addField(
      locale.commands.profile.profile.bind({ user: us.user.tag }),
      locale.commands.profile.wallet.bind({ money: u['money'] })
    )
    embed.addField(
      locale.commands.profile.top,
      locale.commands.profile.topdesc.bind({
        all: users.findIndex(el => el.id == us.id) + 1,
        guild: server.findIndex(el => el.id == us.id) + 1
      }),
      true
    )
    embed.addField(locale.commands.profile.badge, JSON.parse(u.badges).map(e=>{
      if(e.startsWith('season')) return tools.lib.emojis[e.split('-')[2]] + ' ' + e.split('-')[1] + `시즌 ${ranks[e.split('-')[2]]}위`
      else return tools.lib.emojis[e] + ' ' + locale.commands.profile.badgeName[e]
    })||'소유한 뱃지가 없습니다.')
    embed.addField(
      locale.commands.profile.join,
      new Date(u['join'] * 1000).format(message.data.locale)
    )
    message.channel.send(embed)
  }
}

module.exports.props = {
  name: 'profile',
  perms: 'general',
  alias: ['프로필'],
  args: [
    {
      name: 'user',
      type: 'mention',
      required: false
    }
  ]
}

const ranks = {
  first: 1,
  second: 2, 
  third: 3
}