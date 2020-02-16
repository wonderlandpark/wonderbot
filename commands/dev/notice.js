var success = [];
var fail = [];
var created = [];
module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (!message.data.args) {
    return message.reply(locale.error.usage(props.name));
  }

  message.reply('공지사항 전송을 시작합니다...');

  for (let k = 0; k < client.guilds.length; k++) {
    const guild = client.guilds[k];
    const el = guild; // NOTE: Port to original code
    const channel =
      guild.channels.filter(c => c.type === 'text' &&
        (
          c.name.includes('공지') ||
          c.name.includes('notice') ||
          c.name.includes('원더봇') ||
          c.name.includes('알림') ||
          c.name.includes('announcement')
        ) &&
        !(
          c.topic !== null &&
          c.topic.includes('NONOTICE')
        ));

    setTimeout(() => {
      if (channel.first()) {
        channel.first().send(message.data.args.replace(/%owner%/gi, `<@!${el.owner.id}>`).replace(/%guild%/gi, el.name))
        .then(() => success.push(el.id))
        .catch(() => {
          el.createChannel('공지-자동생성됨')
          .then(c => {
            c.send(message.data.args.replace(/%owner%/gi, `<@!${el.owner.id}>`).replace(/%guild%/gi, el.guild.name));
            created.push(el.id);
          })
          .catch(() => fail.push(el.id));
        });
      } else {
        el.createChannel('공지-자동생성됨')
        .then(c => {
          c.send(message.data.args.replace(/%owner%/gi, `<@!${el.owner.id}>`).replace(/%guild%/gi, el.guild.name));
          created.push(el.id);
        })
        .catch(() => fail.push(el.id));
      }
    }, 600 * k);
  }

  message.reply('공지 전송을 완료했습니다');
};

module.exports.props = {
  name: "notice",
  perms: "dev",
  alias: ['공지'],
  args: [
    {
      name: "text",
      type: "text",
      required: true
    }
  ]
};
