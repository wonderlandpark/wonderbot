const carriers = require('./carriers')
const request = require('request')
const moment = require('moment')
module.exports.execute = async (
    client,
    message,
    locale,
    embed
) => {
    if (!message.data.arg[1]) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const carrier = carriers.filter(
        i =>
            i.name.includes(message.data.arg[0].replace(/ /gi, '')) ||
      i.id.includes(message.data.arg[0])
    )
    if (carrier.length == 0) return message.reply(locale.error.search.nores)
    if (carrier.length > 1)
        return message.reply(
            locale.error.search.many.bind({
                count: carrier.length,
                items: carrier.map(a => a.name)
            })
        )
    request(
        encodeURI(
            `https://apis.tracker.delivery/carriers/${carrier[0].id}/tracks/${message.data.arg[1]}`
        ),
        function(err, res, Result) {
            if (err) throw err
            Result = JSON.parse(Result)
            if (Result.message) return message.channel.send(`> ❗ ${Result.message}`)
            const MappedResult = Result.progresses.map(l => ({
                desc: l.description,
                day: new Date(l.time).textFormat('YYYYMMDD'),
                time: new Date(l.time),
                location: l.location,
                status: l.status
            }))
            var json = {}
            for (let obj of MappedResult) {
                if (!json[obj.day]) json[obj.day] = []
                json[obj.day].push(obj)
            }
            embed.setTitle(
                locale.commands.delivery.info.bind({
                    from: Result.from.name,
                    to: Result.to.name,
                    state: Result.state.text
                })
            )
            for (let key of Object.keys(json)) {
                embed.addField(
                    moment(key, 'YYYYMMDD').format('YYYY - MM - DD'),
                    json[key].map(
                        l =>
                            `${
                                locale.commands.delivery.status[l.status.id]
                                    ? locale.commands.delivery.status[l.status.id]
                                    : locale.commands.delivery.status.unknown
                            } -  **[${l.location.name}]** **${l.time.textFormat(
                                'HH:mm'
                            )}** - ${l.desc}`
                    )
                )
            }
            message.channel.send(embed)
        }
    )
}
module.exports.props = {
    name: 'delivery',
    perms: 'general',
    alias: ['택배'],
    args: [
        {
            name: 'delivery',
            type: 'text',
            required: true
        },
        {
            name: 'bill',
            type: 'number',
            required: true
        }
    ]
}
