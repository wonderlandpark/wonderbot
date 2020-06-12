const fetch = require('node-fetch')


module.exports.execute =  async (client, message, locale, embed) => {
    if(!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const pkg = encodeURI(message.data.args)
    const res = await fetch(`https://registry.npmjs.com/${pkg}`)
    if (res.status === 404 || res.status === 405) {
        return message.reply(locale.error.search.nores)
    }
    const body = await res.json()
    if (body.time && body.time.unpublish) {
        return message.reply(locale.commands.npm.unpublish)
    }
    const version = body['dist-tags'] ? body.versions[body['dist-tags'].latest] || body.versions[body['dist-tags']] : {}
    const maintainers = body.maintainers.map((user => `${user.name}<${user.email || 'None'}>`))
    const dependencies = version.dependencies ? (Object.keys(version.dependencies)) : null
    embed
        .setColor(0xcb0000)
        .setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
        .setTitle(body.name)
        .setURL(`https://www.npmjs.com/package/${pkg}`)
        .setDescription(body.description || 'No description.')
        .addField('❯ Version', body['dist-tags'].latest || 'Unknown', true)
        .addField('❯ License', body.license || 'None', true)
        .addField('❯ Author', body.author ? body.author.name : 'Unknown', true)
        .addField('❯ Creation Date', new Date(body.time.created).format(), true)
        .addField('❯ Modification Date', new Date(body.time.modified).format(), true)
        .addField('❯ Main File', version.main || 'index.js', true)
        .addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.length > 30 ? dependencies.slice(0,30).join(', ') + '...' : dependencies.join(',') : 'None')
        .addField('❯ Maintainers', maintainers.slice(0, 10).join(', '))

    return message.reply(embed)
}


module.exports.props = {
    name: 'npm',
    perms: 'general',
    alias: ['npm', 'nodepackagemanager'],
    args: []
}
    