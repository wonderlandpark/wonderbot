const config = require('../../config')
module.exports.execute = async (
    client,
    message
) => {
    if (message.data.args) {
        if (message.data.arg[0] == client.guilds.cache.first().shardID)
            message.channel.send(
                `\`❗ 해당 샤드 ${message.data.arg[0]}번 샤드를 종료합니다\``
            )
        client.shard
            .broadcastEval(
                ` if (this.guilds.cache.first().shardID == '${message.data.arg[0]}') { process.exit()}`
            )
            .then(
                message.channel.send(
                    `\`✅ ${message.data.arg[0]} 샤드에 종료 신호를 보냈습니다.\``
                )
            )
    } else {
        let shards = []
        for (let i = 0; i <= config.client.shard.totalShards - 1; i++) shards.push(i)
        
        shards = shards.filter(r => r !== message.guild.shardID)
        shards.push(message.guild.shardID)
        console.log(shards)
        shards.forEach(function(el, i) {
            setTimeout(() => {
                if (el === message.guild.shardID) {
                    message.channel
                        .send(`\`❗ 해당 샤드 ${el}번 샤드를 종료합니다\``)
                        .then(
                            client.shard.broadcastEval(
                                `if (this.guilds.cache.first().shardID === ${el}) process.exit();`
                            )
                        )
                }
                client.shard
                    .broadcastEval(
                        ` if (this.guilds.cache.first().shardID === ${el}) { process.exit()}`
                    )
                    .then(message.channel.send(`\`✅ ${el}번 샤드를 종료했습니다.\``))
            }, 500 * i)
        })
    }
}

module.exports.props = {
    name: 'reboot',
    perms: 'dev',
    alias: ['재시작', 'restart', 'closeshards', 'disconnect'],
    args: []
}
