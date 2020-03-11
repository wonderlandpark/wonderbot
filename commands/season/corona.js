// TODO: Should Fix or delete this feature
const fetch = require('node-fetch');
const cheerio = require('cheerio');
module.exports.execute = async (client, message, locale, embed) => {
  message.reply('해당 기능은 점검중입니다.')
  const page = await fetch(
    'https://namu.wiki/w/%EC%BD%94%EB%A1%9C%EB%82%98%EB%B0%94%EC%9D%B4%EB%9F%AC%EC%8A%A4%EA%B0%90%EC%97%BC%EC%A6%9D-19/%EA%B2%BD%EA%B3%BC/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%ED%99%95%EC%A7%84%EC%9E%90%20%ED%98%84%ED%99%A9'
  ).then(b => b.text());
  const $ = cheerio.load(page, { decodeEntities: false });
  console.log(
    $('.wiki-table')
      .eq(3)
      .find('.wiki-image')
      .first()
      .attr('src')
  );
  embed.addField(
    locale.commands.corona.corona,
    locale.commands.corona.desc.bind({
      cured: $('.wiki-table')
        .eq(3)
        .find('tr')
        .eq(43)
        .find('td')
        .eq(1)
        .find('strong')
        .text(),
      iscorona: $('.wiki-table')
        .eq(3)
        .find('tr')
        .eq(44)
        .find('td')
        .eq(1)
        .find('strong')
        .text(),
      dead: $('.wiki-table')
        .eq(3)
        .find('tr')
        .eq(45)
        .find('td')
        .eq(1)
        .find('strong')
        .text()
    })
  );
  embed.setImage(
    'https:' +
      $('.wiki-table')
        .eq(3)
        .find('.wiki-image')
        .first()
        .attr('src')
  );
  message.reply(embed);
};
module.exports.props = {
  name: 'corona',
  perms: 'general',
  alias: ['코로나'],
  args: []
};
