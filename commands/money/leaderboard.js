var HanTools = require("hangul-tools");
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
  if (!props.args[0].options.includes(message.data.arg[0])) {
    message.reply(locale.error.usage(props.name));
  } else {
    const leaderboard =
      message.data.arg[0] == "전체" || message.data.arg[0] == "global"
        ? await knex
            .select("*")
            .from("users")
            .whereNot("money", 0)
            .orderBy("money", "DESC")
        : await knex
            .select("*")
            .from("users")
            .whereNot("money", 0)
            .whereIn(
              "id",
              message.guild.members.map(r => r.id)
            )
            .orderBy("money", "DESC");
    var txt = "";
    for (i = 1; i < 11; i++) {
      if (leaderboard[i - 1])
        txt +=
          `\n${i}. [${client.users.get(leaderboard[i - 1].id).tag}](` +
          num2han(leaderboard[i - 1].money) +
          locale.commands.money.won +
          ")";
    }
    message.channel.send(
      "```md\n" +
        locale.commands.leaderboard.leaderboard.bind({
          season: require("../../config").client.bot.season
        }) +
        `\n${
          message.data.arg[0] == "전체" || message.data.arg[0] == "global"
            ? locale.commands.leaderboard.global
            : locale.commands.leaderboard.guild.bind({
                server: message.guild.name
              })
        }\n ` +
        txt +
        "```"
    );
  }
};

module.exports.props = {
  name: "leaderboard",
  perms: "general",
  alias: ["리더보드", "랭킹", "순위"],
  args: [
    {
      name: "option",
      type: "text",
      required: false,
      options: ["전체", "서버", "길드", "global", "guild"]
    }
  ]
};

function num2han(number) {
  var inputNumber = number < 0 ? false : number;
  var unitWords = ["", "만", "억", "조", "경"];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = "";

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = " " + String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString.replace(" ", "");
}
