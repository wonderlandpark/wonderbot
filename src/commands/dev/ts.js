/* eslint-disable no-unused-vars */
const tsEval = require('ts-eval')

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
    const value = tsEval.transpileEval(message.data.args)
    message.reply('Evaling...').then(async m => {
        const result = new Promise(resolve => resolve(eval(value)))

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
                embed.addField('INPUT', '```ts\n' + message.data.args + '```')
                embed.addField('COMPILED', '`' + value + '`')
                embed.addField('OUTPUT', '```ts\n' + output + '```')
                embed.setColor('GREEN')
                return m.edit(embed)
            })
            .catch(error => {
                console.error(error)
                error = error.toString()

                if (error.includes(client.token))
                    error = error.replace(client.token, '(accesstoken was hidden)')
                embed.setTitle('SCRIPT')
                embed.addField('INPUT', '```ts\n' + message.data.args + '```')
                embed.addField('OUTPUT', 'err')
                embed.addField('ERROR', '```ts\n' + error + '```')
                embed.setColor('RED')
                return m.edit(embed)
            })
    })
}

module.exports.props = {
    name: 'ts',
    perms: 'dev',
    alias: ['타스', 'typescript'],
    args: [
        {
            name: 'script',
            type: 'text'
        }
    ]
}
