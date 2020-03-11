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
  if (
    (
      await knex
        .select('*')
        .from('users')
        .where({ id: message.author.id })
    ).length > 0
  ) {
    return message.reply(
      locale.commands.register.message.bind({
        contact: locale.commands.register.contact
      })
    );
  } else {
      if (data.register.includes(message.author.id))
          return message.reply(locale.error.process);
      embed.setDescription(locale.commands.register.yet);
      embed.addField(
          locale.commands.register.register,
          locale.commands.register.start
      );
      embed.addField(
          locale.commands.register.tos,
          '[{to}]({tos})'.bind({
              tos: locale.link.tos,
              to: locale.commands.register.to
          }),
          true
      );
      embed.addField(
          locale.commands.register.privacy,
          '[{to}]({privacy})'.bind({
              privacy: locale.link.privacy,
              to: locale.commands.register.to
          }),
          true
      );

      const filter = m =>
          m.content === locale.commands.register.code &&
          m.author.id === message.author.id;
      data.register.push(message.author.id);
      await message.channel.send(embed);
      message.channel
          .awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
          .then(async collected => {
              if (!collected) {
                  await data.register.splice(
                      data.register.indexOf(message.author.id),
                      1
                  );
                  await message.reply(locale.commands.register.timeout);
              }
              await data.register.splice(data.register.indexOf(message.author.id), 1);
              await knex
                  .insert({
                      id: message.author.id,
                      join: Math.round(new Date() / 1000)
                  })
                  .from('users');
              return message.reply(locale.commands.register.thanks);
          })
          .catch(async collected => {
              console.log(collected);
              await data.register.splice(data.register.indexOf(message.author.id), 1);
              await message.reply(locale.commands.register.timeout);
          });
        }
};

module.exports.props = {
  name: 'register',
  perms: 'general',
  alias: ['가입', '등록'],
  args: []
};
