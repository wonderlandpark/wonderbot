/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Dokdo = require('dokdo')
const config = require('../../config')
const Discord = require('discord.js')
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
    console.log(client instanceof Discord.Client)
    // console.log(client.constructor)
    const DokdoHandler = new Dokdo(client, { aliases: ['dokdo', 'dok'], prefix: message.data.prefix, owners: config.client.owners })
    DokdoHandler.run(message)
}

module.exports.props = {
    name: 'dokdo',
    perms: 'dev',
    alias: ['dok'],
    args: [
        {
            name: 'option',
            type: 'option',
            required: true,
            options: ['Dokdo Options']
        },
    ]
}