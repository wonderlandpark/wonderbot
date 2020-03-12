module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (!message.data.arg[0]) {
    message.reply(locale.error.usage(props.name))
  }
  var Inko = require('inko')
  var inko = new Inko()
  var content = message.data.args
  message.delete()
  message.channel.send(message.author + ' : ' + inko.ko2en(content))
}

module.exports.props = {
  name: 'en',
  perms: 'general',
  alias: ['영어로'],
  args: [
    {
      name: 'text',
      type: 'text',
      required: true
    }
  ]
}
