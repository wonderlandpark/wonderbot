module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const hmm = await knex('shards').where({
        id: client.guilds.cache.first().shardID
    })
    embed.setTitle(locale.commands.shardinfo.current)
    let user = 0
    client.guilds.cache.array().forEach(r => (user += r.members.cache.size))
    embed.setDescription(
        locale.commands.shardinfo.desc.bind({
            last: new Date(hmm[0].lastupdate * 1000).fromNow(message.data.locale),
            id: client.guilds.cache.first().shardID,
            ping: client.ws.ping,
            guild: client.guilds.cache.size,
            user: client.guilds.cache
                .map(r => r.memberCount)
                .reduce(
                    (accumulator, currentValue) => Number(accumulator) + currentValue
                ),
            ram: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
        })
    )
    message.reply(embed)
}

module.exports.props = {
    name: 'shardinfo',
    perms: 'general',
    alias: ['샤드정보', 'shard', '정보', '샤드'],
    args: []
}
