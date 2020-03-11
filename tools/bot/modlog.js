const knex = require('../').database

module.exports = async(client, id, embed) => {
    const config = (JSON.parse(((await knex('guilds').where({ id: id }))[0]).config))
    if(!config.modlog) return
    const channel = client.guilds.cache.get(id).channels.cache.get(config.modlog)
    if(!channel) return  
    channel.send(embed)
}