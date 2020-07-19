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
    var m = Number(JSON.parse(u.cooldown).server) || 0
    if (m + 43200 > new Date() / 1000)
        return message.reply(
            locale.commands.payday.cooldownCustom.bind({
                
                time: (new Date(Number(new Date)+43200000)).fromNow('ko')
            })
        )
    else {
        if(message.guild.id === '470028725287780352'){
            const money = Number(u.money) + 100
            let cool = JSON.parse(u.cooldown)
            cool.server = Math.round(new Date() / 1000)
            await knex('users').update({ money, cooldown: JSON.stringify(cool) }).where({ id: message.author.id })
            return message.reply(locale.commands.supportserver.success.bind({ money }))
        }
        else {
            return message.reply(locale.commands.supportserver.not)
        }
    }
}

module.exports.props = {
    name: 'supportserver',
    perms: 'general',
    alias: ['지원서버보상', '지원서버보상', '서버참여보상', '출첵', 'ㅊㅊ', '출석체크', '서포트서버', '지원서버'],
    args: [{}]
}
