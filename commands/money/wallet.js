const lib = require("../../tools/lib");

module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex
) => {
  const user = message.member;
  const obj = await knex
    .select("*")
    .from("users")
    .where({ id: user.id });
  if (obj.length == 0) return message.reply(locale.error.nouser);
  else {
    const u = (
      await knex("users")
        .select("*")
        .where({ id: message.data.arg[0] })
    )[0];
    const stock = await knex("stock").select("*");
    embed.addField(
      locale.commands.wallet.profile.bind({ user: user.user.tag }),
      locale.commands.wallet.bind({ money: u["money"] })
    );

    message.channel.send(embed);
  }
};

module.exports.props = {
  name: "wallet",
  perms: "general",
  alias: ["지갑"],
  args: []
};

function getMoney(user, stock) {
  user.stocks.forEach(i => {
    stock[i];
  });
}
