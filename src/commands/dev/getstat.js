module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  client.shard
    .broadcastEval(
      'this.guilds.cache.map(r=>r.memberCount).reduce((accumulator, currentValue) => Number(accumulator) + currentValue)'
    )
    .then(results =>
      message.reply(`${results.reduce((prev, val) => prev + val, 0)} total `)
    )
}

module.exports.props = {
  name: 'getstat',
  perms: 'dev',
  alias: ['봇스텟확인', 'checkstat'],
  args: []
}
