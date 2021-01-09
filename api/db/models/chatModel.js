var mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Chat = mongoose.model("chat", chatSchema);

module.exports.Chat = Chat;
