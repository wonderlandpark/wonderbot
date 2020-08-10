const Inko = require('inko')
const inko = new Inko()

const config = require('../config')
const commands = require('../commands/index.js')
module.exports = {
    language: {
        english: 'Korean',
        native: '한국어',
        code: 'ko'
    },
    global: {
        won: '원',
        wonderbot: '원더봇',
        github: 'https://github.com/wonderbot/wonderbot',
        me: '안녕하세요! **원더봇**이에요!\n저를 사용해주셔서 항상 감사해요!\n현재 서버의 접두사는 `{prefix}` 입니다.\n`{prefix}도움`으로 도움말을 확인할 수 있습니다.',
        mail: '📬 `{mail}`통의 메일이 도착하였습니다. `{prefix}메일`로 메일을 확인해주세요.\n> 메일을 확인하지 않으시면, 24시간 뒤에 다시 알려드립니다.',
        event: {
            good: ["지나가던 행인이 당신에게 반해서 {add}원을 받았습니다", "길을 가다가 {add}원 짜리 수표 한 장을 주웠습니다.", "당신이 제작한 발가락 긁기 기계가 주목을 받아 {add}원을 받았습니다", "길을 가다 동전을 주워 {add}원을 획득했습니다"],
            sad: ["이런... 길을 가다가 {lost}원을 도둑 맞았습니다...", "저런... 수표 한 장이 물 속에 떨어져 {lost}원을 잃었습니다...", "이럴수가..! 사용하시던 원더은행의 데이터베이스가 해킹당해 {lost}원이 시공속으로 사라졌습니다.", "5252 믿고 있었다구... 오이맨의 최면에 걸려 {lost}원을 기부했습니다.", "디스코드 인기 아이돌 산군의 앨범을 사면서 {lost}원을 지불 했습니다"]

        }
    },

    // 여기부터 수정
    commands: {
        help: {
            CMDDESC: '도움말 명령어를 표시합니다.',
            noCommand: '해당 명령어는 존재하지 않습니다.',
            commandInfo: '명령어 정보 - {cmd}',
            description: '명령어 설명',
            usage: '명령어 사용법',
            other: '명령어의 다른 이름들',
            docs: '문서',
            nodoc: '문서가 존재하지 않습니다.',
            help: '안녕하세요 원더봇입니다.',
            desc:
        '항상 원더봇을 사랑해주셔서 감사합니다.\n이 봇은 ❤️와 함께 개발된 [오픈소스 프로젝트](https://github.com/wonderlandpark/wonderbot)입니다.\n모든 문의 사항 및 제보는 [지원 서버](https://invite.gg/wonderbot)를 이용해주세요.',
            more: '자세한 도움말보기',
            moreDesc:
        '`{prefix}도움 [명령어]`로 명령어의 사용법을 자세하게 알아볼 수 있습니다.',
            support: '유용한 링크',
            links:
        '[원더봇 홈페이지](https://wonderbot.xyz)\n[팀 칼리스토 디스코드 (지원서버)](https://invite.gg/wonderbot)\n[초대하기](https://wonderbot.xyz/invite)\n[이용약관](https://callisto.team/tos)\n[개인정보취급방침](https://callisto.team/privacy)\n지원메일 : hi@wonderbot.xyz'
        },
        mail: {
            noMail: '\n> 📭 메일이 없습니다.',
            allRead: '\n> 📭 이미 모든 메일을 확인했습니다.\n전체 메일을 확인하려면 `전체` 옵션을 사용하세요.',
            readed: '\n> 읽지 않았던 메일은 전부 읽음처리 되었습니다.',
            current: '확인하지 않은 메일만 표시합니다. 모든 메일을 확인하려면 `전체` 옵션을 사용하세요.\n> 읽지 않았던 메일은 전부 읽음처리 되었습니다.',
            title: '전송자: {sender} - {date}'
        },
        도움: {
            CMDDESC: '도움말 명령어를 표시합니다.'
        },
        ping: {
            CMDDESC: '봇의 지연시간을 확인합니다.',
            ping: '핑! 봇의 지연시간을 측정중입니다.',
            pong: '퐁!',
            this: '🏓 퐁!',
            return:
        '봇 지연시간 : {bot}ms\nAPI 지연시간 : {api}ms\nDB 쿼리 지연시간 : {db}ms'
        },
        register: {
            CMDDESC: '원더봇 서비스에 가입합니다.',
            message:
        '이미 가입되신 상태입니다. 데이터 초기화 및 계약 철회 또는 약관 문의는 {contact} 에서 하실 수 있습니다.',
            contact:
        'https://invite.gg/wonderbot 또는 개발자 `wonderlandpark#9999`의 DM',
            register: '가입하기',
            tos: '이용약관',
            privacy: '개인정보취급방침',
            to: '바로가기',
            yet:
        '아직 약관에 동의하지 않으셨습니다.\n해당 채널에 `동의`를 입력하시면 모든 약관을 수락하신걸로 간주됩니다.',
            start: '원더봇을 이용하시려면 반드시 다음 약관에 동의하셔야합니다.',
            code: '동의',
            timeout: '시간이 초과되어 취소되었습니다.',
            thanks:
        '원더봇의 약관을 동의해주셔서 감사합니다! 이제 모든 기능을 이용하실 수 있습니다.'
        },
        cooldown: {
            title: '원더봇 프리미엄',
            desc: '원더봇은 부분 유료화로, 기존 서비스는 동일하게 이용할 수 있지만 정액제 회원권으로 질 높은 서비스를 제공합니다.',
            benefit: '혜택',
            not: '프리미엄 유저가 아닙니다.',
            ends: '**{at}**인 `{date}`에 만료됩니다.',
            benefitDesc: '⏱️ **쿨타임 제거**\n과도한 사용량을 방지하기 위한 쿨타임이 사라져, 봇을 더 빠르게 사용하실 수 있습니다.\n\n💰 **추가 보상**\n`돈받기` 명령어에서 기존 보상인 100원에 추가로 100원을 더 받게됩니다.\n\n💎 **멋진 뱃지**\n프로필 명령어에서 멋진 뱃지를 받으실 수 있습니다.\n\n🎫 **전용 세션**\n프리미엄 유저들은 새로운 기능에 보다 빨리 확인하고 사용하실 수 있고, 비정기적인 전용 이벤트도 개최됩니다.\n\n[[ 구매하러가기 ]](https://shop.callisto.team)\n\n원더봇 프리미엄은 수익 창출의 목적보다는 봇 제작에 사용되는 비용과, 다양한 팀 봇 지원비에 사용됩니다.\n\n**구독 현황**\n{plan}'
        },
        money: {
            CMDDESC: '잔고를 확인합니다.',
            money: '돈',
            text: '{user}님의 잔고는 **{money}** <:coin:636879213239992330> 입니다!',
            not: '아직 가입을 하지 않은 유저입니다.',
            won: '원'
        },
        payday: {
            CMDDESC: '1시간마다 돈을 지급받습니다.',
            COOLDOWN: 3600,
            cooldown: '쿨타임중입니다.\n`{time}`분 후에 사용가능합니다.',
            cooldownCustom: '쿨타임중입니다.\n`{time}` 사용가능합니다.',
            success:
        '당신의 잔고에 `100` <:coin:636879213239992330>을 추가했습니다!\n잔고 : `{money}` <:coin:636879213239992330>',
            premium:
        '당신의 잔고에 `100` <:coin:636879213239992330>을 추가했습니다!\n__원더봇 프리미엄__을 가입하셨군요! `100` <:coin:636879213239992330>을 추가지급합니다!\n잔고 : `{money}` <:coin:636879213239992330>'
        },
        voted: {
            CMDDESC: '투표보상을 지급받습니다.',
            COOLDOWN: 10800,
            success: '**__원더봇을 투표해주셔서 감사합니다__**\n당신의 잔고에 `100` <:coin:636879213239992330>을 추가했습니다!\n잔고 : `{money}` <:coin:636879213239992330>\n`3시간` 뒤에 다시 보상을 지급받을 수 있습니다.',
            not: '원더봇을 투표하시지 않으셨습니다!\n아래 링크에서 하트를 눌러주세요!\n링크: https://koreanbots.dev/bots/wonderbot'
        },
        supportserver: {
            CMDDESC: '공식 지원 서버 접속 보상을 지급받습니다.',
            COOLDOWN: 43200000,
            success: '**__서버에 참가해주셔서 감사합니다.__**\n당신의 잔고에 `100` <:coin:636879213239992330>을 추가했습니다!\n잔고 : `{money}` <:coin:636879213239992330>\n`12시간` 뒤에 다시 보상을 지급받을 수 있습니다.',
            not: '해당 명령어는 공식 서버에서만 사용가능합니다.\n링크: https://discord.gg/jE33mfD'
        },
        allin: {
            CMDDESC: '삭제된 명령어입니다.',
            ask:
        '정말로 올인 하시겠습니까? 실패시 모든 돈을 잃습니다. 성공시 현재 금액의 2배 + `[ {multi} 회 연속 보상 ]` 지급합니다 (단, 최대 4배 연속 보상까지만 적용됩니다)\n계속하시려면 💸 반응을 눌러주세요\n실패시 연속 보상이 초기화됩니다.',
            start:
        '올인을 시작합니다. 모두 잃거나 2배로 돈이 늘어나거나! 확률은 1/2 !',
            then: '돈을 올인 기계에 넣고 버튼을 눌렀습니다!',
            success:
        '인.생.역.전! `성공` 입니다!! \n돈이 {mul}배로 늘어납니다! [{n}회 연속 성공 보상]\n잔고 : `{money}`',
            fail:
        '아쉽습니다... 실패입니다.\n~~역시 도박은 정신건강에 좋지 않아요...~~\n잔고 : `0` <:coin:636879213239992330>',
            nomoney: `돈이 \`0\` <:coin:636879213239992330> 입니다. \`${config.client.prefix}돈받기\`로 돈을 받아보세요^^`,
            not: '도박하지 마세요! 좋은 선택입니다!'
        },
        leaderboard: {
            CMDDESC: '자산 순위를 확인합니다.',
            global: '🌏 글로벌(전체 서버)',
            guild: '🏘️ {server} 서버',
            leaderboard: '리더보드 - {season}',
            all: '총 자산'
        },
        slot: {
            CMDDESC: '슬롯머신 도박을 합니다. 100원부터 배팅하실 수 있습니다.',
            COOLDOWN: 60,
            nomoney: '배팅하신 금액을 소지하고 있지 않습니다.',
            morethan: '100 <:coin:636879213239992330> 이상만 배팅하실 수 있습니다.',
            cooldown: '`{time}`초 후에 사용하실 수 있습니다.',
            ready:
        '{money} <:coin:636879213239992330>을 지불하고 슬롯머신을 돌리시겠습니까?\n계속하시려면 🎰로 반응하세요.\n원활한 사용을 위해서는 **Discord 창이 활성화 상태라면 자동으로 GIF 재생하기. ** 항목을 허용해주세요.',
            payed:
        '{money} <:coin:636879213239992330>을 지불했습니다!\n슬롯머신을 돌렸습니다!',
            res:
        '{plus} <:coin:636879213239992330> 이득 - {bet} <:coin:636879213239992330> 배팅 \n= {money}'
        },
        readnum: {
            CMDDESC: '정수를 한글로 읽습니다.',
            big: '숫자가 생각보다 크군요! 오류가 있을 수 있습니다.',
            minus: '음수는 오류가 있을 수 있습니다'
        },
        profile: {
            CMDDESC: '기본적인 프로필을 확인합니다.',
            profile: '{user}님의 프로필',
            wallet: '잔고 : {money} <:coin:636879213239992330>',
            allin: '올인 연속 성공 횟수',
            join: '원더봇 가입일',
            rank: '랭크',
            top: '순위',
            topdesc: '전체 {all}위 (서버 {guild}위)',
            badge: '뱃지',
            badgeName: {
                premium: '원더봇 프리미엄',
                early: '얼리 서포터',
                team: '팀 칼리스토',
                bughunter: '버그 헌터',
                github: '기여자'
            }
        },
        wallet: {
            CMDDESC: '지갑속에 뭐가 들어있는지 확인합니다.',
            wallet: '💰 {user}님의 지갑',
            what: '지갑속에 뭐가 있을까요?',
            will: '추정 자산',
            top: '순위',
            topdesc: '전체 {all}위 (서버 {guild}위)',
            money: '{money} <:coin:636879213239992330>',
            item: '소지한 아이템',
            noitem: '소지한 아이템이 없습니다.',
            items: {
                wondercoin: '<:coin:636879213239992330> 원더코인',
                gukbap: '<:gookbap:677905040706371598> 국밥',
                diamond: '💎 다이아몬드',
                coffee: '☕ 커피콩',
                figure: '<:figure:682073488684744775> 피규어'
            }
        },
        price: {
            CMDDESC: '아이템의 시세를 확인합니다.',
            item: '아이템 시세',
            changed: '--- {change}초 전 업데이트됨.',
            price: '{status} {name} : {price}원 [{update}]',
            lastchange: '다음 변동: `{lastchange}`초 남음'
        },
        buy: {
            CMDDESC: '아이템을 구매합니다.',
            notvaild: '유효하지 않은 값입니다. 올바른 정수를 입력해주세요.',
            nomoney: '지불하실 금액을 소지하고 있지 않습니다.',
            bill: '🧾 계산서',
            ask:
        '구매하려는 아이템 : {item}\n수량 : {count}\n지불할 금액 : {total} <:coin:636879213239992330>\n계속하시려면 💳 이모지로 반응하세요.',
            finish: '✅ 결제 완료',
            result:
        '아이템 : {item}\n수량  : {count}\n지불한 금액 : {total} <:coin:636879213239992330>\n잔고 : {money} <:coin:636879213239992330>',
            not: '구매가 취소되었습니다.'
        },
        sell: {
            CMDDESC: '아이템을 판매합니다.',
            notvaild: '유효하지 않은 값입니다. 올바른 정수를 입력해주세요.',
            noitem: '판매하실 아이템을 소지하고 있지 않습니다.',
            bill: '🧾 계산서',
            ask:
        '판매하려는 아이템 : {item}\n수량 : {count}\n지급될 금액 : {total} <:coin:636879213239992330>\n계속하시려면 💳 이모지로 반응하세요.',
            finish: '✅ 결제 완료',
            result:
        '아이템 : {item}\n수량  : {count}\n지급 받은 금액 : {total} <:coin:636879213239992330>\n잔고 : {money} <:coin:636879213239992330>',
            not: '판매가 취소되었습니다.'
        },
        delivery: {
            CMDDESC: '실제 택배의 운송장 번호로 택배 배송현황을 확인합니다.',
            info: '보낸이: {from} 받는이: {to} ({state})',
            status: {
                information_received: '🏪 방문예정',
                at_pickup: '📦 상품인수',
                in_transit: '🚚 이동중',
                out_for_delivery: '🚚 배송중',
                delivered: '✅ 배송완료',
                unknown: '❔ 알수없음'
            }
        },
        overwatch: {
            CMDDESC: '오버워치 전적을 조회합니다.',
            rate: '경쟁전 점수',
            lvl: '레벨',
            nores: '검색결과가 없습니다.',
            more: '개 더 있음...\n더 자세하게 검색해보세요',
            nopublic: '이 계정은 프로필 비공개입니다.',
            private: '상세한 정보를 볼 수 없습니다.',
            noinfo: '불러올 수 있는 정보가 없습니다.',
            nogamemode: '해당 게임모드를 아직 플레이 하지 않았습니다.',
            battletag: '배틀태그',
            win: '승리한 게임',
            nocompete: '미배치 ',
            overall: '통계',
            playtime: '플레이 시간',
            perheros: '영웅 비교',
            herosdesc: '영웅별 전적 (상위 5 영웅)',
            heros: {
                winston: '윈스턴',
                reinhardt: '라인하르트',
                torbjorn: '토르비욘',
                pharah: '파라',
                mercy: '메르시',
                mei: '메이',
                ana: '아나',
                genji: '겐지',
                dVa: 'D.VA',
                bastion: '바스티온',
                mccree: '맥크리',
                reaper: '리퍼',
                junkrat: '정크렛',
                wreckingBall: '레킹볼',
                sombra: '솜브라',
                lucio: '루시우',
                zarya: '자리야',
                tracer: '트레이서',
                roadhog: '로드호그',
                soldier76: '솔저: 76',
                zenyatta: '젠야타',
                doomfist: '둠피스트',
                symmetra: '시메트라',
                hanzo: '한조',
                orisa: '오리사',
                widowmaker: '위도우',
                moira: '모이라',
                sigma: '시그마',
                ash: '에쉬',
                baptiste: '바티스트',
                brigitte: '브리기테'
            },
            stat: {
                competitiveStats:
          '**승리** : {win}\n**패배** : {lost}\n**승률** : {percent}\n**K/D** : {kd} : 1 ({eliminations}/{deaths})\n**평균 임무 기여 시간 (10분당 평균)** : {objectTime}\n**평균 폭주 시간 (10분당 평균)** : {fire}\n**총 플레이 시간** : {playtime}',
                quickPlayStats:
          '**승리** : {win}\n**K/D** : {kd} : 1 ({eliminations}/{deaths})\n**평균 임무 기여 시간 (10분당 평균)** : {objectTime}\n**평균 폭주 시간 (10분당 평균)** : {fire}\n**총 플레이 시간** : {playtime}'
            },
            gamemode: {
                competitiveStats: '현재 경쟁전 시즌',
                quickPlayStats: '빠른 대전',
                allStats: '현재 경쟁전 시즌 + 빠른 대전'
            },
            loading: '전적을 불러오는 중입니다...',
            time: '플레이 시간 (빠대+경쟁)',
            day: '일',
            timestat:
        '**옵치를 하지 않았다면??**\n2020년 최저임금으로 __**{money}**__원 벌기 \n=> 국밥 {gookbapEmoji} {gookbap} 그릇 (7,000원 기준)\n메르시 부활 **{mercy}**회\n3분 카레 : **{curry}**개 제조\n연애할 수 있는 횟수 : **0**회'
        },
        corona: {
            CMDDESC: '점검중인 기능입니다.',
            corona: '코로나19 현황',
            desc: '✅ 완치자: {cured} \n🏥 감염자: {iscorona}\n❎ 사망자: {dead}',
            from: '감염경로',
            fromDesc: ''
        },
        재난문자: {
            CMDDESC: '재난문자를 검색/조회합니다.'
        },
        graph: {
            CMDDESC: '그래프 링크를 확인합니다.',
            DOCS: 'graph',
            graph: '그래프',
            desc:
        '[이곳](https://wonderbot.xyz/stocks)에서 그래프를 확인하실 수 있습니다.\n\n[도움말](https://support.callisto.team/docs/wonderbot/graph)'
        },
        ban: {
            CMDDESC: '유저를 서버에서 차단합니다.',
            alsoPerm:
        '원더봇의 권한을 이용해 같거나 높은 역할을 차단하는걸 방지하기 위해, 관리자 또는 차단 권한이 있는 유저는 차단할 수 없습니다.\n직접 차단해주세요',
            wait: '해당 유저 추방에 시도중입니다.',
            user: '🙍 유저',
            mod: '👮 처리자',
            modDesc: '관리자: {mod} ({tag})',
            userDesc: '유저: {user} ({tag})',
            reason: '📃 정보',
            reasonDesc: '처벌 사유: {reason}',
            Success: '🔨 차단',
            notice:
        '당신은 **{guild}**에서 차단되셨습니다.\n사유 : {reason}\n처리자 : {mod}',
            error:
        '차단에 실패하였습니다. 원더봇의 권한을 확인해주세요.\n직접 차단해주시는걸 권장드립니다.',
            none: '없음.',
            why: '사유: {reason} | 처리자: {by}'
        },
        kick: {
            CMDDESC: '유저를 서버에서 추방합니다.',
            alsoPerm:
        '원더봇의 권한을 이용해 같거나 높은 역할을 추방하는걸 방지하기 위해, 관리자 또는 추방 권한이 있는 유저는 추방할 수 없습니다.\n직접 추방해주세요',
            wait: '해당 유저 추방에 시도중입니다.',
            user: '🙍 유저',
            mod: '👮 처리자',
            modDesc: '관리자: {mod} ({tag})',
            userDesc: '유저: {user} ({tag})',
            reason: '📃 정보',
            reasonDesc: '처벌 사유: {reason}',
            Success: '🔨 추방',
            notice:
        '당신은 **{guild}**에서 추방되셨습니다.\n사유 : {reason}\n처리자 : {mod}',
            error:
        '추방에 실패하였습니다. 원더봇의 권한을 확인해주세요.\n직접 추방해주시는걸 권장드립니다.',
            none: '없음.',
            why: '사유: {reason} | 처리자: {by}'
        },
        warn: {
            CMDDESC: '유저에게 경고를 부여합니다.',
            alsoPerm: '관리자에게 경고를 부여할 수 없습니다.',
            bot: '봇에게는 경고를 부여하실 수 없습니다.',
            warn: '📌 경고 부여',
            user: '🙍 유저',
            mod: '👮 처리자',
            modDesc: '관리자: {mod} ({tag})',
            userDesc: '유저: {user} ({tag})',
            reason: '📃 정보',
            reasonDesc: '경고 사유: {reason}\n경고 개수: {count}/{limit}',
            desc: '`{user}`',
            auto: '경고 누적 자동 밴.',
            none: '없음.',
            limited: '경고가 누적되어 밴을 시도합니다.',
            tooLong: '경고 사유는 최대 50자까지만 입력 가능합니다.'
        },
        unwarn: {
            CMDDESC: '유저의 경고를 선택해 취소합니다.',
            alsoPerm: '관리자의 경고를 취소할 수 없습니다.',
            noWarn: '취소할 경고가 없습니다.',
            bot: '봇의 경고는 초기화할 수 없습니다.',
            unwarn: '📌 경고취소',
            user: '🙍 유저',
            mod: '👮 처리자',
            modDesc: '관리자: {mod} ({tag})',
            userDesc: '유저: {user} ({tag})',
            reason: '📃 정보',
            cleared: '`{why}` 사유의 경고를 취소했습니다.',
            select: '삭제할 경고의 **번호**를 입력해주세요! (숫자만 입력해주세요)',
            cancel: '응답이 없어 작업이 취소되었습니다.',
            wrongnum: '잘못된 숫자입니다. 작업이 취소되었습니다.',
            warn: '경고'
        },
        cwarn: {
            CMDDESC: '유저의 경고수를 전부 초기화합니다.',
            alsoPerm: '관리자의 경고를 초기화할 수 없습니다.',
            noWarn: '초기화할 경고가 없습니다.',
            bot: '봇의 경고는 초기화할 수 없습니다.',
            cwarn: '📌 경고초기화',
            user: '🙍 유저',
            mod: '👮 처리자',
            modDesc: '관리자: {mod} ({tag})',
            userDesc: '유저: {user} ({tag})',
            reason: '📃 정보',
            cleared: '모든 경고정보를 초기화했습니다.'
        },
        setlog: {
            CMDDESC: '서버의 관리 로그 채널을 설정합니다.',
            log: '관리 로그 설정',
            desc:
        '관리 로그가 전송되는 채널을 설정할 수 있습니다.\n현재 설정: `#{channel}`\n`' +
        config.client.prefix +
        '로그설정 #채널`로 설정을 변경할 수 있습니다.',
            undefined: '지정되지 않음',
            success: '관리 로그가 설정되었습니다:\n `#{channel}`'
        },
        setwarn: {
            CMDDESC: '경고 관련 설정을 할 수 있습니다.',
            set: '최대 경고 설정',
            backup:
        '🗃️ 지금까지의 경고 데이터는 `{code}`로 백업되셨습니다. (매달 말 일에 초기화됨)\n✅ 모든 데이터가 초기화되었습니다.',
            limit: '최대 경고 개수는 20개 이하인 양수여야합니다.',
            limited:
        '최대 경고 한도가 `{limit}`으로 설정되었습니다.\n기존 경고 데이터를 초기화하려면 초기화 옵션을 이용하세요.\n기존 경고 데이터가 한도보다 크거나 같다면, 경고가 `1회` 더 지급될 시, 밴처리됩니다.'
        },
        check: {
            CMDDESC: '경고 개수를 확인합니다',
            noperm: '다른 유저의 경고는 관리자만 확인할 수 있습니다.',
            desc: '{user}님의 경고 정보',
            check: '📌 경고 확인',
            count: '경고 개수',
            limit: '{count}/{limit}',
            warn: '경고 #{count}',
            reason: '사유: {reason}'
        },
        qr: {
            CMDDESC: 'QR코드를 만듭니다.'
        },
        botinvite: {
            CMDDESC: '봇 아이디로 봇 초대링크를 생성할 수 있습니다.'
        },
        en: {
            CMDDESC: '영어 키보드 배열로 친 한글을 영어로 변환합니다.'
        },
        ko: {
            CMDDESC: '한글 키보드 배열로 친 영어를 한글로 변환합니다.'
        },
        news: {
            news: '📰 {name}에서 제공된 기사',
            desc:
        '\n\n`이 정보는 정확하지 않습니다. 예상과 달라도 책임지지 않습니다.`'
        },
        periodic: {
            appear: '외형',
            table: '주기율표 위치',
            temp: '온도 정보',
            info: '끓는점: `{boil}K` 녹는점: `{melt}K`',
            docs: '더 알아보기',
            wiki: '위키백과',
            number: '원소번호',
            found: '발견',
            spectra: '스펙트럼 선'
        },
        trick: {
            trick: '야바위',
            cooldown: '쿨타임중입니다.\n`{time}`초 후에 사용가능합니다.',
            morethan: '100 <:coin:636879213239992330> 이상만 배팅하실 수 있습니다.',
            nomoney: '배팅하신 금액을 소지하고 있지 않습니다.',
            start:
        '안녕하게나! 야바위를 하러왔군! 그럼 게임을 시작하지\n배팅하신 돈을 첫번째 컵에 넣고 컵 4개를 섞어보겠네',
            mix: '\n\n(쓱윽쓰윽쓰으윽쓱싹쏙)\n\n`1~4` 중 컵 하나를 골라보게나..',
            timeout: '시간이 초기화되었다네... 나중에 다시해보게나...',
            wrongres: '올바른 컵 번호를 입력해주시게나...',
            right: '\n저걸... 맞추다니..?\n배팅금을 추가로 지급해주지...',
            wrong: '\n저런! 아쉽게 거기엔 돈이 없었네.\n정답은 `{random}`였다네'
        },
        shardinfo: {
            current: '해당 길드 샤드 정보',
            desc:
        '#{id}번 샤드(분리 프로세스) \n```prolog\n#{id} : Guilds {guild}, Users {user}, Ram {ram}MiB, Ping {ping}ms \n마지막 정보 패치: {last}```\n\n다른 샤드 정보도 디스코드에 표시하기는 너무 길군요 [이곳](https://wonderbot.xyz/shards) 에서 확인할 수 있습니다.'
        },
        serverinfo: {
            serverinfo: '🏘️ {guild} 서버 정보',
            memberCount: '멤버',
            memberDesc: '{user}명',
            verification: '보안 수준',
            verificationLevel: {'NONE': '**없음**\n제한 없음','LOW': '**낮음**\n자신의 Discord 계정이 이메일 인증을 받은 적이 있어야 합니다.', 'MEDIUM': '**중간**\n추가로 Discord에 가입한지 5분이 지나야 합니다.','HIGH': '**(╯°□°）╯︵ ┻━┻**\n추가로 이 서버의 멤버가 된 지 10분이 지나야 합니다.','VERY_HIGH': '**┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻**\n전화 인증이 완료된 Discord 계정이어야 합니다.'},
            region: '지역',
            channel: '채널',
            channelDesc: '텍스트채널: {text}개 / 카테고리: {category}개 / 음성채널: {voice}개',
            owner: '소유자',
            boost: '부스팅',
            boostDesc: '{count}개 부스트 / {level} 레벨',
            regionList : {
                brazil:':flag_br: 브라질', 
                'us-west':':flag_us: 미국 서부', 
                japan:':flag_jp: 일본', 
                singapore : ':flag_sg: 싱가포르', 
                'eu-central':':flag_eu: 유럽 중부', 
                hongkong:':flag_hk:  홍콩', 
                'us-south':':flag_us: 미국 중부', 
                southafrica:':flag_za: 남아프리카 공화국', 
                'us-central':':flag_us: 미국 중부', 
                'london':':flag_gb: 런던', 
                'us-east':':flag_us: 미국동부', 
                sydney:':flag_au: 시드니', 
                'eu-west':':flag_eu: 유럽 서부', 
                amsterdam:':flag_nl: 암스테레담', 
                india:':flag_in: 인도', 
                frankfurt:':flag_de: 프랑크푸르트', 
                russia: ':flag_ru: 러시아',
                'south-korea': ':flag_kr: 한국',
                'vip-us-east': ':flag_us: VIP 미국 동부'
            },
            filterName: '유해 미디어 콘텐츠 필터',
            filter: {'DISABLED': '**미디어 콘텐츠를 스캔하지 않아요.**\n메시지 스캔 따윈 필요 없어! 나는 터프가이니깐.', 'MEMBERS_WITHOUT_ROLES': '**역할 없는 멤버의 미디어 콘텐츠를 스캔해요.**\n신뢰하는 멤버에게 역할을 부여하는 서버에 권장하는 옵션이에요', 'ALL_MEMBERS': '**모든 멤버의 미디어 콘텐츠를 스캔해요.**\n아주 깨끗한 채팅 환경을 원할시 권장하는 옵션이에요.'},
            roles: '역할들',
            emojis: '이모지들',
            none: '없음',
            channels: '채널들',
            more: '외 {count}개 더...'
        },
        userinfo: {
            gametypes: { PLAYING: '하는 중', LISTENING: '듣는 중', WATCHING: '보는 중', STREAMING: '방송 중' },
            online: '온라인',
            idle: '자리 비움',
            dnd: '다른 용무 중',
            offline: '오프라인 표시',
            streaming: '방송 중',
            more: '외 {count}개 더...',
            many: '여러개의 항목이 있습니다! 채팅창에 번호를 입력해주세요!   ',
            notvaild: '올바르지 않은 수에요..',
            numberto: '숫자는 1부터 {max}까지 입력 가능해요.',
            timeout: '시간이 지나 취소되었습니다.',
            nores: '검색결과가 없습니다',
            username: '유저이름',
            game: '게임',
            nogame: '플레이중인 게임이 없습니다.',
            status: '상태',
            unknown: '알 수 없음',
            client: '클라이언트',
            created: '계정 생성일',
            joined: '서버 참여일',
            roles: '역할들',
            platform:  {
                'desktop': '🖥️ 데스크톱',
                'mobile': '📱 모바일',
                'web': '🌐 웹'
            }
        },
        slowmode: {
            error: '메시지 제한 초수는 **0(꺼짐)~21600(6시간)**을 입력하셔야 해요!',
            set: '해당 채널의 슬로우모드를 `{sec}초`로 설정했습니다.',
            catch: '슬로우모드 설정을 실패했습니다. 권한을 확인해보세요.'
        },
        currency: {
            usage: '\n**환율**\n> 환율 정보를 가져올 수 있습니다.\n예시\n`.환율 KRW 1000`\n`.환율 달러 1`\n`.환율 CNY 5`',
            notsupport: '지원하지 않는 화폐 단위입니다.',
            notnum: '올바른 숫자를 입력해주세요.',
            desc: '> 해당 정보는 정확하지 않을 수 있습니다. 참고용으로만 사용해주세요.'
        },
        prefix: {
            current: '해당 서버의 접두사는 `{prefix}`입니다.',
            changed: '접두사를 `{prefix}`로 변경했습니다.',
            filter: '접두사는 16자 이하로 설정해주세요!!',
            notAdmin: '관리자 권한이 없어 접두사를 변경할 수 없습니다.',
            space: '새로운 접두사는 띄어쓰기로 시작할 수 없습니다.\nTIP: `[띄어쓰기]`로 띄어쓰기를 대신할 수 있습니다.',
            mention: '접두사에 맨션을 포함할 수 없습니다!!'
        },
        lotto: {
            lotto: '복권',
            desc: '이전 회차 **{n}**회 당첨번호: {answer} + {bonus}\n당첨금을 수령하려면 `수령` 옵션을 사용해주세요.\n당첨금은 다음 복권의 당첨 발표전까지 수령하실 수 있습니다.',
            limit: '복권은 1인당 15개까지만 구매할 수 있습니다.',
            invaild: '복권 번호가 올바르지 않습니다. 복권 번호는 0번 부터 10번 사이로 입력해주세요. 아래는 사용법입니다.\n**번호 자동 선택**\n`{prefix}복권 구매 자동`\n**번호 수동 선택**\n`{prefix}복권 구매 (번호) (번호) (번호) (번호)`',
            dupe: '중복된 숫자는 사용하실 수 없습니다.',
            noMoney: '복권을 구매할 수 있는 금액을 소지하고 있지않습니다.\n(복권 x 1개 = `300원`)',
            isReady: '계속하시겠습니까? 구매 후에는 환불하실 수 없습니다. 계속하시려면 반응하세요\n구매할 복권 번호: {num}',
            success: '복권을 구매했습니다. `확인` 옵션으로 소지하고 있는 복권을 확인할 수 있습니다.',
            not: '복권 구매가 취소되었습니다.',
            listDesc: '구매하신 이번 회차 복권입니다:\n\n{list}\n\n이전 회차의 복권의 당첨금을 수령하려면 `수령` 옵션을 사용해주세요.',
            noItem: '이전 회차에서 수령하실 복권이 없습니다.\n구매하신 복권이 없거나 이미 수령했습니다!',
            getMoney: '이전 회차 당첨확인입니다.\n\n{list}\n총 {total}원을 지급 받으셨습니다! 축하드려요!',
            moneyRes: '{num} => {n}위 = {money}원\n',
            noOpt: '올바르지 않은 옵션입니다.\n올바른 옵션: `{opt}`',
            count: '이번 회차는 **{n}**회차입니다\n`수령` 옵션을 이용하면 이전 회차인 **{m}**회의 보상을 받을 수 있습니다.'
        },
        npm: {
            unpublish: '공개되지 않았습니다.'
        },
        subway: {
            error: '정보를 불러오는데 실패하였습니다.\n> {msg}'
        }
    },

    error: {
        nodesc: '설명이 없습니다.',
        toLong: '출력 결과가 너무 길어 출력할 수 없습니다.',
        offline:
      '봇이 점검중입니다. 지금은 이용하실 수 없습니다. 불편을 드려 죄송합니다.\n예상된 점검 및 공지는 지원 서버에서 확인해주세요.\nhttps://invite.gg/wonderbot',
        search: {
            nores:
        '검색결과가 없습니다. 올바른 이름 또는 이름의 일부를 입력해주세요.',
            noperiodic: '검색결과가 없습니다. 올바른 원소기호를 입력해주세요.',
            many:
        '`{count}`건이 검색되었습니다. 이름을 더 정확하게 입력해주세요. 검색결과 : \n```{items}```'
        },
        debug:
      '[{time}]\n**WB/Rewrite ERROR** - `{code}`\nCMD : `{cmd}`\nUSER : `{user}` (`{userid}`)\nGUILD : `{guild}` (`{guildid}`)\nCHANNEL : `{channel}`(`{channelid}`)\nURL : {url} \n```js\n{error}\n```\n DESC : \n```fix\nMSG CONTENT : {msg}\nBOT PERM : {perm}\n```',
        onerror:
      '펑.. 이런! 봇이 이상하네요. 명령어를 처리하던 도중 예상치 못한 에러가 발생하였습니다.\n아래 에러 코드를 복사해서 개발자에게 전송해주세요!!!\n에러코드 : `{code}`',
        noperm: '당신은 이 명령어를 실행할 권한이 없습니다.\n요구 권한 : {perms}',
        process: '이미 해당 작업을 진행중입니다. 작업을 마치고 실행해 주세요.',
        more: '이거 돈도 많으시면서 통이 너무 작은거 아니에요...?',
        blacklist:
      '당신은 원더봇 사용이 금지되었습니다.\n정지 기간 : {time} 까지\n사유 : {reason}\n문의 및 이의 제기는 https://invite.gg/wonderbot 에서 하실 수 있습니다.',
        cooldown:
      '명령어 사용이 쿨타임중입니다.\n`{time}`초 후에 사용 가능합니다\n쿨타임에 대해 더 알고 싶으시다면 `{prefix}쿨타임` 명령어를 사용하세요.',
        botperm: '이 명령어를 실행하기 위해서는 봇에게 {perms} 권한이 요구됩니다.',
        timeout: '시간이 초과되어 취소되었습니다.',
        nouser: '해당 유저는 원더봇에 가입되지 않았습니다.',
        already: '다른 작업이 진행중입니다. 작업을 완료한 후 명령어를 시도하세요.',
        usage: function(cmd, prefix) {
            var text = ''
            var desc = ''
            var args = (commands[cmd] || commands[inko.en2ko(cmd)] || commands[inko.ko2en(cmd)]).props.args
            args.forEach(a => {
                if (!a.type) return
                if (a.required) {
                    text += `[${a.options ? a.options.join('|') : usageNames[a.name]}] `
                    desc += `[${usageNames[a.name]} - ${
                        usageNames[a.type.toString()]
                    }](필수)\n`
                } else {
                    text += `(${a.options ? a.options.join('|') : usageNames[a.name]})`
                    desc += `[${usageNames[a.name]} - ${usageNames[a.type.toString()]}]\n`
                }
            })
            if (text.length === 0) {
                text += '(없음)'
                desc += '요구된 변수가 없습니다.'
            }
            return `사용법 : \n\`\`\`fix\n${prefix}${cmd} ${text}\`\`\` \`\`\`ini\n${desc}\`\`\`
            `
        }
    },
    link: {
        tos: 'https://callisto.team/tos',
        privacy: 'https://callisto.team/privacy'
    },
    category: {
        wonderbot: '원더봇',
        dev: '개발자용',
        account: '계정',
        money: '돈',
        fun: '재미',
        game: '도박',
        utills: '기능',
        stats: '스텟',
        season: '시즌한정',
        moderation: '관리',
        reason: '사유'
    },
    perm: {
        CREATE_INSTANT_INVITE: '초대 코드 만들기',
        KICK_MEMBERS: '멤버 추방하기',
        BAN_MEMBERS: '멤버 차단하기',
        ADMINISTRATOR: '관리자',
        MANAGE_CHANNELS: '채널 관리하기',
        MANAGE_GUILD: '서버 관리하기',
        ADD_REACTIONS: '반응 추가하기',
        VIEW_AUDIT_LOG: '감사 로그 보기',
        PRIORITY_SPEAKER: '우선 발언권',

        VIEW_CHANNEL: '채널 보기',
        READ_MESSAGES: '메세지 읽기',
        SEND_MESSAGES: '메세지 보내기',
        SEND_TTS_MESSAGES: 'TTS 메세지 보내기',
        MANAGE_MESSAGES: '메세지 관리',
        EMBED_LINKS: '링크 첨부',
        ATTACH_FILES: '파일 첨부',
        READ_MESSAGE_HISTORY: '메세지 기록 보기',
        MENTION_EVERYONE: '모두 멘션하기',
        EXTERNAL_EMOJIS: '외부 이모티콘',
        USE_EXTERNAL_EMOJIS: '외부 이모티콘 사용하기',

        CONNECT: '연결',
        SPEAK: '말하기',
        MUTE_MEMBERS: '멤버들의 마이크 음소거하기',
        DEAFEN_MEMBERS: '멤버들의 헤드셋 음소거하기',
        MOVE_MEMBERS: '멤버 이동',
        USE_VAD: '음성 감지 사용',

        CHANGE_NICKNAME: '별명 변경하기',
        MANAGE_NICKNAMES: '별명 관리하기',
        MANAGE_ROLES: '역할 관리하기',
        MANAGE_ROLES_OR_PERMISSIONS: '역할 또는 권한 관리하기',
        MANAGE_WEBHOOKS: '웹훅 관리하기',
        MANAGE_EMOJIS: '이모티콘 관리하기'
    }
}

const usageNames = {
    option: '옵션',
    number: '숫자',
    money: '돈',
    text: '텍스트',
    user: '유저',
    stock: '아이템',
    count: '수량',
    script: '스크립트',
    'user/text': '유저 또는 텍스트',
    delivery: '택배사',
    bill: '운송장',
    item: '아이템',
    botid: '봇 아이디',
    perm: '권한',
    'user/id': '유저 또는 아이디',
    gamemode: '게임모드',
    battletag: '배틀태그',
    city: '도시명',
    reason: '사유',
    channel: '채널',
    warnlimt: '경고 한도',
    cmd: '명령어',
    address: '주소',
    season: '시즌',
    periodic: '원소기호',
    bet: '배팅금',
    seconds: '시간(초)',
    currency: '변환할 화폐단위',
    iso4217: 'ISO 4217 코드',
    fromMoney: '변환할 금액',
    moneyresolvable: '숫자+화폐단위',
    prefix: '변경할 접두사',
    sender: '전송자',
    station: '역명'
}
