// module.exports.execute = async (
//     client,
//     message,
//     locale,
//     embed,
//     tools,
//     knex,
//     props
// ) => {
//     const user = message.mentions.members.first() || message.guild.members.cache.get(message.data.arg[1])
//     const u = JSON.parse((await knex('users').where({ id: user.id }))[0].badges)
//     if(['추가', 'add'].includes(message.data.arg[0])) {
//         if(u.includes(message.data.arg[2]))
//     }
// }

// module.exports.props = {
//     name: 'setbadge',
//     perms: 'dev',
//     alias: ['뱃지수정', '뱃지설정'],
//     args: [
//         {
//             name: 'option',
//             type: 'option',
//             required: true,
//             options: ['추가', '지우기', '확인']
//         },
//         {
//             name: 'user',
//             type: 'user',
//             required: true
//         },
//         {
//             name: 'number',
//             type: 'number',
//             required: true
//         }
//     ]
// }
