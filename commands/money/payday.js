module.exports.execute = async (client, message, locale, embed, tools, knex, props, data) => {
   if((await knex.select('*').from('users').where({id : message.author.id}))[0]['money_cooldown']+3600000 > new Date()/1000) return message.reply
}

module.exports.props = {
    name : 'money',
    perms : 'general',
    alias : [],
    args : [{

    }]
}