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


    const allInfo = (await knex('info'))[0]
    const info = allInfo.stock
    if (data.news.time / 1000 < info) {
        const stocks = await knex('stocks')
        data.news.data = await newNews(stocks)
        data.news.time = new Date()
    }
    embed.setTitle(locale.commands.news.news.bind({ name: Names[message.guild.shardID] }))
    embed.setDescription(
        '\n' +
      data.news.data.map(a => `> 📢 **${a}**\n`).join('\n') +
      locale.commands.news.desc
    )
    return message.reply(embed)

    async function newNews(arr) {
        const lotto = (await knex('lotto'))
        const data = require('./newsData')
        const all = Shuffle(arr).slice(0, 4)
        const res = []
        let past = lotto[lotto.length-1].numbers.split(',')
        const bindData = { past: lotto.length - 1, pastNum: past.slice(0, 4).join(' ') + ' + ' + past[4], pastCount: lotto[lotto.length-1].prize, now: lotto.length, nowCount: allInfo.lotto }
        all.forEach(el => {
            if (el.lastchange >= 0) res.push(data.good[el.name].random().bind(bindData))
            else res.push(data.bad[el.name].random().bind(bindData))
        })
        return res
    }


}

module.exports.props = {
    name: 'news',
    perms: 'general',
    alias: ['뉴스', '알림'],
    args: []
}



function Shuffle(o) {
    for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o
}


const Names = [ '원더경제', '앞으로일보', '칼리스토 뉴스', '헬로, 뉴스']