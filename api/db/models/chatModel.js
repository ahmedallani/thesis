var mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
 from:{type:String},
 message:{type:String},
 to:{type:String}
})

const Chat = mongoose.model("chat",chatSchema)

module.exports.Chat = Chat