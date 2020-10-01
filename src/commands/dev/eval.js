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
    if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))

    if (
        message.data.args.includes('client.token') &&
    message.data.args.includes('message')
    ) {
        return message.channel.send('Sending Token??')
    }
    message.reply('Evaling...').then(async m => {
        const result = new Promise(resolve => resolve(eval(message.data.args)))

        return result
            .then(output => {
                if (typeof output !== 'string')
                    output = require('util').inspect(output, {
                        depth: 0
                    })
                if (output.includes(client.token))
                    output = output.replace(new RegExp(client.token, 'gi'), '(accesstoken was hidden)')
                if (output.length > 1500)
                    console.log(output), (output = output.slice(0, 1500) + '\n...')
                return m.edit('**INPUT**\n```js\n' + message.data.args + '```\n**OUTPUT**\n```js\n' + output + '```')
            })
            .catch(error => {
                console.error(error)
                error = error.toString()

                if (error.includes(client.token))
                    error = error.replace(new RegExp(client.token, 'gi'), '(accesstoken was hidden)')
                return m.edit('**INPUT**\n```js\n' + message.data.args + '```\n**OUTPUT**\n```js\n' + error + '```')

            })
    })
}

module.exports.props = {
    name: 'eval',
    perms: 'dev',
    alias: ['실행', 'cmd', 'script', '이블', 'js'],
    args: [
        {
            name: 'script',
            type: 'text'
        }
    ]
}
