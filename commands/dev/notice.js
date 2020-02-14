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
) => {
  client.guilds.forEach(el => {
  });
};

module.exports.props = {
  name: "notice",
  perms: "dev",
  alias: ['공지'],
  args: [
    {
      name: "text",
      type: "text",
      required: true
    }
  ]
};
