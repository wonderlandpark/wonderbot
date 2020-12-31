module.exports.execute = async ( client, message, locale, embed, tools, knex ) => {
    if(!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const id = message.data.arg[0].split('-').join('')
    const coupon = await knex('coupon').where({ id }).andWhere('expire', '>', Math.round(new Date()/1000))
    if (coupon.length === 0) return message.reply('**올바른 쿠폰 번호가 맞나요..?**\n\n올바르지 않은 쿠폰 번호이거나, 만료되었습니다!')
    if(coupon[0].used.includes(message.author.id)) return message.reply('**이미 사용하신 쿠폰입니다!!**')
    if(coupon[0].quantity < 1) return message.reply('**해당 쿠폰은 만료되었습니다.**')
    if(coupon[0].type === 'premium') {
        if((coupon[0].option & 1) && message.data.premium) return message.reply('**죄송합니다 해당 쿠폰은 사용하실 수 없습니다.**\n\n해당 쿠폰은 원더봇 프리미엄이 적용되있지 않은 경우에만 사용하실 수 있습니다.')
        const used = JSON.parse(coupon[0].used)
        used.push(message.author.id)
        console.log(`COUPON: ${id} | USER: ${message.author.id} | TYPE: premium | VALUE: ${coupon[0].value} | LEFT: ${coupon[0].quantity - 1}`)
        client.webhook.send(`COUPON: ${id} | USER: ${message.author.id} | TYPE: premium | VALUE: ${coupon[0].value} | LEFT: ${coupon[0].quantity - 1}`)
        await knex('coupon').update({ quantity: coupon[0].quantity - 1, used: JSON.stringify(used) }).where({ id: coupon[0].id })
        await knex('users').update({ premium: message.data.premiumTime > new Date() ? Math.round(message.data.premiumTime/1000) + coupon[0].value : Math.round(new Date() / 1000) + coupon[0].value }).where({ id: message.author.id })

        return message.reply(`**쿠폰이 적용되었습니다**\n\n적용된 쿠폰: 원더봇 프리미엄 ${Math.round(coupon[0].value / (86400))}일`)
        
    } else return message.reply('**올바르지 않은 쿠폰입니다.**\n\n지원하지 않는 쿠폰 타입입니다.')
    
}

module.exports.props = {
    name: 'redeem',
    perms: 'general',
    alias: ['쿠폰'],
    args: [
        {
            name: 'coupon',
            type: 'text',
            required: true,
        }
    ]
}
