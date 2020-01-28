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
  if (!message.data.args) return message.reply(locale.error.usage(props.name));
  this.bash = {
    dir: 'guild',
    guild: message.guild,
    channel: message.channel,
    user: message.member,
    message: message
  };

  const con = run(message.data.args, this.bash);
  console.log(con);
  var txt = `${message.author.username}@wonderbot: /wonderbot/guilds/${message.guild.id}# ${message.data.args}\n`;
  return message.reply(txt + con.return.str, { code: 'cmd' });
};

module.exports.props = {
  name: "wonderbot",
  perms: "dev",
  alias: ["bot", "bash"],
  args: [
    {
      name: "script",
      type: "text"
    }
  ]
};

function run (script, obj) {
  var args = [];
  const opt = script.match(/(--[^ ]*( [^ ]*|))/gi);
  if (opt && opt.length !== 0) {
    opt.forEach(g => {
      if (g.split(' ').length > 0) {
        args.push({ name: g.split(' ')[0], value: g.split(' ')[1] });
      } else {
        args.push({ name: g });
      }
    });
  }
    obj.args = args;
    obj.cmd = script.split(' ')[0];
    switch (obj.cmd) {
      case 'ls':
      case 'dir':
        if (obj.dir == 'guild') obj.return = { level: 'success', type: 'DIR', str: 'channels/  users/' };
        else if (obj.dir == 'users') obj.return = { level: 'success', type: 'DIR', str: obj.guild.members.map(r => r.id + '/').splice(30, obj.guild.members.size - 30) };
      break;
      default:
        console.log(obj[obj.dir]);
        if ((typeof obj[obj.dir][obj.cmd]) !== 'string') obj.return = { level: 'error', type: 'UNKNOWN_COMMAND', str: '올바르지 않은 명령어입니다.' };
        else obj.return = { level: 'success', type: 'CUSTOM', str: obj[obj.dir][obj.cmd] };

      break;
    }
    return obj;
}
