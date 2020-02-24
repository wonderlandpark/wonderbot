module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  const stocks = await knex('stocks').select('*')

  if (!props.args[0].options.includes(message.data.arg[0])) {
    message.reply(locale.error.usage(props.name));
  } else {
    var leaderboard = 
      message.data.arg[0] == '전체' || message.data.arg[0] == 'global'
        ? await knex
            .select('*')
            .from('users')
        : await knex
            .select('*')
            .from('users')
            .whereIn(
              'id',
              message.guild.members.map(r => r.id)
            )
    var txt = '';
    leaderboard.sort(function(a,b){
      var bm = 0
      var am = 0
    Object.keys(JSON.parse(b.items)).forEach(el=> {
    bm += (stocks.find(i=> i.name == el).now * JSON.parse(b.items)[el])
      })
     Object.keys(JSON.parse(a.items)).forEach(el=> {
         am += (stocks.find(i=> i.name == el).now * JSON.parse(a.items)[el])
       })
      if(Number.isNaN(am)) am = 0;
      if(Number.isNaN(bm)) bm = 0;
     return (bm + b.money) - (am + a.money)
      
    })


    for (var i = 1; i < 11; i++) {
      var m = 0
      Object.keys(JSON.parse(leaderboard[i-1].items)).forEach(el=> {
        m += (stocks.find(i=> i.name == el).now * JSON.parse(leaderboard[i-1].items)[el])
      })
      if (leaderboard[i - 1])
        txt +=
          `\n${i}. [${
            client.users.get(leaderboard[i - 1].id)
              ? client.users.get(leaderboard[i - 1].id).tag
              : 'None'
          }](${locale.commands.leaderboard.all} ` +
          num2han(m + leaderboard[i-1].money) +
          locale.commands.money.won +
          ')';
    }
    message.channel.send(
      '```md\n' +
        locale.commands.leaderboard.leaderboard.bind({
          season: require('../../config').client.bot.season
        }) +
        `\n${
          message.data.arg[0] == '전체' || message.data.arg[0] == 'global'
            ? locale.commands.leaderboard.global
            : locale.commands.leaderboard.guild.bind({
                server: message.guild.name
              })
        }\n ` +
        txt +
        '```'
    );
  }
};

module.exports.props = {
  name: 'leaderboard',
  perms: 'general',
  alias: ['리더보드', '랭킹', '순위'],
  args: [
    {
      name: 'option',
      type: 'text',
      required: false,
      options: ['전체', '서버', '길드', 'global', 'guild']
    }
  ]
};

function num2han(number) {
  var inputNumber = number < 0 ? false : number;
  var unitWords = ['', '만', '억', '조', '경'];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = '';

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var a = 0; a < resultArray.length; a++) {
    if (!resultArray[a]) continue;
    resultString = ' ' + String(resultArray[a]) + unitWords[a] + resultString;
  }

  return resultString.replace(' ', '');
}
