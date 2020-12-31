var mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  title: String,
  image: String,
  description: String,
  food: Boolean,
  transportation: Boolean
});

const Activity = mongoose.model("activity", ActivitySchema);

module.exports.Activity = Activity;
