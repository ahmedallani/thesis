const { Chat } = require("../models/chatModel");

module.exports = {
  create: (obj, callbacks) => {
    const app = new Chat(obj);
    app.save(callbacks);
  },
  read: ({ user1, user2 }, callbacks) => {
    Chat.find({
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 }
      ]
    })
      .populate("from","username")
      .populate("to","username")
      .sort({'_id': -1})
      .exec(callbacks);
  }
};
