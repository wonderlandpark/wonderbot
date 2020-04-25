module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex
) => {
    const res = await knex('lotto')
    const info = (await knex('info').select([ 'lotto' ]))[0].lotto
    const arr = getNumber()
    await knex('lotto').insert({ id: res.length, date: Math.round(new Date() / 1000), numbers: arr.toString(), prize: info })
    await knex('info').update({ lotto: 0 })
    message.reply(`로또 추첨 ${res.length}회\n\n${arr.slice(0, 4).map(r=> numbers[r]).join(' ')} + ${numbers[arr[4]]}\n\n구매된 복권: ${info}`)
}

module.exports.props = {
    name: 'picklotto',
    perms: 'dev',
    alias: ['로또추첨'],
    args: [{}]
}



function Shuffle(o) {
    for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o
}

function getNumber(){

    return Shuffle([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]).slice(0,5)

}

const numbers = {
    0: '0️⃣',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    10: '🔟'
}