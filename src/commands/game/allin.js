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
  message.reply(
    '해당 명령어는 삭제되었습니다. `.슬롯머신` 명령어를 이용해주세요.'
  )
}

module.exports.props = {
  name: 'allin',
  perms: 'general',
  alias: ['올인'],
  args: [{}]
}
