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
  }

module.exports.props = {
    name: 'warn',
    perms: 'admin',
    alias: ['경고'],
    args: [
      {
        name: 'user/id',
        type: 'text',
        required: true
      },
      {
        name: 'reason',
        type: 'text',
        required: false
      }
    ]
}