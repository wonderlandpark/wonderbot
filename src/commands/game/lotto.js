module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex,
    props
) => {
    if(!message.data.args) {
        const res = await knex('lotto')
        embed.setTitle(locale.commands.lotto .lotto)
        embed.setDescription(locale.commands.lotto.desc.bind({ n: res.length - 1, answer: res[res.length - 1].numbers.split(',').slice(0,4).map(g=> numbers[g]).join(' '), bonus: numbers[res[res.length - 1].numbers.split(',')[4]] }))
        message.reply(embed)
    }
    else {
        if(message.data.arg[0] === '구매'){
            if (!message.guild.me.hasPermission('ADD_REACTIONS'))  message.reply(locale.error.botperm.bind({ perms: locale.perm['ADD_REACTIONS'] }))
            const res = await knex('lotto')
            const user = (await knex('users').where({ id: message.author.id }))[0]
            let lotto = JSON.parse(user.lotto)
            lotto = lotto.filter(r=> r.time > res.length - 2)
            if(lotto.filter(r=> r.time === res.length).length >= 10) {
                return message.reply(locale.commands.lotto.limit)
            }
            if(!message.data.arg[1]) return message.reply(locale.commands.lotto.invaild.bind({ prefix: message.data.prefix }))
            let nums
            if(['자동', 'auto'].includes(message.data.arg[1])){
                nums = getNumber()  
            } else {
                nums = [ Number(message.data.arg[1]), Number(message.data.arg[2]), Number(message.data.arg[3]), Number(message.data.arg[4]) ]
                if(nums.includes(NaN) || invaildNum(nums[0]) || invaildNum(nums[1]) || invaildNum(nums[2]) || invaildNum(nums[3]) ) return message.reply(locale.commands.lotto.invaild.bind({ prefix: message.data.prefix }))
                if(hasDupe(nums)) return message.reply(locale.commands.lotto.dupe)
            }
            
            if((Number(user.money) - 300) < 0) return message.reply(locale.commands.lotto.noMoney)
            const filter = (reaction, user) => reaction.emoji.name === '🎫' && user.id === message.author.id
            message.reply(locale.commands.lotto.isReady.bind({ num: nums.map(r=> numbers[r]).join(' ')})).then(async msg => {
                msg.react('🎫')
                await knex('users').update({ action: 1 }).where({ id: message.author.id })
                msg.awaitReactions(filter, { max: 1, time: 10000, error: ['time'] }).then(
                    async collected => {
                        if (collected.size === 0) {
                            await knex('users').update({ action: 0 }).where({ id: message.author.id })
                            return message.reply(locale.commands.lotto.not)
                        }
                        lotto.push({ time: res.length, numbers: nums })
                        await knex('info').update({ lotto: (await knex('info'))[0].lotto + 1 })
                        await knex('users').update({ action: 0, money: Number(user.money) - 300, lotto: JSON.stringify(lotto) }).where({ id: message.author.id })
                        embed.setTitle(locale.commands.lotto.lotto).setDescription(locale.commands.lotto.success)
                        message.reply(embed)
                    })
                    .catch(async(e)=>{
                        console.log(e)
                        await knex('users').update({ action: 0}).where({ id: message.author.id })
                        return message.reply(locale.commands.lotto.not)
                    })

            })
            
        }
        else if (message.data.arg[0] === '확인'){
            const res = await knex('lotto')
            const user = JSON.parse((await knex('users').where({ id: message.author.id }))[0].lotto)
            embed.setTitle(locale.commands.lotto.lotto).setDescription(locale.commands.lotto.listDesc.bind({ list: user.filter(r=> r.time === res.length).map(r=> r.numbers.map(r=> numbers[r]).join(' ')).join('\n\n') }))
            message.reply(embed)
        }
        else if (message.data.arg[0] === '수령'){
            const res = await knex('lotto')
            const u = (await knex('users').where({ id: message.author.id }))[0]
            let user = JSON.parse(u.lotto)
            if(user.filter(r=> r.time === res.length - 1).length === 0) return message.reply(locale.commands.lotto.noItem)
            let total = 0
            embed.setTitle(locale.commands.lotto.lotto).setDescription(locale.commands.lotto.getMoney.bind({ list: user.map(r=> {
                const level = calculate(r.numbers, (res[res.length - 1].numbers).split(','))
                total += [3000000, 50000, 1000, 300, 100, 0][level]
                return locale.commands.lotto.moneyRes.bind({ num: r.numbers.map(el=> numbers[el]).join(' '), n: level+1, money:     [level] })}).join('') }))
            user = user.filter(r=> r.time !== res.length - 1)
            console.log(total)
            await knex('users').update({ money: (Number(u.money) + total), lotto: JSON.stringify(user)}).where({ id: message.author.id})
            message.reply(embed)
        }
        else if (message.data.arg[0] === '회차') {
            const res = await knex('lotto')
            embed.setTitle(locale.commands.lotto.lotto).setDescription(locale.commands.lotto.count.bind({ n: res.length, m: res.length - 1 }))
            message.reply(embed)
        }
        else return message.reply(locale.commands.lotto.noOpt.bind({opt: props.args[0].options }))
    }
}

module.exports.props = {
    name: 'lotto',
    perms: 'general',
    alias: ['복권', '로또'],
    args: [{
        name: 'option',
        type: 'option',
        options: ['구매', '확인', '수령', '회차'],
        required: false
    }]
}


const numbers = {
    0: '0️⃣',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    10: '🔟'
}


function Shuffle(o) {
    for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o
}

function getNumber(){

    return Shuffle([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]).slice(0,4)

}

function invaildNum( num ) {
    return !Number.isInteger(num) || num > 10 || num < 0
}

function hasDupe(array) {
    return (new Set(array)).size !== array.length
}

function calculate( my, answ ) {

    const ans = answ.slice(0, 4)
    const arr = [ ans.includes(my[0].toString()), ans.includes(my[1].toString()), ans.includes(my[2].toString()), ans.includes(my[3].toString()) ]
    const res = arr.join('')
    const l = !res.match(/true/gi) ? 0 : res.match(/true/gi).length

    if(l === 4) return 0
    else if(l === 3 && my[arr.indexOf(false)] === answ[4] ) return 1
    else if(l === 3) return 2
    else if(l === 2) return 3
    else if(l === 1) return 4
    else return 5
}


