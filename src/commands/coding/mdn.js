const fetch = require('node-fetch')
const Turndown = require('turndown')

module.exports.execute =  async (client, message, locale, embed) => {
    if(!message.data.args) return message.reply(locale.error.usage(message.data.cmd))
    const queryString = message.data.args
    const body = await fetch(`https://mdn.pleb.xyz/search?q=${encodeURI(queryString)}`).then(res=>res.json())
    if (!body.URL || !body.Title || !body.Summary) {
        return message.reply('없어! 없어! 없다고!')
    }

    const main = body.Translations.find(r=> r.Locale === 'ko')
    const turndown = new Turndown()
    embed
        .setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
        .setURL(`https://developer.mozilla.org${main.URL}`)
        .setTitle(main.Title)
        .setDescription(turndown.turndown(main.Summary.replace(/<code><strong>(.+)<\/strong><\/code>/g, '<strong><code>$1</code></strong>')))
			
    return message.channel.send(embed)
}


module.exports.props = {
    name: 'mdn',
    perms: 'general',
    alias: ['모질라', 'mozila'],
    args: []
}
    