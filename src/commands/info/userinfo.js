module.exports.execute = async( client, message, locale, embed, tools) => {
    const emoji = tools.lib.emojis
    // function game(game){
    //     const name = game.name
    //     const type = game.type

    //     const gamearray = locale.commands.userinfo.gametypes
    //     let b
    //     let a=name.toString().toLowerCase()
    //     const res = emoji.game.find(el=> a.includes(el.query))
    //     if(res) b = res.emoji 
    //     else return locale.commands.userinfo.nogame
    //     return b+' **'+name+'**'+` ${gamearray[type]} ${res.desc ? `\n${res.desc.bind({ details: game.details, state: game.state})}` : ''}`
        
        
    // }

    // function status(name){
    //     let a; let b; let c
    //     a=name.toString().toLowerCase()
    //     if(a === 'online') { b = emoji.online; c=locale.commands.userinfo.online }
    //     else if(a === 'idle') { b = emoji.idle; c=locale.commands.userinfo.idle }
    //     else if(a === 'dnd') { b = emoji.dnd;c=locale.commands.userinfo.dnd }
    //     else if(a === 'offline') { b = emoji.offline;c=locale.commands.userinfo.offline }
    //     else{ b = emoji.streaming; c=locale.commands.userinfo.streaming }
                        
    //     return `${b} ${c}`
    // } 

    const lower = message.data.args.toLowerCase().toString()
    function getuser(callback) {
        if (message.data.args.length===0) return callback(message.member)
        if (message.mentions.members.first()) return callback(message.mentions.members.first())
        const mems = message.guild.members.cache
        const getmem = mems.filter(a => a === lower || a.id === lower || a.displayName.toLowerCase().includes(lower) || a.user.username.toLowerCase() === lower || a.user.tag.toLowerCase() === lower || a.user.discriminator.toLowerCase() === lower).map(a => a)

       
        if (getmem.length === 1) {
            return callback(getmem[0])
        } else if (getmem.length > 1) {
            let order = ''
            let loop
            let moreuser = false
            if (getmem.length >= 5) loop = 5
            if (getmem.length > 5) moreuser = true
            else loop = getmem.length
            for (let i = 0; i < loop; i++) {
                let user = `\n[${i + 1}] ${getmem[i].displayName}${getmem[i].user.bot === true ? ' **[BOT]**' : ''} (${getmem[i].user.tag}) [${getmem[i].id}]`
                order += user
                if (i === loop - 1) {
                    const filter = m => m.author.id === message.author.id
                    if (moreuser === true) order = order+locale.commands.userinfo.more.bind({ count: getmem.length-5 })
                    message.channel.send(locale.commands.userinfo.many + order).then(m => {
                        message.channel.awaitMessages(filter, { max: 1, time: 5000 }).then(collected => {
                            if (Number.isInteger(Number(collected.first().content)) === false) {
                                m.delete().catch(() => {})
                                return message.channel.send(locale.commands.userinfo.notvaild)
                            }
                            if (1 > Number(collected.first().content) || getmem.length < Number(collected.first().content)) {
                                m.delete().catch(() => {})
                                return message.channel.send(locale.commands.userinfo.notvaild + ' ' + locale.commands.userinfo.numberto.bind({ max: getmem.length }))
                            }
                            const collect = Number(collected.first().content) - 1
                            m.delete().catch(() => {})
                            return callback(getmem[collect])
                        }).catch(() => {
                            m.delete().catch(() => {})
                            return callback('timeout')
                        })
                    })
                }
            }
        } else {
            return callback(undefined)
        }


    }
    //Func End
    getuser(async (user) => {
        if (user === 'timeout') return message.channel.send(locale.commands.userinfo.timeout)
        if (!user) return message.channel.send(locale.commands.userinfo.nores)
        embed.setThumbnail(user.user.displayAvatarURL())
        embed.addField(locale.commands.userinfo.username, `${user.user.tag} ${user.user.bot ? emoji.bot : ''}`, true)
        embed.addField('ID', user.id)
        // let gg = user.user.presence.activities.filter(r=> r.type !== 'CUSTOM_STATUS').reverse()
        // if(gg.length === 0) embed.addField(locale.commands.userinfo.game, locale.commands.userinfo.nogame, true)
        // else embed.addField(locale.commands.userinfo.game,user.user.presence.game !== null ? `${game(gg[0])}`:'없음')
        // embed.addField(locale.commands.userinfo.status ,status(user.user.presence.status),true)
        // function getClient(presence,callback){
        //     if(presence ===null) return callback(null)
        //     const platform = locale.commands.userinfo.platform
        //     console.log(presence)
        //     let text = Object.keys(presence).map(el=> platform[el]).join('\n')
        //     callback(text)
        // }   
        // getClient(user.user.presence.clientStatus, (callback)=>{

        //     embed.addField(locale.commands.userinfo.client, callback || locale.commands.userinfo.unknown, true)
        // })
        embed.addField(locale.commands.userinfo.created,`${new Date(user.user.createdAt).format()}(${new Date(user.user.createdAt).fromNow()})`,true)
        embed.addField(locale.commands.userinfo.joined,`${new Date(message.guild.member(user.user).joinedAt).format()}(${new Date(message.guild.member(user.user).joinedAt).fromNow()})`,true)
        embed.addField(locale.commands.userinfo.roles, message.guild.member(user.user).roles.cache.array().join(', ').length > 1000 ? message.guild.member(user.user).roles.cache.array().splice(0, 42).join(', ') + locale.commands.serverinfo.more.bind({ count:  message.guild.member(user.user).roles.cache.array().length - 42 }) :  message.guild.member(user.user).roles.cache.array().join(', '))
        message.channel.send(embed)
        
    

    
    
    
    })}   



module.exports.props = {
    name: 'userinfo',
    perms: 'general',
    alias: ['유저정보'],
    args: []
}