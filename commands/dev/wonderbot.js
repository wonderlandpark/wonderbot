module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (!message.data.args) return message.reply(locale.error.usage(props.name));
  this.bash = {
    rdir: "/wonderbot/guilds/" + message.guild.id,
    dir: "guilds",
    "/": client
  };

  const con = execute(message.data.args, this.bash);
  console.log(this.bash);
  return message.reply(con, { code: "cmd" });
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

function execute(full, obj) {
  var returned = "";
  full.split("\n").forEach(l => {
    var r = run(l, obj);
    var a = r.return
      ? `${obj.message.author.username}@wonderbot: ${r.rdir}# ${l}\n` +
        r.return.str +
        "\n"
      : "";
    returned += a;
  });
  return returned;
}

function run(script, obj) {
  var args = [];
  const opt = script.match(/(--[^ ]*( [^ ]*|))/gi);
  if (opt && opt.length !== 0) {
    opt.forEach(g => {
      if (g.split(" ").length > 0) {
        args.push({ name: g.split(" ")[0], value: g.split(" ")[1] });
      } else {
        args.push({ name: g });
      }
    });
  }
  obj.args = args;
  obj.cmd = script.split(" ")[0];
  switch (obj.cmd) {
    case "ls":
    case "dir":
      if (obj.dir == "guild")
        obj.return = {
          level: "success",
          type: "DIR",
          str: "channels/   members/    emojis/"
        };
      else if (obj.dir == "members")
        obj.return = {
          level: "success",
          type: "DIR",
          str: obj.guild.members
            .map(r => r.id + "/    ")
            .splice(30, obj.guild.members.size - 30)
        };
      else if (obj.dir == "channels")
        obj.return = {
          level: "success",
          type: "DIR",
          str: obj.guild.channels
            .map(r => r.id + "/    ")
            .splice(30, obj.guild.members.size - 30)
        };
      else if (obj.dir == "emojis")
        obj.return = {
          level: "success",
          type: "DIR",
          str: obj.guild.emojis
            .map(r => r.id + "/    ")
            .splice(30, obj.guild.members.size - 30)
        };
      break;
    case "cd":
      var to = obj.message.data.arg2.split("/");
      if (to.startsWith("/")) {
        //gg
      }
      if (obj.dir == "guild") {
        if (to.startsWith("..")) {
          obj.dir = "bot";
        }
      }
      break;
    case "leave":
      if (obj.dir !== "guild")
        obj.return = {
          level: "error",
          type: "UNKNOWN_COMMAND",
          str: "올바르지 않은 명령어입니다."
        };
      else if (obj.args.name == "--s" || obj.args.name == "--sudo") {
        obj.guild.leave();
        obj.return = {
          level: "success",
          type: "GUILD_LEAVE",
          str: `${obj.guild.name} 을 나갔습니다.`
        };
      } else {
        obj.return = {
          level: "warn",
          type: "GUILD_OPTION",
          str:
            "해당 명령어는 관리자 권한으로 실행되어야합니다. `--sudo` 옵션을 붙여주세요."
        };
      }
      break;
    default:
      console.log(obj[obj.dir]);
      if (typeof obj[obj.dir][obj.cmd] !== "string")
        obj.return = {
          level: "error",
          type: "UNKNOWN_COMMAND",
          str: "올바르지 않은 명령어입니다."
        };
      else
        obj.return = {
          level: "success",
          type: "CUSTOM",
          str: obj[obj.dir][obj.cmd]
        };

      break;
  }
  return obj;
}
