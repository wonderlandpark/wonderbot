module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if(['전부', '올인'].includes(message.data.args)) message.data.arg[0] = user.money
    if (!message.data.args || isNaN(message.data.arg[0]) || !Number.isInteger(Number(message.data.arg[0])))
        return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const user = (
        await knex
            .select('*')
            .from('users')
            .where({ id: message.author.id })
    )[0]
    const m = Number(user.money)

    const cooldown = JSON.parse(user.cooldown) || {trick: 0}  
    if (
        cooldown.trick * 1000 + 120000 > Number(new Date())
    )
        return message.reply(
            locale.commands.trick.cooldown.bind({
                time: (
                    (
                        cooldown.trick * 1000 +
              120000 -
              Number(new Date())
                    ) / 1000
                ).toFixed(1)
            })
        )
  
    if (Number(message.data.arg[0]) < 100)
        return message.reply(locale.commands.trick.morethan)
    if(m/10000000000000000 > message.data.arg[0]) return message.reply(locale.error.more)
    if (m < Number(message.data.arg[0]))
        return message.reply(locale.commands.trick.nomoney)
    const msg = await message.reply(locale.commands.trick.start)
    const random = [1, 2, 3, 4].random()
    setTimeout(async function() {
        msg.edit(msg.content + locale.commands.trick.mix)
    }, 1000)
    await knex('users').update({ action: 1}).where({ id: message.author.id })
    const filter = m => m.author.id === message.author.id
    await message.channel
        .awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
        .then(async collected => {
            if (![1, 2, 3, 4].includes(Number(collected.first().content))) {
                await knex('users').update({ action: 0}).where({ id: message.author.id })

                return message.reply(locale.commands.trick.wrongres)
            }
            cooldown.trick = Math.round(Number(new Date())/1000)
            await knex('users').update({ cooldown: JSON.stringify(cooldown) }).where({ id: message.author.id })
            if (random === Number(collected.first().content)) {
                await knex('users')
                    .update({ money: m + Number(message.data.arg[0]) })
                    .where({ id: message.author.id })
                message.reply(locale.commands.trick.right)
                await knex('users').update({ action: 0}).where({ id: message.author.id })
            } else {
                await knex('users')
                    .update({ money: m - Number(message.data.arg[0]) })
                    .where({ id: message.author.id })
                message.reply(locale.commands.trick.wrong.bind({ random }))
                await knex('users').update({ action: 0}).where({ id: message.author.id })
            }
        })
        .catch(async () => {
            await knex('users').update({ action: 0 }).where({ id: message.author.id })
            message.reply(locale.commands.trick.timeout)
        })
}
module.exports.props = {
    name: 'trick',
    perms: 'general',
    alias: ['야바위', 'trickery'],
    args: [
        {
            name: 'bet',
            type: 'number',
            required: true
        }
    ]
}
