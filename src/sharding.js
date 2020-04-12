const { ShardingManager } = require('discord.js')
const config = require('./config')
const manager = new ShardingManager('./src/index.js', config.client.shard)

manager.spawn(this.totalShards)
manager.on('launch', shard => {
  console.log(`Launched shard ${shard.id}`)
})

manager.on('message', (shard, message) => {
  console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`)
})
