const available = [ 10000000, 3000000, 500000, 10000, 7000 ]
const tier = [ 'VIP', '플레티넘', '골드', '실버', '브론즈' ]
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const u = (await knex('users').where({ id: message.author.id }))[0]
    const stocks = await knex('stocks')
    let userMoney = 0
    Object.keys(JSON.parse(u.items)).forEach(el => {
        userMoney += stocks.find(i => i.name === el).now * JSON.parse(u.items)[el]
    })

    userMoney += Number(u.money)
    const avail = u.loan_money === 0 ? userMoney * (0.3 + (6 - u.loan_lvl)*0.1) < available[(u.loan_lvl-1)] ? Math.round(userMoney * (0.3 + (6 - u.loan_lvl)*0.1)) : available[(u.loan_lvl-1)] : userMoney * (0.3 + (6 - u.loan_lvl)*0.1) - u.loan_money/(1 + (6 - u.loan_lvl)*0.1) < available[(u.loan_lvl-1)] ? Math.round(userMoney * (0.3 + (6 - u.loan_lvl)*0.1)) : Math.round(available[(u.loan_lvl-1)] - u.loan_money/(1 + (6 - u.loan_lvl)*0.1))
    if(!message.data.args) {
        embed.setTitle('🏦 은행 정보')
        if((u.loan_date+259200) > new Date()/1000) embed.setDescription(`${message.author}님의 상환 예정 금액은 **${u.loan_money}**원이며, **${new Date((u.loan_date+259200)*1000).format('ko')}**(${new Date((u.loan_date+259200)*1000).fromNow('ko')})까지 상환하셔야합니다.\n현재 신용등급은 **${tier[u.loan_lvl-1]}**(${u.loan_lvl}등급)입니다.\n\n⚠️ 대출금과 이자를 상환하지 않으시면, 신용등급이 1등급 하락하게 됩니다.\n\`${message.data.prefix}은행 상환 [금액]\`으로 대출금을 상환하실 수 있습니다.\n\`${message.data.prefix}은행 대출 전부\`로 대출금을 모두 상환하실 수 있습니다.`)
        else {
            embed.setDescription(u.loan_money === 0 ? `${message.author}님의 자산기준 대출 가능 금액은 **${avail}**원이며, 현재 신용등급은 **${tier[u.loan_lvl-1]}**(${u.loan_lvl}등급)입니다.\n\`\`\`md\n- 3일이내에 모든 대출금과 이자를 상환하셔야합니다. (3일마다 신용등급이 1등급 하락됩니다.)\n- 이자율은 ${u.loan_lvl*10}%입니다.\n- 대출금을 상환하지 않으신다면 시즌초기화와 함께 강제로 보유 아이템을 압류하게됩니다.\n- 이전 시즌의 금융활동은 다음 시즌의 신용등급 평가에 영향을 줍니다.${u.loan_lvl > 1 ? `\n- ${available[u.loan_lvl-1]*(1+(0.1*u.loan_lvl)) - u.loan_point}원을 상환하시면 신용등급이 상승합니다.` : ''}\`\`\`\n\`${message.data.prefix}은행 대출 [금액]\`으로 은행에서 대출신청을 하실 수 있습니다.\n\`${message.data.prefix}은행 대출 최대\`로 대출 최대 한도로 대출하실 수 있습니다.`
                : `${message.author}님의 자산과 상환하지 않은 대출금 기준 대출 가능 금액은 **${avail}**원이고 빚은 **${u.loan_money}**원이며, 현재 신용등급은 **${tier[u.loan_lvl-1]}**(${u.loan_lvl}등급)입니다.\n\`\`\`md\n- 3일이내에 모든 추가 대출금과 이자를 상환하셔야합니다.\n- 이자율은 ${u.loan_lvl*10}%입니다.\n- 대출금을 상환하지 않으신다면 시즌초기화와 함께 강제로 보유 아이템을 압류하게됩니다.\n- 이전 시즌의 금융활동은 다음 시즌의 신용등급 평가에 영향을 줍니다.\`\`\`\n\`${message.data.prefix}은행 대출 [금액]\`으로 은행에서 대출신청을 하실 수 있습니다.\n\`${message.data.prefix}은행 대출 최대\`로 대출 최대 한도로 대출하실 수 있습니다.`)
        }
        return message.reply(embed)
    } else if (message.data.arg[0] === '대출') {
        if((u.loan_date+259200) > new Date()/1000) return message.reply('현재 대출금에 대한 상환 시간이 남아있습니다. 상환 기간이 지난 다음에 추가대출이 가능합니다.')
        if(!message.data.arg[1]) return message.reply(`자산기준, **${avail}**원까지 대출하실 수 있습니다.\n\`${message.data.prefix}은행 대출 [금액]\`으로 은행에서 대출신청을 하실 수 있습니다.\n\`${message.data.prefix}은행 대출 최대\`로 대출 최대 한도로 대출하실 수 있습니다.`)
        const reqMoney = Math.round(['전부', '최대'].includes(message.data.arg[1]) ? avail : Number(message.data.arg[1]))
        if(isNaN(reqMoney) || !Number.isInteger(reqMoney)) return message.reply('올바르지 않은 금액입니다. 올바른 정수를 입력해주세요.')
        if(reqMoney > avail) return message.reply('대출 최대 한도 이상의 금액을 대출하실 수 없습니다.')
        if(reqMoney < 100) return message.reply('100원 이상만 대출금을 신청해주세요!')
        embed.setTitle('🏦 대출 신청')
        embed.setDescription(`**${reqMoney}**원을 대출합니다. 계속하시겠습니까?\n\`\`\`md\n- 12시간 후부터 대출금 상환이 가능합니다.\n- 3일 이내에 상환하지 않으시면 신용등급이 하락합니다.\n- 이자율은 ${u.loan_lvl*10}%로, 이후 ${Math.round(reqMoney*(1+u.loan_lvl*0.1))}원을 상환하셔야합니다.\`\`\`\n계속하시려면 ✅ 로 반응하세요.`)
        const m = await message.reply(embed)
        m.react('✅')
        await knex('users').update({ action:  1}).where({ id: message.author.id })
        m.awaitReactions((reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id, { max: 1, time: 10000, error: ['time']}).then(async collected => {
            if(collected.size === 0) {
                await knex('users').update({ action: 0 }).where({ id: message.author.id })
                return message.reply('대출이 취소되었습니다. 다음번에도 편하게 상담주세요!')
            }
            const time = Math.round(Number(new Date()/1000))
            await knex('users').where({ id: message.author.id }).update({ money: Math.round(+u.money + Number(reqMoney)), loan_money: Math.round(u.loan_money + reqMoney*(1+u.loan_lvl*0.1)), loan_date: time, action: 0 })
            return message.reply(`원더은행을 이용해주셔서 감사합니다.\n고객님의 잔고에 **${reqMoney}**원이 추가되었으며, 12시간 후부터 대출금을 상환하실 수 있으며, **${new Date((time+259200)*1000).format('ko')}**까지 원금과 이자를 포함한 **${Math.round(reqMoney*(1+u.loan_lvl*0.1))}**원을 상환하셔야합니다.\n현재 남은 빚은 **${Math.round(u.loan_money + reqMoney*(1+u.loan_lvl*0.1))}**원 입니다.`)
            
        })
            .catch(async()=>{
                await knex('users').update({ action: 0 }).where({ id: message.author.id })
                return message.reply('대출이 취소되었습니다. 다음번에도 편하게 상담주세요!')
            })
    } else if(message.data.arg[0] === '상환') {
        if(u.loan_money === 0) return message.reply('상환할 대출금이 없습니다.')
        if((u.loan_date+43200) > new Date()/1000) return message.reply(`상환은 대출 후 12시간부터 가능합니다.\n**${new Date((u.loan_date+43200)*1000).fromNow('ko')}**(${new Date((u.loan_date+43200)*1000).format('ko')})에 다시 시도해주세요.`)
        if(!message.data.arg[1]) return message.reply(`**${u.loan_money}**원의 빚이 있습니다.\n${u.loan_date !== 0 ? `**${new Date((u.loan_date+259200)*1000).format('ko')}**(${new Date((u.loan_date+259200)*1000).fromNow('ko')})까지 상환 하셔야합니다.\n` : ''}\`${message.data.prefix}은행 상환 [금액]\`으로 금액만큼 상환을 하실 수 있습니다.\n\`${message.data.prefix}은행 상환 전부\`로 빚의 전부를 상환하실 수 있습니다.`)
        const reqMoney = Math.round(['전부', '최대'].includes(message.data.arg[1]) ? u.loan_money : Number(message.data.arg[1]))
        if(isNaN(reqMoney) || !Number.isInteger(reqMoney)) return message.reply('올바르지 않은 금액입니다. 올바른 정수를 입력해주세요.')
        if(reqMoney > u.loan_money) return message.reply('빚을 초과하는 금액을 상환하실 수 없습니다.')
        if(reqMoney > u.money) return message.reply('잔고가 부족합니다.')
        embed.setTitle('🏦 대출금 상환')
        embed.setDescription(`**${u.loan_money}**원의 빚중 **${reqMoney}**원을 상환합니다. 계속하시겠습니까?\n\n상환하시게되면 **${u.loan_money - reqMoney}**원의 빚이 남게됩니다.\n계속하시려면 ✅ 로 반응하세요.`)
        const m = await message.reply(embed)
        m.react('✅')
        await knex('users').update({ action: 1 }).where({ id: message.author.id })
        m.awaitReactions((reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id, { max: 1, time: 10000, error: ['time']}).then(async collected => {
            if(collected.size === 0) {
                await knex('users').update({ action: 0 }).where({ id: message.author.id })
                return message.reply('상환이 취소되었습니다.')
            }
            const point = u.loan_point + reqMoney
            const loan_lvl = point >= available.map((r, n)=> r*(1+0.1*(n+1)))[u.loan_lvl-1] ? u.loan_lvl <= 1 ? 1 : u.loan_lvl-1 : u.loan_lvl 
            await knex('users').where({ id: message.author.id }).update({ money: Math.round(+u.money - Number(reqMoney)), loan_money: u.loan_money - reqMoney, action: 0, loan_lvl, loan_point: loan_lvl !== u.loan_lvl ? 0 : point, loan_date: (u.loan_money - reqMoney) <= 0 ? 0 : u.loan_date })
            message.reply(`원더은행을 이용해주셔서 감사합니다.\n**${u.loan_money}**원의 빚중에 **${reqMoney}**원을 상환하셨습니다.\n\n${u.loan_money - reqMoney > 0 ? `**${u.loan_money - reqMoney}**원의 빚을 ${u.loan_date!==0 ? `**${new Date((u.loan_date+43200)*1000).format('ko')}**(${new Date((u.loan_date+43200)*1000).fromNow('ko')})까지 상환 하셔야합니다.` : '상환하셔야합니다.'}` : '모든 빚을 상환하셨습니다!'}`)
            if(loan_lvl !== u.loan_lvl) return message.reply(`축하드립니다. 신용등급이 상향되었습니다.\n**${tier[u.loan_lvl-1]}**(${u.loan_lvl}등급) -> **${tier[loan_lvl-1]}**(${loan_lvl}등급)\n\n더 많은 금액을 대출하실 수 있으며, 다양한 혜택을 누려보세요.`)

            
        })
            .catch(async()=>{
                await knex('users').update({ action: 0 }).where({ id: message.author.id })
                return message.reply('상환이 취소되었습니다.')
            })

        

    } else {
        message.reply(locale.error.usage(this.props.name, message.data.prefix))
    }
    
}
// 3일: 259200
module.exports.props = {
    name: 'bank',
    perms: 'general',
    hide: true,
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