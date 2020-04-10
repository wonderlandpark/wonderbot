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
  if(!message.data.args || isNaN(message.data.arg[0])) return message.reply(locale.error.usage(props.name))
  const m = (
    await knex
      .select('*')
      .from('users')
      .where({ id: message.author.id })
  )[0].money

if (
  data.trick[message.author.id] &&
  data.trick[message.author.id] + 120000 > Number(new Date())
)
  return message.reply(
    locale.commands.trick.cooldown.bind({
      time: Number(
        new Date(
          Number(new Date(data.trick[message.author.id])) +
            120000 -
            Number(new Date())
        ) / 1000
      ).toFixed(1)
    })
  )

  if (Number(message.data.arg[0]) < 100) return message.reply(locale.commands.trick.morethan)
  if (m < Number(message.data.arg[0])) return message.reply(locale.commands.trick.nomoney)
  const msg = await message.reply(locale.commands.trick.start)
  const random = [1,2,3].random()
  setTimeout(async function(){
    msg.edit(msg.content + locale.commands.trick.mix)
  }, 1000)
  data.action.push(message.author.id)
  const filter = m => m.author.id === message.author.id
  await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
    .then(async collected => {
      if(![1,2,3].includes(Number(collected.first().content))) {
        data.action.splice(data.action.indexOf(message.data.id), 1)
        return message.reply(locale.commands.trick.wrongres)
      }
      data.trick[message.author.id] = Number(new Date())
      if(random == collected.first().content) {
        await knex('users').update({ money: m + Number(message.data.arg[0]) * 2}).where({ id: message.author.id })
        message.reply(locale.commands.trick.right)
        data.action.splice(data.action.indexOf(message.data.id), 1)
        
      }
      else {
        await knex('users').update({ money: m - Number(message.data.arg[0])}).where({ id: message.author.id })
        message.reply(locale.commands.trick.wrong)
        data.action.splice(data.action.indexOf(message.data.id), 1)
      }
    })
    .catch(() => {
      data.action.splice(data.action.indexOf(message.data.id), 1)
      message.reply(locale.commands.trick.timeout)
    });
  }
module.exports.props = {
  name: 'trick',
  perms: 'general',
  alias: ['야바위', 'trickery'],
  args: [
    {
      name: 'bet',
      type: 'number',
      required: false
    }
  ]
}
