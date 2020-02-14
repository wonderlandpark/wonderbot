const config = require("../config");
module.exports = {
  language: {
    english: "Korean",
    native: "한국어",
    code: "ko"
  },
  global: {
    won: '원',
    wonderbot: '원더봇',
    github: 'https://github.com/wonderbot/wonderbot'
  },

  // 여기부터 수정
  commands: {
    help: {
      help: "원더봇 도움말",
      desc:
        "항상 원더봇을 사랑해주셔서 감사합니다.\n이 봇은 ❤️와 함께 개발된 [오픈소스 프로젝트](https://github.com/wonderlandpark/wonderbot)입니다.\n모든 문의 사항 및 제보는 [지원 서버](https://invite.gg/wonderbot)를 이용해주세요.",
      support: "지원",
      links:
        "[원더봇 홈페이지](https://wonderbot.xyz)\n[팀 원더 디스코드 (지원서버)](https://invite.gg/wonderbot)\n[초대하기](https://wonderbot.xyz/invite)\n 지원메일 : wonderbotsupport@naver.com"
    },
    ping: {
      ping: "핑! 봇의 지연시간을 측정중입니다.",
      this: "🏓 퐁!",
      pong:
        "봇 지연시간 : {bot}ms\nAPI 지연시간 : {api}ms\nDB 쿼리 지연시간 : {db}ms"
    },
    register: {
      message:
        "이미 가입되신 상태입니다. 데이터 초기화 및 계약 철회 또는 약관 문의는 {contact} 에서 하실 수 있습니다.",
      contact:
        "https://invite.gg/wonderbot 또는 개발자 `wonderlandpark#9999`의 DM",
      register: "가입하기",
      tos: "이용약관",
      privacy: "개인정보취급방침",
      to: "바로가기",
      yet:
        "아직 약관에 동의하지 않으셨습니다.\n해당 채널에 `동의`를 입력하시면 모든 약관을 수락하신걸로 간주됩니다.",
      start: "원더봇을 이용하시려면 반드시 다음 약관에 동의하셔야합니다.",
      code: "동의",
      timeout: "시간이 초과되어 취소되었습니다.",
      thanks:
        "원더봇의 약관을 동의해주셔서 감사합니다! 이제 모든 기능을 이용하실 수 있습니다."
    },
    money: {
      money: "돈",
      text: "{user}님의 잔고는 **{money}** <:coin:636879213239992330> 입니다!",
      not: "아직 가입을 하지 않은 유저입니다.",
      won: "원"
    },
    payday: {
      cooldown: "쿨타임중입니다.\n`{time}`분 후에 사용가능합니다.",
      success:
        "당신의 잔고에 `100` <:coin:636879213239992330>을 추가했습니다!\n잔고 : `{money}` <:coin:636879213239992330>",
      premium:
        "당신의 잔고에 `100` <:coin:636879213239992330>을 추가했습니다!\n__원더봇 프리미엄__을 가입하셨군요! `100` <:coin:636879213239992330>을 추가지급합니다!\n잔고 : `{money}` <:coin:636879213239992330>"
    },
    allin: {
      ask:
        "정말로 올인 하시겠습니까? 실패시 모든 돈을 잃습니다. 성공시 현재 금액의 2배 + `[ {multi} 회 연속 보상 ]` 지급합니다\n계속하시려면 💸 반응을 눌러주세요\n실패시 연속 보상이 초기화됩니다.",
      start:
        "올인을 시작합니다. 모두 잃거나 2배로 돈이 늘어나거나! 확률은 1/2 !",
      then: "돈을 올인 기계에 넣고 버튼을 눌렀습니다!",
      success:
        "인.생.역.전! `성공` 입니다!! \n돈이 {mul}배로 늘어납니다! [{n}회 연속 성공 보상]\n잔고 : `{money}`",
      fail:
        "아쉽습니다... 실패입니다.\n~~역시 도박은 정신건강에 좋지 않아요...~~\n잔고 : `0` <:coin:636879213239992330>",
      nomoney: `돈이 \`0\` <:coin:636879213239992330> 입니다. \`${config.client.prefix}돈받기\`로 돈을 받아보세요^^`,
      not: "도박하지 마세요! 좋은 선택입니다!"
    },
    leaderboard: {
      global: "🌏 글로벌(전체 서버)",
      guild: "🏘️ {server} 서버",
      leaderboard: "리더보드 - {season}"
    },
    slot: {
      nomoney: "배팅하신 금액을 소지하고 있지 않습니다.",
      morethan: "300 <:coin:636879213239992330> 이상만 배팅하실 수 있습니다.",
      cooldown: "`{time}`초 후에 사용하실 수 있습니다.",
      ready:
        "{money} <:coin:636879213239992330>을 지불하고 슬롯머신을 돌리시겠습니까?\n계속하시려면 🎰로 반응하세요.\n원활한 사용을 위해서는 **Discord 창이 활성화 상태라면 자동으로 GIF 재생하기. ** 항목을 허용해주세요.",
      payed:
        "{money} <:coin:636879213239992330>을 지불했습니다!\n슬롯머신을 돌렸습니다!",
      res:
        "{plus} <:coin:636879213239992330> 이득 - {bet} <:coin:636879213239992330> 배팅 = {money}"
    },
    readnum: {
      big: "숫자가 생각보다 크군요! 오류가 있을 수 있습니다.",
      minus: "음수는 오류가 있을 수 있습니다"
    },
    profile: {
      profile: "{user}님의 프로필",
      wallet: "잔고 : {money} <:coin:636879213239992330>",
      allin: "올인 연속 성공 횟수",
      join: "원더봇 가입일",
      rank: "랭크"
    },
    wallet: {
      profile: "{user}님의 지갑"
    },
    price: {
      price: '원더코인(WBC) : {wbc}원(WBW)'
    },
    buy: {
      notvaild: "유효하지 않은 값입니다. 올바른 정수를 입력해주세요.",
      nomoney: "지불하실 금액을 소지하고 있지 않습니다.",
      bill: '🧾 계산서',
      ask: '구매하려는 아이템 : {item}\n수량 : {count}\n지불할 금액 : {total} <:coin:636879213239992330>\n계속하시려면 💳 이모지로 반응하세요.',
      finish: '✅ 결제 완료',
      result: '아이템 : {item}\n수량  : {count}\n지불한 금액 : {total} <:coin:636879213239992330>\n잔고 : {money} <:coin:636879213239992330>'
    },
    sell: {
      notvaild: "유효하지 않은 값입니다. 올바른 정수를 입력해주세요.",
      noitem: "판매하실 아이템을 소지하고 있지 않습니다.",
      bill: '🧾 계산서',
      ask: '판매하려는 아이템 : {item}\n수량 : {count}\n지급될 금액 : {total} <:coin:636879213239992330>\n계속하시려면 💳 이모지로 반응하세요.',
      finish: '✅ 결제 완료',
      result: '아이템 : {item}\n수량  : {count}\n지급 받은 금액 : {total} <:coin:636879213239992330>\n잔고 : {money} <:coin:636879213239992330>'
    },
    delivery: {
    info: '보낸이: {from} 받는이: {to} ({state})',
    status: {
      'information_received': '🏪 방문예정',
      'at_pickup': '📦 상품인수',
      'in_transit': '🚚 이동중',
      'out_for_delivery': '🚚 배송중',
      'delivered': '✅ 배송완료',
      'unknown': '❔ 알수없음'
    }
    },
    overwatch: {
      lvl: '레벨',
      nores: '검색결과가 없습니다.',
      more: '개 더 있음...\n더 자세하게 검색해보세요',
      nopublic: '이 계정은 프로필 비공개입니다.',
      private: '상세한 정보를 볼 수 없습니다.',
      battletag: '배틀태그',
      win: '승리한 게임'
    }
  },
  error: {
    offline: '봇이 점검중입니다. 지금은 이용하실 수 없습니다. 불편을 드려 죄송합니다.\n예상된 점검 및 공지는 지원 서버에서 확인해주세요.\nhttps://invite.gg/wonderbot',
    search: {
      nores:
        "검색결과가 없습니다. 올바른 이름 또는 이름의 일부를 입력해주세요.",
      many:
        "`{count}`건이 검색되었습니다. 이름을 더 정확하게 입력해주세요. 검색결과 : \n```{items}```"
    },
    debug: "[{time}]\n**WB/Rewrite ERROR** - `{code}`\nCMD : `{cmd}`\nUSER : `{user}` (`{userid}`)\nGUILD : `{guild}` (`{guildid}`)\nCHANNEL : `{channel}`(`{channelid}`)\nURL : {url} \n```js\n{error}\n```\n DESC : \n```fix\nMSG CONTENT : {msg}\nBOT PERM : {perm}\n```",
    onerror: "펑.. 이런! 봇이 이상하네요. 명령어를 처리하던 도중 예상치 못한 에러가 발생하였습니다.\n아래 에러 코드를 복사해서 개발자에게 전송해주세요!!!\n에러코드 : `{code}`",
    noperm: "당신은 이 명령어를 실행할 권한이 없습니다.\n요구 권한 : {perms}",
    process: "이미 해당 작업을 진행중입니다. 작업을 마치고 실행해 주세요.",
    blacklist:
      "당신은 원더봇 사용이 금지되었습니다.\n정지 기간 : {time} 까지\n사유 : {reason}",
    cooldown:
      "명령어 사용이 쿨타임중입니다.\n`{time}`초 후에 사용 가능합니다\n쿨타임을 없애고 싶으시다면 __원더봇 프리미엄__을 구매하세요",
    botperm: "이 명령어를 실행하기 위해서는 봇에게 {perms} 권한이 요구됩니다.",
    timeout: "시간이 초과되어 취소되었습니다.",
    nouser: "해당 유저는 원더봇에 가입되지 않았습니다.",
    already: "다른 작업이 진행중입니다. 작업을 완료한 후 명령어를 시도하세요.",
    usage: function(cmd) {
      var text = "";
      var desc = "";
      var args = require("../commands/index.js")[cmd].props.args;
      args.forEach(a => {
        if (a.required) {
          text += `[${usageNames[a.name]}] `;
          desc += `[${usageNames[a.name]} - ${
            usageNames[a.type.toString()]
          }](필수)\n${
            a.options ? "옵션 :" + a.options.join("`, `") : ""
          }`;
        } else {
          text += `(${usageNames[a.name]})`;
          desc += `[${usageNames[a.name]} - ${
            usageNames[a.type.toString()]
          }]\n${a.options ? "옵션 : `" + a.options.join("`, `") + "`" : ""}`;
        }
      });
      return `사용법 : \n\`\`\`fix\n${config.client.prefix}${cmd} ${text}\`\`\` \`\`\`ini\n${desc}\`\`\`
            `;
    }
  },
  link: {
    tos: "https://wonderbot.xyz/tos",
    privacy: "https://wonderbot.xyz/privacy"
  },
  category: {
    general: '일반',
    dev: '개발자용',
    account: '계정',
    money: '돈',
    fun: '재미',
    game: '도박',
    utills: '기능'
  },
  perm: {
    CREATE_INSTANT_INVITE: "초대 코드 만들기",
    KICK_MEMBERS: "멤버 추방하기",
    BAN_MEMBERS: "멤버 차단하기",
    ADMINISTRATOR: "관리자",
    MANAGE_CHANNELS: "채널 관리하기",
    MANAGE_GUILD: "서버 관리하기",
    ADD_REACTIONS: "반응 추가하기",
    VIEW_AUDIT_LOG: "감사 로그 보기",
    PRIORITY_SPEAKER: "우선 발언권",

    VIEW_CHANNEL: "채널 보기",
    READ_MESSAGES: "메세지 읽기",
    SEND_MESSAGES: "메세지 보내기",
    SEND_TTS_MESSAGES: "TTS 메세지 보내기",
    MANAGE_MESSAGES: "메세지 관리",
    EMBED_LINKS: "링크 첨부",
    ATTACH_FILES: "파일 첨부",
    READ_MESSAGE_HISTORY: "메세지 기록 보기",
    MENTION_EVERYONE: "모두 멘션하기",
    EXTERNAL_EMOJIS: "외부 이모티콘",
    USE_EXTERNAL_EMOJIS: "외부 이모티콘 사용하기",

    CONNECT: "연결",
    SPEAK: "말하기",
    MUTE_MEMBERS: "멤버들의 마이크 음소거하기",
    DEAFEN_MEMBERS: "멤버들의 헤드셋 음소거하기",
    MOVE_MEMBERS: "멤버 이동",
    USE_VAD: "음성 감지 사용",

    CHANGE_NICKNAME: "별명 변경하기",
    MANAGE_NICKNAMES: "별명 관리하기",
    MANAGE_ROLES: "역할 관리하기",
    MANAGE_ROLES_OR_PERMISSIONS: "역할 또는 권한 관리하기",
    MANAGE_WEBHOOKS: "웹훅 관리하기",
    MANAGE_EMOJIS: "이모티콘 관리하기"
  }
};

const usageNames = {
  option: "옵션",
  number: "숫자",
  money: "돈",
  text: "텍스트",
  user: "유저",
  stock: "아이템",
  count: "수량",
  script: "스크립트",
  "user/text": "유저 또는 텍스트",
  "morse/text": "변환할 모스부호 또는 텍스트",
  delivery: '택배사',
  bill: '운송장',
  item: '아이템',
  botid: '봇 아이디',
  perm: '권한',
  "user/id": '유저 또는 아이디'
};
