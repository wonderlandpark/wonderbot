module.exports.execute = async () => {
  throw new Error('GG');
};

module.exports.props = {
  name: "errortest",
  perms: "dev",
  alias: ["에러"],
  args: []
};
