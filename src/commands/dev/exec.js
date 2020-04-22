module.exports.execute = async (
    client,
    message,
    locale
) => {
    const { exec } = require('child_process')

  
    const request = message.data.args
    if(!message.data.args) return message.reply(locale.error.usage(message.data.cmd))
    if (request.includes('client.token')&&request.includes('message')){
        return message.channel.send('토큰을 전송해도 될까요?')
    }
    exec(request, (error, stdout, stderr) => {
        console.log('Attempting to exec handler: ' + request)
        if (error) {
            console.log('An error was printed: ' + error)
            error = error.toString()
            message.channel.send(error, {code: 'bash'})
            return
        }
        if (stdout.includes(client.token)) stdout = stdout.replace(client.token, '(accesstoken was hidden)')
        if (stdout.length > 1990) console.log('Attempted shell prompts: ' + stdout), stdout = 'Too long to be printed (content got console logged)'
        message.channel.send(stdout, {code: 'bash'}) 
        if (stderr) {
            if (stderr.includes(client.token)) stdout = stderr.replace(client.token, '(accesstoken was hidden)')
            if (stderr.length > 1990) console.log('An error was printed: ' + stderr), stderr = 'Too long to be printed (content got console logged)'
            message.channel.send(stderr, {code: 'bash'})
        }
    })
}
  
module.exports.props = {
    name: 'exec',
    perms: 'dev',
    alias: ['console'],
    args: [
        {
            name: 'script',
            type: 'text'
        }
    ]
}
  