const Discord = require('discord.js')
const icon = ['🦄', '🐴', '🐌', '🐢', '🦥', '🦓', '🦏', '🐛', '🐳', '🦀']

module.exports = class Race {
    constructor(message, knex) {
        this.author = message.member
        this.time = new Date()
        this.channel = message.channel
        this.members = new Discord.Collection()
        this.started = false
        this.prize = Number(message.data.arg[1])
        this.timer = setTimeout(()=> {
            this.play()
        }, 120000)
        this.knex = knex
    }
    async join(message) {
        if(this.started) return message.reply('이미 게임이 진행중입니다.')
        if(this.members.has(message.member.id)) return message.reply('이미 게임에 참가했습니다.')
        if(this.members.size >= 10) return message.reply('경주는 최대 10명만 참가할 수 있습니다.')
        else {
            const p = await this.pay(message.author.id, this.prize).then(r=> r)

            if(p) {
                this.members.set(message.member.id, message.member)
                if(this.members.size === 0) await message.reply('wtf')
                else if(this.members.size === 1) await message.channel.send('{member}님이 새로운 경주 게임을 시작하였습니다!\n\n\n**{money}**원을 소지하셨다면, 게임에 참가할 수 있습니다.\n`{prefix}경주 시작`으로 게임을 진행할 수 있으며, **2분** 대기 후 지동으로 게임을 시작합니다.\n`{prefix}경주 참가`로 게임을 참가하세요.'.bind({ prefix: message.data.prefix, money: this.prize, member: message.member }))
                else await message.reply('게임을 참가하며 **{money}**원을 지불하였습니다!\n경주게임에서 승리시, 돈을 돌려받으실 수 있으며, `{prefix}경주 나가기`로 배팅금을 돌려받을 수 있습니다.'.bind({ money: this.prize, prefix: message.data.prefix }))
            }
            else {
                if(this.members.size === 0) clearTimeout(this.timer)
                return message.reply('해당 게임에 참가하시려면 상금인 {money}원을 소지하고 계셔야합니다.'.bind({ money: this.prize }))
            }

        }
    }
    async leave(message){
        if(this.started) return message.reply('이미 게임이 진행중입니다.')
        if(!this.members.has(message.member.id)) message.reply('게임에 참가하지 않았습니다.')
        else {
            if(message.author.id === this.author.id) return message.reply('방 생성자는 나갈 수 없습니다.\n`{prefix}경주 폭파`를 이용해주세요.'.bind({ prefix: message.data.prefix }))
            this.members.delete(message.member.id)
            await this.back(message.author.id, this.prize)
            message.reply('게임에서 나갔습니다. (돈은 반환되었습니다)')
            if(this.members.size === 0) this.destroy()
        }
    }
    async play(message){
        if(message && message.author.id !== this.author.id) return message.reply('경주방장만 시작할 수 있습니다.')

        clearTimeout(this.timer)
        
        if(this.members.size <= 1) {
            this.channel.send(`${this.author}, 경주 참가자가 없어 게임이 취소되었습니다.`)
            return this.destroy()
        }
        else {
            this.started = true
            let players = shuffle(icon)
            let mems = this.members.array()
            
            const m = await this.channel.send(mems.map((el, n) => {
                mems[n].process = 0
                return `${players[n]}${'.'.repeat(100)}🏁 [ ${el} ]`
            } ).join('\n'))
            
            this._run(m, mems, players)
        }
    }
    async _run(msg, users, players) {
        setTimeout(async ()=> {
            await msg.edit(users.map((el, n)=> {
                let rand = (users[n].process + (Math.floor(Math.random() * 20) -7))
                users[n].process = (users[n].process + (rand)) >= 100 ? 100 : (users[n].process + (rand)) <= 0 ? 1 : (users[n].process + (rand))
                return `${'.'.repeat(users[n].process)}${players[n]}${'.'.repeat(100 - users[n].process)}🏁 [ ${el} ]`
            }).join('\n'))
            if(users.filter(el=> el.process >= 100).length >= 1) {
                this.destroyed = true
                await users.filter(el=> el.process >= 100).forEach(u=> this.back(u.id, Math.round(this.prize*this.members.size/users.filter(el=> el.process >= 100).length)))
                return await this.channel.send(`**🥳 축하합니다 🥳**\n우승: ${users.filter(el=> el.process >= 100).join(' ')}\n\n우승자에게 **${Math.round(this.prize*this.members.size/users.filter(el=> el.process >= 100).length)}**원이 지급됩니다!`)
            }
            else this._run(msg, users, players)
        }, 800)
    }
    destroy(message) {
        if(message && message.author.id !== this.author.id) return message.reply('경주방장만 폭파할 수 있습니다.')
        if(this.started && message) return message.reply('이미 게임이 시작하였습니다!')
        this.destroyed = true
        clearTimeout(this.timer)
        this.members.each(v=> this.back(v.id, this.prize))
        if(message) message.channel.send('경주가 취소되었습니다.')
        else this.channel.send('경주가 취소되었습니다.')
    }
    async pay(id, money) {
        const user = (await this.knex('users').where({ id }))[0].money
        if(user < money) {
            return false
        } else {
            await this.knex('users').where({ id }).update({ money: user - money })
            return true
        }
    }

    async back(id, money) {
        const user = (await this.knex('users').where({ id }))[0].money
        await this.knex('users').where({ id }).update({ money: Number(user)+money})
    }
}

function shuffle(a) {
    let j, x, i
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
    }
    return a
}
