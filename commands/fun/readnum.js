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
  var HanTools = require("hangul-tools");
  if (!message.data.arg[0] || isNaN(message.data.arg[0]))
    return message.reply(locale.error.usage(message.data.cmd));
  else {
    content = message.data.arg[0];
    if (content >= 9999999999999999)
      message.reply(
        "`" + HanTools.readNumber(content) + "`\n" + locale.commands.readnum.big
      );
    else if (content < 0)
      message.reply(
        "`마이너스 " +
          HanTools.readNumber(Number(-1 * content).toString()) +
          "`\n" +
          locale.commands.readnum.minus
      );
    else message.reply("`" + HanTools.readNumber(content) + "`");
  }
};

module.exports.props = {
  name: "readnum",
  perms: "general",
  alias: ["수읽기"],
  args: [
    {
      name: "number",
      type: "number",
      required: true
    }
  ]
};
