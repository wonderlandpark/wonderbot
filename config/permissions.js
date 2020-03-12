const config = require('./index.js')
const perm = [
  {
    name: 'general',
    required: {
      perms: []
    }
  },
  {
    name: 'admin',
    required: {
      perms: ['ADMINISTRATOR']
    }
  },
  {
    name: 'ban',
    required: {
      perms: ['BAN_MEMBERS']
    }
  },
  {
    name: 'kick',
    required: {
      perms: ['KICK_MEMBERS']
    }
  },
  {
    name: 'dev',
    required: {
      perms: [],
      id: config.client.owners
    }
  }
]
module.exports = perm
