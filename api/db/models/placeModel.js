const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaceSchema = new Schema({
  longitude: Number,
  latitude: Number,
  service_id: Number
});

const Place = mongoose.model("place", PlaceSchema);

module.exports.Place = Place;
