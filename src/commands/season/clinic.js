const fetch = require('node-fetch')
const list = require('./gu-list')
const Pagenation = require('pagination-is-noob')
const { URLSearchParams } = require('url')

module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
) => {
    const params = new URLSearchParams()
    params.append('scope', 'address')
    params.append('keyword', message.data.args)
    embed.setTitle('🏥 선별진료소')

    if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const m = await message.channel.send('> 🔎 검색중입니다...')
    const status = await fetch('https://api-v0.maskd.seia.io/clinics/selection', {
        method: 'POST',
        body: params
    }).then(res => res.json())
    let r = list.search(message.data.args)[0]

    if (status.length == 0)
        return m.edit(
            `> ❌ 검색결과가 없습니다 \n${
                r ? '`' + r.element + '`을/를 찾으셨나요?' : ''
            }\n💡 TIP: 정확한 검색을 위해 키워드 또는 정확한 주소를 검색해주세요.\n\`ex) OO시, OO동, OO구, 광주광역시 광산구\``
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
                `주소: ${g.address}\n전화번호: ${
                    g.representativeContact
                }\n검체 검사 가능 여부: ${g.samplingAvailable == 1 ? '가능' : '불가능'}`
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
    alias: ['선별진료소', '진료소'],
    args: [
        {
            name: 'address',
            type: 'text',
            required: true
        }
    ]
}