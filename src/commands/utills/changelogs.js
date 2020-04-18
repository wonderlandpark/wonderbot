const fetch = require('node-fetch')
const config = require('../../config')
module.exports.execute = async (client, message, locale, embed) => {
    const json = JSON.parse(await fetch(config.client.github).then(b => b.text()))
    const msg = json[0].commit.message.split('\n\n')
    const title = msg[0]
    msg.splice(0, 1)
    const desc = msg.join('\n\n')
    embed.setTitle(title)
    embed.setDescription(
        desc +
      `\n[\`${json[0].sha.slice(0, 7)}\`](${json[0].html_url}) - By ${
          json[0].commit.author.name
      } : ${new Date(json[0].commit.author.date).format(
          message.data.locale
      )} (${new Date(json[0].commit.author.date).fromNow(message.data.locale)})`
    )
    message.channel.send(embed)
}
module.exports.props = {
    name: 'changelogs',
    perms: 'general',
    alias: ['변경사항', '패치내역', 'changelog'],
    args: []
}
