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
    const info = (await knex('info'))[0].stock
    if (data.news.time / 1000 < info) {
        const stocks = await knex('stocks')
        data.news.data = newNews(stocks)
        data.news.time = new Date()
    }
    embed.setTitle(locale.commands.news.news)
    embed.setDescription(
        '\n' +
      data.news.data.map(a => `> 📢 **${a}**\n`).join('\n') +
      locale.commands.news.desc
    )
    return message.reply(embed)
}

module.exports.props = {
    name: 'news',
    perms: 'general',
    alias: ['뉴스', '알림'],
    args: []
}

function newNews(arr) {
    const data = require('./newsData')
    const all = Shuffle(arr).slice(0, 3)
    const res = []
    all.forEach(el => {
        if (el.lastchange >= 0) res.push(data.good[el.name].random())
        else res.push(data.bad[el.name].random())
    })
    return res
}

function Shuffle(o) {
    for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o
}
