const Pagenation = require('pagination-is-noob')
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    if (!message.guild.me.hasPermission('ADD_REACTIONS'))  message.reply(locale.error.botperm.bind({ perms: locale.perm['ADD_REACTIONS'] }))
    const u = (await knex('users').where({ id: message.author.id }))[0]
    let cooldown = JSON.parse(u.cooldown)
    let mails = JSON.parse(u.mails)
    const pagination = new Pagenation.Pagination({
        pageText: '%CURRENT% / %ALL%'
    })
    pagination.addUser(message.author.id)
    if(mails.length === 0) return message.reply(locale.commands.mail.noMail)
    if(['모두', '전체', 'all'].includes(message.data.arg[0])){
        if(mails.filter(r=> !r.read).length !== 0) message.reply(locale.commands.mail.readed)
        mails.sort((a,b)=> b.date - a.date).forEach(g=> {
            if(!g.read) {
                g.read = true
            }
            pagination.addEmbed(tools.bot.embed(client, message).setTitle((locale.commands.mail.title.bind({ sender: g.send, date: new Date(g.date).format(message.data.locale)}))).setDescription(g.content))
        })
        cooldown.mail = 0
        await knex('users').update({ mails: JSON.stringify(mails), cooldown: JSON.stringify(cooldown) }).where({ id: message.author.id })
        return pagination.send(message.channel)
    }
    else {
        if(mails.filter(r=> !r.read).length === 0) return message.reply(locale.commands.mail.allRead)
        message.reply(locale.commands.mail.current)
        mails.sort((a,b)=> b.date - a.date).forEach(g=> {
            if(!g.read) {
                g.read = true
                pagination.addEmbed(tools.bot.embed(client, message).setTitle((locale.commands.mail.title.bind({ sender: g.send, date: new Date(g.date).format(message.data.locale)}))).setDescription(g.content))
            }
        })
        cooldown.mail = 0
        await knex('users').update({ mails: JSON.stringify(mails), cooldown: JSON.stringify(cooldown) }).where({ id: message.author.id })
        return pagination.send(message.channel)
    }
    
} 
module.exports.props = {
    name: 'mail',
    perms: 'general',
    alias: ['메일', '편지', '매일'],
    args: [
        {
            name: 'option',
            type: 'option',
            options:['전체'],
            required: false
        }
    ]
}
  