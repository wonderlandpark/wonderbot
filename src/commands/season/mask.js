const fetch = require('node-fetch')
const list = require('./gu-list')
const Pagenation = require('pagination-is-noob')

module.exports.execute = async (client, message, locale, embed, tools) => {
  async function epage(status, m, p) {
    embed = tools.bot.embed(client, message)
    embed.setTitle('😷 마스크')
    embed.addField('오늘 마스크는?', maskDay[new Date().getDay()])
    console.log(p)
    for (i = (p - 1) * 5; i < p * 5; i++) {
      if (status.stores[i])
        embed.addField(
          status.stores[i].name,
          `${
            statusCode[status.stores[i]['remain_stat']]
              ? tools.lib.emojis[status.stores[i]['remain_stat']] +
                ' ' +
                statusCode[status.stores[i]['remain_stat']]
              : '❔ 알 수 없음'
          }\n  주소: \`${status.stores[i].addr}\`\n좌표: \`${
            status.stores[i].lat
          }, ${
            status.stores[i].lng
          }\` - [구글 맵](https://www.google.co.kr/maps/search/${
            status.stores[i].lat
          }+${status.stores[i].lng})`
        )
    }
    m.edit({
      content:
        '> ✅ 마스크 정보를 불러왔습니다. 잘못된 정보는 팀이 책임지지 않습니다.',
      embed
    })
  }
  embed.setTitle('😷 마스크')
  embed.addField('오늘 마스크는?', maskDay[new Date().getDay()])
  if (!message.data.args) return message.reply(embed)
  const m = await message.channel.send('> 🔎 검색중입니다...')
  const status = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${encodeURI(
      message.data.args
    )}`
  ).then(r => r.json())
  r = list.search(message.data.args)[0]
  if (status.count == 0)
    return m.edit(
      `> ❌ 검색결과가 없습니다 \n\`${
        r ? r.element : '검색결과 없음'
      }\`을/를 찾으셨나요?\n💡 TIP: **구** 이상의 정확한 주소를 입력해주세요!!`
    )
  const pagination = new Pagenation.Pagination({
    pageText: '페이지 %CURRENT% / %ALL%'
  })
  status.stores.chunkArray(5).forEach(s => {
    embed = tools.bot.embed(client, message)
    embed.setTitle('😷 마스크')
    embed.addField('오늘 마스크는?', maskDay[new Date().getDay()])
    s.forEach(g => {
      embed.addField(
        g.name,
        `${
          statusCode[g['remain_stat']]
            ? tools.lib.emojis[g['remain_stat']] +
              ' ' +
              statusCode[g['remain_stat']]
            : '❔ 알 수 없음'
        }\n  주소: \`${g.addr}\`\n좌표: \`${g.lat}, ${
          g.lng
        }\` - [구글 맵](https://www.google.co.kr/maps/search/${g.lat}+${g.lng})`
      )
    })
    pagination.addEmbed(embed)
  })
  pagination.addUser(message.author.id)
  pagination.edit(m)
}
module.exports.props = {
  name: 'mask',
  perms: 'general',
  alias: ['마스크'],
  args: [
    {
      name: 'address',
      type: 'text',
      required: true
    }
  ]
}

const statusCode = {
  plenty: '100개 이상',
  some: '30개 이상 100개 미만',
  few: '2개 이상 30개 미만',
  empty: '1개 이하',
  break: '판매 중단',
}

const maskDay = [
  '주중에 못 산사람',
  '**1**년생/**6**년생',
  '**2**년생/**7**년생',
  '**3**년생/**8**년생',
  '**4**년생/**9**년생',
  '**5**년생/**0**년생',
  '주중에 못 산사람',
  '주중에 못 산사람'
]