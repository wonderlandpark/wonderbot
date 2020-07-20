/* eslint-disable no-unused-vars */
const py = require('python-exec')
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
        const result = new Promise(resolve => resolve(py.execByText3(message.data.args)))

        return result
            .then(output => {
                if (typeof output !== 'string')
                    output = require('util').inspect(output, {
                        depth: 0
                    })
                if (output.includes(client.token))
                    output = output.replace(client.token, '(accesstoken was hidden)')
                if (output.length > 1010)
                    console.log(output), (output = output.slice(0, 1010) + '\n...')

                embed.setTitle('SCRIPT')
                embed.addField('INPUT', '`' + message.data.args + '`')
                embed.addField('OUTPUT', '```js\n' + output + '```')
                embed.setColor('GREEN')
                return m.edit(embed)
            })
            .catch(error => {
                console.error(error)
                error = error.toString()

                if (error.includes(client.token))
                    error = error.replace(client.token, '(accesstoken was hidden)')
                embed.setTitle('SCRIPT')
                embed.addField('INPUT', '`' + message.data.args + '`')
                embed.addField('OUTPUT', 'err')
                embed.addField('ERROR', '```js\n' + error + '```')
                embed.setColor('RED')
                return m.edit(embed)
            })
    })
}

module.exports.props = {
    name: 'py',
    perms: 'dev',
    alias: ['python', '파이썬', '파이썬2'],
    args: [
        {
            name: 'script',
            type: 'text'
        }
    ]
}
