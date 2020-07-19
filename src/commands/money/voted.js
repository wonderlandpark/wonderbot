const config = require('../../config')
const koreanbots = require('koreanbots')

const MyBot = new koreanbots.MyBot(config.client.secrets.koreanbots)

module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if(m/10000000000000 > message.data.arg[0]) return message.reply(locale.error.more)
    var u = (
        await knex
            .select('*')
            .from('users')
            .where({ id: message.author.id })
    )[0]
    var m = Number(JSON.parse(u.cooldown).voted) || 0
    if (m + 10800 > new Date() / 1000)
        return message.reply(
            locale.commands.payday.cooldownCustom.bind({
                time: (new Date(Number(new Date)+10800000)).fromNow('ko')
            })
        )
    else {
        const res = await MyBot.checkVote(message.author.id).then(r=> r.voted).catch(()=> false)
        if(res){
            const money = Number(u.money) + 100
            let cool = JSON.parse(u.cooldown)
            cool.voted = Math.round(new Date() / 1000)
            await knex('users').update({ money, cooldown: JSON.stringify(cool) }).where({ id: message.author.id })
            return message.reply(locale.commands.voted.success.bind({ money }))
        }
        else {
            return message.reply(locale.commands.voted.not)
        }
    }
}

module.exports.props = {
    name: 'vote',
    perms: 'general',
    alias: ['투표보상', '투표'],
    args: [{}]
}
