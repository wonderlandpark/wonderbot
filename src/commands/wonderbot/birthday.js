module.exports.execute = async ( client, message, locale, embed, tools, knex ) => {
    if(+new Date() > 1606575600000) return message.reply('죄송합니다. 생일이 지나 보상을 받으실 수 없습니다.')
    const res = (await knex('users').where({ id: message.author.id }))[0]
    const badges = JSON.parse(res.badges)
    if(badges.includes('third-birthday')) return message.reply('이미 보상을 받으셨습니다.')
    badges.push('third-birthday')

    await knex('users').update({ badges: JSON.stringify(badges), money: Number(res.money) + 2000 }).where({ id: message.author.id })

    return message.reply('**원더봇 3주년** :partying_face:\n원더봇 3주년을 축하해주셔서 감사합니다.\n\n원더봇 3주년 뱃지와 잔고에 2000원을 지급해드렸습니다.')


}

module.exports.props = {
    name: 'birthday',
    perms: 'general',
    alias: ['생일', '3주년'],
    args: []
}