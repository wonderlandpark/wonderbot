/* eslint-disable no-unused-vars */
module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props,
  data
) => {};

module.exports.props = {
  name: "notice",
  perms: "dev",
  alias: ['봇초대'],
  args: [
    {
      name: "text",
      type: "text",
      required: true
    }
  ]
};
