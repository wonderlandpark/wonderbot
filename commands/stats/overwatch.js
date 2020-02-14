const os = require('overwatch-stat');
const moment = require('moment');
require('moment-with-locales-es6');
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
var gamemode = '';
let user;
function get() {
    embed.addField(locale.commands.overwatch.battletag, user.name);
    embed.addField(locale.commands.overwatch.lvl, user.level, true);
    embed.addField('ID', user.id, true);
  if (user.isPublic) {
      os.getStat(user.urlName, 'asia', 'pc')
      .then(async profile => {
        var rank = {};
        // eslint-disable-next-line no-return-assign
        profile.ratings.forEach(el => rank[el.role] = el);
          embed.setThumbnail(profile.icon);
          embed.addBlankField();
          embed.addField(locale.commands.overwatch.overall, locale.commands.overwatch.gamemode[gamemode]);
          if (gamemode !== 'allStats') {
            embed.addField(locale.commands.overwatch.win, profile[gamemode].games.won, true);
            embed.addField(locale.commands.overwatch.playtime, profile[gamemode].careerStats.allHeroes.game.timePlayed, true);
            const heros = [];
            Object.keys(profile[gamemode].topHeroes).forEach(l => {
              heros.push({ name: l, data: profile[gamemode].topHeroes });
            });
            heros = heros.sort(function(a, b) {
              return Number(b.level) - Number(a.level);
            });
            // embed.addField(locale.commands.overwatch.perheros, );
          }
          const time = { competitive: !profile.competitiveStats.careerStats.allHeroes ? '00:00:00' : profile.competitiveStats.careerStats.allHeroes.game.timePlayed+':00', quickPlay : profile.quickPlayStats.careerStats.allHeroes.game.timePlayed};
              const secs = (sec(time.competitive) + sec(time.quickPlay));
              // embed.addField('플레이시간(빠대+경쟁)', moment.duration(secs * 1000).format("D[일] HH:MM:SS") + `\n**옵치를 하지 않았다면??**\n2019년 최저임금으로 **${Math.round(secs / 60 / 60 * 8350)}**원 벌기\n메르시 부활 **${Math.floor(secs/30)}**번`)
              message.channel.stopTyping();
              message.channel.send(embed);
          });
      } else {
      embed.addField(locale.commands.overwatch.nopublic, locale.commands.overwatch.private);
      message.channel.stopTyping();
      message.channel.send(embed);
      data.action.splice(data.action.indexOf(message.author.id), 1);
      }

    }

moment.locale(message.data.locale);
if (!message.data.arg[1]) return message.reply(locale.error.usage(props.name));
if (['경쟁전', '경쟁', '경', 'compete', 'ㄱㅈ', 'ㄱ'].includes(message.data.arg[0])) gamemode = 'competitiveStats';
else if (['빠른대전', '빠대', '빠', 'ㅃ', 'ㅃㄷ', 'quick'].includes(message.data.arg[0])) gamemode = 'quickPlayStats';
else if (['전체', '모든모드', '모두', '모든', '다', '전부', 'all', 'overall', 'ㅁ', 'ㅁㄷ'].includes(message.data.arg[0])) gamemode = 'allStats';
else return message.reply(locale.error.usage(props.name));

await os.getInfo(message.data.arg[1])
.then(async result => {
var txt = '';
let count = 0;
console.log(result);
result = result.filter(r => r.platform == 'pc');
if (result.length == 0) return message.reply(locale.commands.overwatch.nores);
result = result.sort(function(a, b) {
  return Number(b.level) - Number(a.level);
});
if (result.length == 1) user = result[0];
else {
  for (let i = 0; i < 10; i++) {
    if (result[i]) {
    txt += `[${i + 1}] - ${result[i].isPublic ? '🔓' : '🔒'} ${result[i].name} (${result[i].level} ${locale.commands.overwatch.lvl})\n`;
    count += 1;
}
}
txt += `\n${result.length < 10 ? '' : (result.length - 10) + locale.commands.overwatch.more} `;
message.reply('```' + txt + '```');
message.channel.startTyping();
const filter = m => m.author.id === message.author.id && Number.isInteger(Number(m.content)) && Number(m.content) > 0 && Number(m.content) < count + 1;
data.action.push(message.author.id);

await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
.then(async coll => {
    user = result[Number(coll.first().content) - 1];
    })
  .catch(() => {
    data.action.splice(data.action.indexOf(message.author.id), 1);
    message.channel.stopTyping();
    message.reply(locale.error.timeout);
  });
}

})
.then(async () => {
  await get();
  data.action.splice(data.action.indexOf(message.author.id), 1);
});
};


module.exports.props = {
  name: "overwatch",
  perms: "general",
  alias: ["오버워치", "ow"],
  args: [
    {
      name: "gamemode",
      type: "option",
      required: true,
      options: ["경쟁전", "빠른대전", "전체"]
    },
    {
      name: "battletag",
      type: "text",
      required: true
  }
  ]
};

function sec(hms) {
  const a = hms.split(':');
  const h = Number(a[0]);
  const m = Number(a[1]);
  const s = Number(a[2]);
  var seco = 0;
  seco += h * 60 * 60;
  seco += m * 60;
  seco += s;
  return seco;
}

function owRank(str) {
  const emojis = require('../../tools').lib.emojis;
  str = str.toLowerCase();
  if (str.includes('bronze')) return emojis.bronze;
  else if (str.includes('silver')) return emojis.silver;
  else if (str.includes('gold')) return emojis.gold;
  else if (str.includes('platinum')) return emojis.platinum;
  else if (str.includes('diamond')) return emojis.diamond;
  else if (str.includes('master')) return emojis.master;
  else return emojis.grandmaster;
}

String.prototype.secondToHHMMSS = function () {
  var sec_num = parseInt(this, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time = hours+':'+minutes+':'+seconds;
  return time;
};
