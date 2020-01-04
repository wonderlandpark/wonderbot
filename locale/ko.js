const config = require('../config')
module.exports = {
    language : {
        english : 'Korean',
        native : '한국어',
        code : 'ko'
    },
    commands : {
        ping : {
            ping : "핑! 봇의 지연시간을 측정중입니다.",
            this : "🏓 퐁!",
            pong : "봇 지연시간 : {bot}ms\nAPI 지연시간 : {api}ms\nDB 쿼리 지연시간 : {db}ms"
        },
        register : {
            message : '이미 가입되신 상태입니다. 데이터 초기화 및 계약 철회 또는 약관 문의는 {contact} 에서 하실 수 있습니다.',
            contact : 'https://invite.gg/wonderbot 또는 개발자 `wonderlandpark#9999`의 DM',
            register : '가입하기',
            tos : '이용약관',
            privacy : '개인정보취급방침',
            to : '바로가기',
            yet : '아직 약관에 동의하지 않으셨습니다.\n해당 채널에 `동의`를 입력하시면 모든 약관을 수락하신걸로 간주됩니다.',
            start : '원더봇을 이용하시려면 반드시 다음 약관에 동의하셔야합니다.',
            code : '동의',
            timeout : '시간이 초과되어 취소되었습니다.',
            thanks : '원더봇의 약관을 동의해주셔서 감사합니다! 이제 모든 기능을 이용하실 수 있습니다.'
        },
        money : {
            money : '돈',
            text : '{user}님의 잔고는 **{money}**원 입니다!',
            not : '아직 가입을 하지 않은 유저입니다.'
        }
    },
    error : {
        noperm: '당신은 이 명령어를 실행할 권한이 없습니다.\n요구 권한 : {perms}',
        process : '이미 해당 작업을 진행중입니다. 작업을 마치고 실행해 주세요.',
        blacklist : '당신은 원더봇 사용이 금지되었습니다.\n정지 기간 : {time} 까지\n사유 : {reason}',
        cooldown : '명령어 사용이 쿨타임중입니다.\n`{time}`초 후에 사용 가능합니다\n쿨타임을 없애고 싶으시다면 __원더봇 프리미엄__을 구매하세요',
        usage : function (cmd) {
            var text = ''
            var desc = ''
            var args = require('../commands/index.js')[cmd].props.args
            args.forEach(a=>{
                if(a.required) {
                    text += `[${usageNames[a.name]} `;
                    desc +=`[${usageNames[a.name]} - ${usageNames[a.type.toString()]}](필수)\n${a.options ? '옵션 : `' + a.options.join('`, `') + '`' : ''}`
                }
        
                else {
                    text += `(${usageNames[a.name]})`
                    desc +=`[${usageNames[a.name]} - ${usageNames[a.type.toString()]}]\n${a.options ? '옵션 : `' + a.options.join('`, `') + '`' : ''}`
                }
            })
            return `사용법 : \n\`\`\`fix\n${config.client.prefix}${cmd} ${text}\`\`\` \`\`\`ini\n${desc}
            \`\`\`
            `
    }
},
link : {
    tos : 'https://wonderbot.xyz/tos',
    privacy : 'https://wonderbot.xyz/privacy'
},
category : {
    
}
}



const usageNames = {
    option: '옵션',
    text: '텍스트'
}w