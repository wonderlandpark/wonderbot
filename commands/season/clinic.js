const fetch = require('node-fetch')
const list = require('./gu-list')
const Pagenation = require('pagination-is-noob')

module.exports.execute = async (client, message, locale, embed, tools, knex, props) => {
  embed.setTitle('🏥 선별진료소')

  if (!message.data.args) return message.reply(locale.error.usage(props.name))
  const m = await message.channel.send('> 🔎 검색중입니다...')
  const status = await fetch('https://api-v0.maskd.seia.io/clinics/selection', { method: 'POST', body: {
    scope: 'city',
    keyword: message.data.args
  } })
  .then(res => res.json()) // expecting a json response
  if (status.count == 0)
    return m.edit(
      `> ❌ 검색결과가 없습니다`
    )
  const pagination = new Pagenation.Pagination({
    pageText: '페이지 %CURRENT% / %ALL%'
  })
  status.chunkArray(5).forEach(s => {
    embed = tools.bot.embed(client, message)
    embed.setTitle('🏥 선별진료소')
    s.forEach(g => {
      embed.addField(
        g.clinicName,
        `주소: ${g.address}\n전화번호: ${g.representativeContact}\n검체 검사 가능 여부: ${g.samplingAvailable == 1 ? '가능' : '불가능'}`
      )
    })
    pagination.addEmbed(embed)
  })
  pagination.addUser(message.author.id)
  pagination.edit(m)
}
module.exports.props = {
  name: 'clinic',
  perms: 'general',
  alias: ['선별진료소'],
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
  'None',
  '**1**년생/**6**년생',
  '**2**년생/**7**년생',
  '**3**년생/**8**년생',
  '**4**년생/**9**년생',
  '**5**년생/**0**년생',
  '주중에 못 산사람',
  '주중에 못 산사람'
]
