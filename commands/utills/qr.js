const QRCode = require('qrcode');
module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (!message.data.args) return message.reply(locale.error.usage(props.name));
  QRCode.toString('https://github.com/', function (err, url) {
    embed.addField('QRCODE', '```\n' + url + '\n```')
    return message.reply(embed)
})

};
module.exports.props = {
  name: 'qr',
  perms: 'general',
  alias: ['qr코드'],
  args: [
    {
      name: 'text',
      type: 'text',
      required: true
    }
  ]
};
