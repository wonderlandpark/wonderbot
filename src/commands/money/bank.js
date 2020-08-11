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
        embed.setDescription(`${message.author}님의 대출 가능 금액은 **${available[u.loan_lvl-1]}**원 이며, 현재 신용등급은 **${u.loan_lvl}등급**입니다.\n\`\`\`md\n* 24시간뒤부터 대출금을 상환할 수 있습니다.\n* 이자율은 20%입니다.\n* 대출금을 상환하지 않으신다면 시즌초기화와 함께 강제로 보유 아이템을 압류하게됩니다.\n\`\`\`\n\`${message.data.prefix}은행 대출 [금액]\`으로 은행에서 대출신청을 하실 수 있습니다.\n${message.data.prefix}`)
        message.reply(embed)
    } else if (message.data.arg[0] === '대출') {
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