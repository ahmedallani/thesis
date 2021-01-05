const {Chat} = require('../models/chatModel')

module.exports = {
  create: (obj, callbacks) => {
    const app = new Chat(obj);
    app.save(callbacks);
  },
  read: callbacks => {
    Chat.find().exec(callbacks);
  }
}