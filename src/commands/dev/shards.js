/* eslint-disable no-unused-vars */
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex,
    props,
    data
) => {
    let values = await client.shard.broadcastEval(`
  [
    this.guilds.cache.first() ? this.guilds.cache.first().shardID : 'UNUSED',
      this.guilds.cache.size,
      this.guilds.cache.map(r=>r.memberCount).reduce((accumulator, currentValue) => Number(accumulator) + currentValue),
      this.ws.ping,
      this.mem
  ]
`)
    // Make a final string which will be sent in the channel
    let finalString = '**SHARD STATUS**\n\n'
    // For each shard data
    values.forEach(value => {
    // Add the shard infos to the final string
        finalString +=
      '• SHARD #' +
      value[0] +
      ' | ServerCount: ' +
      value[1] +
      ' | UserCount: ' +
      value[2] +
      ' | Ping: ' + 
      value[3] + 
      'ms | Memory: ' + 
      value[4] + 
      'mb\n'
    })

    message.channel.send(finalString)
}

module.exports.props = {
    name: 'shards',
    perms: 'dev',
    alias: ['전체샤드', 'totalshards', 'totalshards']
}
