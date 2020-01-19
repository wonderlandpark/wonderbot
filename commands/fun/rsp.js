module.exports = async (client, message, command, embed, commands, Discord, config,random,data) => {
// const config = require("./settings/config.json");
// const prefix = (config.prefix)

var a = random(['가위', '바위', '보'])
var usera = message.data.arg[0]


if (usera=='가위'||usera=='가'||usera=='묵'||usera=='scissor')b = '가위'
else if (usera=='바위'||usera=='바'||usera=='rock'||usera=='찌')b = '바위'
else if (usera=='보'||usera=='보자기'||usera=='paper'||usera=='빠')b = '보'
else b = undefined
if (b == undefined){
  return message.channel.send(`\`\`\`${config.prefix}${command.usage}\`\`\``)}

else{
message.reply('안내면 진다! 가위바위보!')
if (a==b){ //비긴경우
embed.addField('가위바위보',`봇 : ${a}\n당신 : ${b}\n비겼군요!!\n\`다시하자!\``)
}
else if ((b=='가위' && a == '보')||(b=='바위' && a == '가위')||(b=='보' && a == '주먹')) {//승리 경우
embed.addField('가위바위보',`봇 : ${a}\n당신 : ${b}\n당신이 이겼군요!\n\`이겼닭! 오늘 저녁은 치킨이닭!\``)
}
else {//패배 경우
embed.addField('가위바위보',`봇 : ${a}\n당신 : ${b}\n당신이 졌군요!\n\`그럴 수 있어. 이런 날도 있는 거지 뭐..\``)

}
return message.channel.send(embed)
}
}