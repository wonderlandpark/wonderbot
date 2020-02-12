const config = require('./index.js')

module.exports = [
  {
    name: 'general',
    required: {
      perms: []
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
