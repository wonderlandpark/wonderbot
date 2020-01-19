module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  _tools,
  knex
) => {
  const time = new Date();
  message.channel.send(locale.commands.ping.ping).then(m => {
    knex
      .select("*")
      .from("users")
      .then(gg => {
        embed.addField(
          locale.commands.ping.this,
          locale.commands.ping.pong.bind({
            bot: m.createdTimestamp - message.createdTimestamp,
            api: Math.round(client.ping),
            db: new Date() - time
          })
        );

        m.edit(embed);
      });
  });
};
module.exports.props = {
  name: "ping",
  perms: "general",
  alias: ["pong", "핑"],
  args: []
};
