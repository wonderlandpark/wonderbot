const available = [ 100000, 50000, 15000, 3000, 700]
const tier = [ "브론즈", "실버", "골드", "플레티넘", "다이아몬드" ]
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const u = (await knex('users').where({ id: message.author.id }))[0]
    if(!message.data.args) {
        embed.setTitle('🏦 은행 정보')
        embed.setDescription(`${message.author}님의 대출 가능 금액은 **${available[u.loan_lvl-1]}**원 이며, 현재 신용등급은 **${u.loan_lvl}등급**입니다.`)

        message.reply(embed)
    }
    
}

module.exports.props = {
    name: 'bank',
    perms: 'general',
    alias: ['은행'],
    args: [
        {
            name: 'option',
            type: 'option',
            options: ['대출', '상환'],
            required: false
        },

        {
            name: 'money',
            type: 'number',
            required: false
        }
    ]
}
