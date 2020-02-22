const { ShardingManager } = require('discord.js');
const config = require('./config');
const manager = new ShardingManager('./index.js', config.client.shard);

manager.spawn(this.totalShards);
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
