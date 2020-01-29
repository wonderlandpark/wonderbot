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
  if (
    (
      await knex
        .select("*")
        .from("users")
        .where({ id: message.author.id })
    )[0].money == 0
  )
    return message.reply(locale.commands.allin.nomoney);
  if (!message.guild.me.hasPermission("ADD_REACTIONS")) {
    message.reply(
      locale.error.botperm.bind({ perms: locale.perm["ADD_REACTIONS"] })
    );
  } else {
    var msg = message.channel.send(locale.commands.allin.ask);
    data.action.push(message.author.id);
    const filter = (reaction, user) =>
      reaction.emoji.name == "💸" && user.id == message.author.id;
    msg.then(async m => {
      m.react("💸");
      m.awaitReactions(filter, { max: 1, time: 10000, error: ["time"] })
        .then(async collected => {
          if (collected.size == 0) {
            data.action.splice(data.action.indexOf(message.data.id), 1);
            return message.reply(locale.commands.allin.not);
          }

          var g = message.channel.send(locale.commands.allin.start);
          g.then(async gg => {
            gg.edit(gg.content + "\n" + locale.commands.allin.then);
            setTimeout(async function() {
              const res = [true, false].random();
              const u = (
                await knex
                  .select("*")
                  .from("users")
                  .where({ id: message.author.id })
              )[0];
              const money = u.money;
              const multi = u.multiples + 1;

              if (res) {
                await knex
                  .update({ money: money * 2 * multi, multiples: multi })
                  .from("users")
                  .where({ id: message.author.id });
                message.reply(
                  locale.commands.allin.success.bind({
                    money: money * 2 * multi,
                    mul: 2 * multi,
                    n: multi
                  })
                );
                data.action.splice(data.action.indexOf(message.data.id), 1);
              } else {
                await knex
                  .update({ money: 0, multiples: 0 })
                  .from("users")
                  .where({ id: message.author.id });
                message.reply(locale.commands.allin.fail);
                data.action.splice(data.action.indexOf(message.data.id), 1);
              }
            }, 500);
          });
        })

        .catch(message.reply(locale.commands.allin.not));
    });
  }
};

module.exports.props = {
  name: "allin",
  perms: "general",
  alias: ["올인"],
  args: [{}]
};
