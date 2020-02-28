const config = require('./index.js');
const perm = [
  {
    name: 'general',
    required: {
      perms: []
    }
  },
  {
    name: 'admin',
    required: ['ADMINISTRATOR']
  },
  {
    name: 'ban',
    required: ['BAN_MEMBERS']
  },
  {
    name: 'kick',
    required: ['KICK_MEMBERS']
  },
  {
    name: 'dev',
    required: {
      perms: [],
      id: config.client.owners
    }
  }
];
module.exports = perm;
