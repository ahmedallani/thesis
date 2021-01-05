const { Chat } = require("../models/chatModel");

module.exports = {
  create: (obj, callbacks) => {
    const app = new Chat(obj);
    app.save(callbacks);
  },
  read: (id1, id2, callbacks) => {
    Chat.find({
      $or: [
        { from: id1, to: id2 },
        { from: id2, to: id1 }
      ]
    }).exec(callbacks);
  }
};
