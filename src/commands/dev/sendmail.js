module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if(!message.data.arg[1]) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    message.reply(message.data.arg2)
    const users = await knex('users')
    users.forEach(async el=> {
        let mail = JSON.parse(el.mails)
        let cooldown = JSON.parse(el.cooldown)
        mail.push({ read: false, date: Number(new Date()), content: message.data.arg2, send: message.data.arg[0]})
        cooldown.mail = 0
        await knex('users').update({ cooldown: JSON.stringify(cooldown), mails: JSON.stringify(mail)}).where({ id: el.id })
    })
    
    await message.reply('모든 유저에게 메일이 전송되었습니다.')
}

module.exports.props = {
    name: 'sendmail',
    perms: 'dev',
    alias: ['메일전송'],
    args: [
        {
            name: 'sender',
            type: 'text',
            required: true
        },
        {
            name: 'text',
            type: 'text',
            required: true
        }]
}
