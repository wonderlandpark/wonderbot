module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (message.data.args && !props.args[0].options.includes(message.data.arg[0]))
    return message.reply('\n' + locale.error.usage(message.data.cmd))
  if (props.args[0].options.includes(message.data.arg[0])) {
    await message.reply('✅ 프로세스를 종료합니다.')
    // eslint-disable-next-line no-undef
    process.exit()
  }
  try {
    Object.keys(require.cache).forEach(function(key) {
      if (key.includes('node_modules')) return
      delete require.cache[require.resolve(key)]
    })
    await message.channel.send(
      `✅ ${
        Object.keys(require('../../locale')).length
      }개의 언어를 리로드하였습니다.`
    )
    await message.channel.send(
      `✅ ${
        Object.keys(require('../../config')).length
      }개의 설정파일을 리로드하였습니다.`
    )
    await message.channel.send(
      `✅ ${
        Object.keys(require('../../tools')).length
      }개의 툴 카테고리를 리로드하였습니다.`
    )
    await message.channel.send(
      `✅ ${Object.keys(require.cache).filter(i => !i.includes('node_modules'))
        .length -
        Object.keys(require('../../locale')).length -
        Object.keys(require('../../config')).length -
        Object.keys(require('../../tools'))
          .length} 개의 기타 파일을 리로드하였습니다.`
    )
    await message.channel.send(
      `✅ 리로드 가능한 \`${
        Object.keys(require.cache).filter(i => !i.includes('node_modules'))
          .length
      }\`개의 파일을 리로드하였습니다. \`node_modules\` 업데이트를 위해서는 프로세스를 재시작 하세요.\n\`--process\` 옵션으로 프로세스를 재시작할 수 있습니다.`
    )
  } catch (e) {
    message.channel.send(
      `❎ 리로드중 오류가 발생하였습니다.\n오류:\n\`\`\`err\n${e}\`\`\``
    )
  }
}

module.exports.props = {
  name: 'reboot',
  perms: 'dev',
  alias: ['재시작', 'restart'],
  args: [
    {
      name: 'option',
      type: 'text',
      required: false,
      options: ['--process']
    }
  ]
}
