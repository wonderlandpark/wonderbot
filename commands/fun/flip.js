module.exports.execute = (client, message, command, embed, commands, Discord) => {
// const config = require("./settings/config.json");
// const prefix = (config.prefix)

var flip = require('flip-text')

if (!message.data.args){

    return message.reply(locale.error.usage(this.props.name));
}

if (message.mentions.members.first()){var txt = message.guild.member(message.mentions.members.first().user).displayName}
else{var txt = message.data.args}

var txtfliped = flip(txt);
message.reply(txtfliped)


}

module.exports.props = {
    name : 'flip',
    perms : 'general',
    alias : ['뒤집기'],
    args : [{
        name : 'user / text',
        type : 'usertext',
        required : true
    }]
}