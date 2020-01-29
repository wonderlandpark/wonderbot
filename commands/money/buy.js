module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props
) => {
  if (!message.data.arg[1]) {
    return message.reply(locale.error.usage(props.name));
  }
  const res = find(message.data.arg[0]);
  if (!res || res.length == 0)
    return message.reply(locale.commands.stock.nores);
  else if (res.length > 1)
    return message.reply(
      locale.commands.stock.many.bind({
        count: res.length,
        stocks: res.map(r => r.name + "\n").join("")
      })
    );
  const money = (
    await knex("users")
      .select("*")
      .where({ id: message.author.id })
  )[0].money;
  const stock = (
    await knex("stocks")
      .select("*")
      .where({ name: res[0].id })
  )[0];
  console.log(money, stock);
  var num = 0;
  var dived = 0;
  var total = 0;
  if (["전부", "올인", "모두", "all"].includes(message.data.arg[1])) {
    num = parseInt(money / Number(stock.now), 10);
    total = num * stock.now;
    dived = money - total;
  } else if (["반인", "반", "half"].includes(message.data.arg[1])) {
    num = parseInt(money / 2 / Number(stock.now), 10);
    total = num * stock.now;
    dived = money - total;
  } else if (
    isNaN(message.data.arg[1] || !Number(message.data.arg[0].isInteger()))
  )
    return message.reply(locale.commands.stock.notvaild);
  else {
    num = Number(message.data.arg[1]);
    total = num * stock.now;
    dived = money - total;
  }
  if (dived < 0) return message.reply(locale.commands.stock.nomoney);
  message.reply(
    `매수 테스트\n구매되는 주식의 수 : ${num}\n잔고 : ${dived}\n비용 : ${total}`
  );
};

module.exports.props = {
  name: "buy",
  perms: "dev",
  alias: ["매수", "구매"],
  args: [
    {
      name: "stock",
      type: "text",
      required: true
    },
    {
      name: "count",
      type: "number",
      required: true
    }
  ]
};

function find(str) {
  var s = [
    { id: "wonderland", name: "원더랜드" },
    { id: "marymary ", name: "매리웨딩" },
    { id: "sangoon", name: "산군홈쇼핑" },
    { id: "kimbab", name: "김밥천마" },
    { id: "mc", name: "웅범널드" },
    { id: "coin", name: "코인은행" },
    { id: "chamoong", name: "채뭉크루아상항공" }
  ];
  return s.filter(r => r.id.includes(str) || r.name.includes(str));
}
