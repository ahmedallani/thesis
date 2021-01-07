const { strict } = require("assert");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  image: String,
  description: String,
  price: Number,
  place_Id: Number
});

const Activity = mongoose.model("activity", ActivitySchema);

module.exports.Activity = Activity;
