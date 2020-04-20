module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const res = await knex('lotto')
    const info = (await knex('info').select([ 'lotto' ]))[0].lotto
    message.reply(`로또 ${res.length}회차 통계\n판매: ${info}개`)
}

module.exports.props = {
    name: 'lottostat',
    perms: 'dev',
    alias: ['로또스텟', '로또상태'],
    args: [{}]
}