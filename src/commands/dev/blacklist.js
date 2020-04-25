const ms = require('@wonderbot/ms').ms
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if (!message.data.args)
        return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const blacks = await knex('blacklist')
    const user = message.mentions.members.first()
        ? message.mentions.members.first().id
        : message.data.arg[1]

    if (['add', '추가', 'a'].includes(message.data.arg[0])){
        if(!user) return message.reply('USER REQUIRED')
        if( blacks.find(r=> r.id === user) ) return message.reply('Already Exists')
        const time = (Number(new Date()) + ms(message.data.arg[2]))
        console.log(time)
        await knex('blacklist').insert({ id: user, time: Math.round(time / 1000), why: message.content.replace(message.data.prefix, '').split(' ').splice(4).join(' ')})
        return message.reply(`BLACKLIST ADDED | ID: ${user} | TO: ${new Date(time).fromNow()} | REASON: ${message.content.replace(message.data.prefix, '').split(' ').splice(4).join(' ')}`)
    }
    else if (['remove', '삭제', 'rm'].includes(message.data.arg[0])){
        if(!user) return message.reply('USER REQUIRED')
        if( !blacks.find(r=> r.id === user) ) return message.reply('Not Existing')
        await knex('blacklist').where({ id: user }).del()
        return message.reply(`BLACKLIST REMOVED | ID: ${user}`)
    }
    else if (['list', '리스트', 'ls'].includes(message.data.arg[0])){
        return message.reply(`\`\`\`bash\n${blacks.map(r => `$${r.id} | "${r.why}" | # ${new Date(r.time * 1000).fromNow()}`).join('\n')}\`\`\``)
    }
    else return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
}

module.exports.props = {
    name: 'blacklist',
    perms: 'dev',
    alias: ['블랙리스트'],
    args: [
        {
            name: 'option',
            type: 'option',
            required: true,
            options: ['add', 'list', 'remove']
        },
        {
            name: 'user',
            type: 'user',
            required: true
        },
        {
            name: 'number',
            type: 'number',
            required: true
        }
    ]
}
