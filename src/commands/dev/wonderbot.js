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
    if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    this.bash = {
        rdir: '/wonderbot/guilds/' + message.guild.id,
        dir: ['guilds', message.guild.id],
        '/': client,
        message: message
    }

    const con = execute(message.data.args, this.bash, data)
    return message.reply(con, { code: 'cmd' })




    function execute(full, obj, data) {
        var returned = ''
        full.split('\n').forEach(l => {
            var r = run(l, obj, data)
            var a = r.return
                ? `${obj.message.author.username}@wonderbot: ${r.rdir}# ${l}\n` +
          r.return.str +
          '\n'
                : ''
            returned += a
        })
        return returned
    }
  
    function run(script, obj) {
        const child = require('child_process')
        var args = []
        const opt = script.match(/(--[^ ]*( [^ ]*|))/gi)
        if (opt && opt.length !== 0) {
            opt.forEach(g => {
                if (g.split(' ').length > 0) {
                    args.push({ name: g.split(' ')[0], value: g.split(' ')[1] })
                } else {
                    args.push({ name: g })
                }
            })
        }
        obj.args = args
        obj.cmd = script.split(' ')[0]
        switch (obj.cmd) {
        case 'update':
        case 'pull':
        // eslint-disable-next-line no-sync
            var val = child.execSync('git pull').toString()
            obj.return = {
                level: 'success',
                type: 'GIT_PULL',
                str:
            '깃 변경사항을 업데이트합니다.\n' +
            val +
            '\n변경사항을 적용하려면 재시작이 필요합니다.'
            }
            break
        case 'maintain':
            if (obj.args.find(r => r.name == '--s' || r.name == '--sudo')) {
                if (client.onlineMode) {
                    client.shard.broadcastEval('this.onlineMode = false')
                    obj.return = {
                        level: 'success',
                        type: 'MAINTAIN_ON',
                        str: '서비스 비허용 모드로 전환되었습니다. 점검 모드에 진입합니다.'
                    }
                } else {
                    client.shard.broadcastEval('this.onlineMode = true')
                    obj.return = {
                        level: 'success',
                        type: 'MAINTAIN_OFF',
                        str: '서비스 허용 모드로 전환되었습니다.'
                    }
                }
            } else {
                obj.return = {
                    level: 'warn',
                    type: 'SUDO_REQUIRED',
                    str:
              '해당 명령어는 관리자 권한으로 실행되어야합니다. `--sudo` 옵션을 붙여주세요.'
                }
            }
            break
        default:
            obj.return = {
                level: 'error',
                type: 'UNKNOWN_COMMAND',
                str: '올바르지 않은 명령어입니다.'
            }
            break
        }
        return obj
    }
  
}

module.exports.props = {
    name: 'wonderbot',
    perms: 'dev',
    alias: ['bot', 'bash'],
    args: [
        {
            name: 'script',
            type: 'text'
        }
    ]
}


/*
case "blacklist":
    if (arg[0] == 'list') {
    var list = await knex('blacklist').select('*');
    obj.return = {
      level: "success",
      type: "BLACKLIST_GET",
      str: list.map(r => r.id + ',\n')
    };
    } else if (arg[0] == 'add') {
      var u = await knex('blacklist').select('*')
      .where({ id: arg[1] });
      if (u.length > 0) obj.return = {
        level: "warn",
        type: "BLACKLIST_EXSITS",
        str: "해당 아이디는 이미 블랙리스트에 포함되어있습니다."
      };
      else {
      var why = args.find(b => b.name == '--reason').value;
      var time = args.find(t => t.name == '--time').value;
      await knex('blacklist').insert({ id: arg[1], why, time });
      obj.return = {
        level: "success",
        type: "BLACKLIST_ADDED",
        str: "해당 아이디를 블랙리스트에 추가했습니다."
      };
    }
    }
    break;
    */
