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
    rdir: "/wonderbot/guilds/" + message.guild.id,
    dir: ["guilds", message.guild.id],
    "/": client,
    message: message
  };

  const con = execute(message.data.args, this.bash, data);
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

function execute(full, obj, data) {
  var returned = "";
  full.split("\n").forEach(l => {
    var r = run(l, obj, data);
    var a = r.return
      ? `${obj.message.author.username}@wonderbot: ${r.rdir}# ${l}\n` +
        r.return.str +
        "\n"
      : "";
    returned += a;
  });
  return returned;
}

function run(script, obj, data) {
  const child = require('child_process');
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
    case "update":
    case "pull":
      // eslint-disable-next-line no-sync
      var val = child.execSync('git pull').toString();
      obj.return = {
        level: "success",
        type: "GIT_PULL",
        str: "깃 변경사항을 업데이트합니다.\n" + val + '\n변경사항을 적용하려면 재시작이 필요합니다.'
      };
      break;
    case "maintain":
      if (obj.args.find(r => r.name == "--s" || r.name == "--sudo")) {
       if (data.onlineMode) {
         data.onlineMode = false;
         obj.return = {
          level: "success",
          type: "MAINTAIN_ON",
          str:
            "서비스 비허용 모드로 전환되었습니다. 점검 모드에 진입합니다."
        };
      } else {
        data.onlineMode = true;
         obj.return = {
          level: "success",
          type: "MAINTAIN_OFF",
          str:
            "서비스 허용 모드로 전환되었습니다."
        };
      }

      } else {
        obj.return = {
          level: "warn",
          type: "SUDO_REQUIRED",
          str:
            "해당 명령어는 관리자 권한으로 실행되어야합니다. `--sudo` 옵션을 붙여주세요."
        };
      }
      break;
      default:
      obj.return = {
        level: "error",
        type: "UNKNOWN_COMMAND",
        str:
          "올바르지 않은 명령어입니다."
      };
      break;

    }
  return obj;
  }
