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
moment.locale(message.data.locale);
if (!message.data.args) return message.reply(locale.error.usage(props.name));

os.getInfo(message.data.arg[0])
.then(async result => {
var txt = '';
let count = 0;
result = result.filter(r => r.platform == 'pc');
if (result.length == 0) return message.reply(locale.commands.overwatch.nores);
result.sort(function(a, b) {
  return b - a;
});
for (let i = 0; i < 10; i++) {
    if (result[i]) {
    txt += `[${i + 1}] - ${result[i].name} (${result[i].level} ${locale.commands.overwatch.lvl})\n`;
    count += 1;
}
}
txt += `\n${result.length < 10 ? '' : (result.length - 10) + locale.commands.overwatch.more} `;
await message.reply('```' + txt + '```');

const filter = m => m.author.id === message.author.id && Number.isInteger(Number(m.content)) && Number(m.content) > 0 && Number(m.content) < count + 1;
data.action.push(message.author.id);
message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
.then(coll => {
message.channel.startTyping();
    const user = result[Number(coll.first().content) - 1];
    embed.addField(locale.commands.overwatch.battletag, user.name);
    embed.addField(locale.commands.overwatch.lvl, user.level, true);
    embed.addField('ID', user.id, true);


    if (user.isPublic) {
         os.getStat(user.urlName, 'asia', 'pc')
        .then(profile => {
          var rank = {};
          // eslint-disable-next-line no-return-assign
          profile.ratings.forEach(el => rank[el.role] = el);
            embed.setThumbnail(profile.icon);
            embed.addBlankField();
            embed.addField(locale.commands.overwatch.win, profile.gamesWon);
            embed.addField('빠른대전', `승리한 게임 : ${profile.quickPlayStats.games.won}\n칭찬카드 : ${profile.quickPlayStats.awards.cards}\n메달(금/은/동) : ${profile.quickPlayStats.awards.medalsGold} / ${profile.quickPlayStats.awards.medalsSilver} / ${profile.quickPlayStats.awards.medalsBronze}`);
            embed.addField('경쟁전', (tools.lib.emojis.tank + rank.tank !== undefined ? `${owRank(rank.tank.rankIcon)}${rank.tank.level}` : `경쟁전 정보가 없습니다.`) + (tools.lib.emojis.damage + rank.damage !== undefined ? `${owRank(rank.damage.rankIcon)}${rank.damage.level}` : `경쟁전 정보가 없습니다.`) + (tools.lib.emojis.support + rank.support !== undefined ? `${owRank(rank.support.rankIcon)}${rank.support.level}` : `경쟁전 정보가 없습니다.`));
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
})
.catch(err => {
  data.action.splice(data.action.indexOf(message.author.id), 1);
    console.log(err);
    message.reply('시간이 초과되었습니다.');
  });
});
};

module.exports.props = {
  name: "overwatch",
  perms: "general",
  alias: ["오버워치", "ow"],
  args: [
    {
      name: "",
      type: "",
      required: false
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

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time    = hours+':'+minutes+':'+seconds;
  return time;
};