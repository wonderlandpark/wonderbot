const commands = require('../index')
module.exports.execute = async (client, message, locale, embed, tools, knex, props) => {
if(!message.data.args){
    Object.keys(commands.categorys).forEach(cat=>{
        
    })
}

}


module.exports.props = {
    name : 'help',
    perms : 'general',
    alias : ['도움','도움말','명령어','commands'],
    args : [{

    }]
}