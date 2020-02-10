const commands = require("../../commands");
const tools = require("../");
const knex = tools.database;
const data = { register: [], cooldown: {}, action: [], slot: {}, onlineMode: true };
const fs = require('fs');

module.exports = async (client, message, config) => {
  const embed = new require("./embed")(client, message);
  message.data = {
    raw: message.content,
    arg: message.content.split(" ").slice(1),
    args: message.content.slice(message.content.split(" ")[0].length + 1),
    arg2: message.content
      .split(" ")
      .splice(2)
      .join(" "),
    prefix: config.client.prefix,
    cmd: message.content
      .split(" ")[0]
      .replace(config.client.prefix, "")
      .toLowerCase(),
    locale: "ko"
  };
  const locale = require("../../locale")[message.data.locale];

  if (
    message.author.bot ||
    !message.content.startsWith(config.client.prefix) ||
    !message.data.cmd ||
    !message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS") ||
    !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")
  )
    return;
  if (!commands[message.data.cmd]) return;
  if (!config.client.owners.includes(message.author.id) && !data.onlineMode) return message.reply(locale.error.offline);
  var log = `${new Date().textFormat('YYYY/MM/DD HH:MM:SS')} ${message.author.tag} : ${message.content}`;
  fs.appendFile('./logs/cmd.log', log + '\n', function (err) {
    if (err) throw err;
    console.log(log);
  });
  const user = await knex
    .select("*")
    .from("users")
    .where({ id: message.author.id });
  if (user.length == 0)
    return commands["register"].execute(
      client,
      message,
     locale,
      embed,
      tools,
      knex,
      commands[message.data.cmd].props,
      data
    );
  var blacked = await knex
    .select("*")
    .from("blacklist")
    .where({ id: message.author.id });
  if (blacked.length == 1 && blacked[0].time > new Date() / 1000)
    return message.reply(
     locale.error.blacklist.bind({
        time: new Date(Math.round(blacked[0].time * 1000)).format(
          message.data.locale
        ),
        reason: blacked[0].why
      })
    );
  if (data.action.includes(message.author.id))
    return message.reply(locale.error.already);
  if (
    data.cooldown[message.author.id] &&
    Number(data.cooldown[message.author.id]) > Number(new Date()) &&
    !JSON.parse(user[0].badges).includes("premium")
  ) {
    return message.reply(
     locale.error.cooldown.bind({
        time: Number(
          (Number(data.cooldown[message.author.id]) - Number(new Date())) / 1000
        ).toFixed(2)
      })
    );
  }

  if (
    !message.member.hasPermission(
      commands[message.data.cmd].props.perms.required.perms
    )
  )
    return message.reply(
     locale.error.noperm.bind({
        perms: commands[message.data.cmd].props.perms.name
      })
    );
  if (
    commands[message.data.cmd].props.perms.required.id
      ? !commands[message.data.cmd].props.perms.required.id.includes(
          message.author.id
        )
      : false
  )
    return message.reply(
     locale.error.noperm.bind({
        perms: commands[message.data.cmd].props.perms.name
      })
    );
  // eslint-disable-next-line require-atomic-updates
  data.cooldown[message.author.id] = new Date(Number(new Date()) + 3000);
      commands[message.data.cmd].execute(
      client,
      message,
      locale,
      embed,
      tools,
      knex,
      commands[message.data.cmd].props,
      data
    ).catch(e => {
      console.log(e);
      message.reply(locale.error.onerror.bind({ error: e, cmd: message.data.cmd, msg: message.content, perm: message.guild.me.permissions.bitfield }));
  });
};
