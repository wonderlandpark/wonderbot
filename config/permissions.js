const config = require("./index.js");
const perm = [
  {
    name: "general",
    required: {
      perms: []
    }
  },
  {
    name: "dev",
    required: {
      perms: [],
      id: config.client.owners
    }
  }
];
module.exports = perm;
