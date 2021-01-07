var mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  lat: Number,
  lng: Number,
  title: String
});

const PlaceModel = mongoose.model("place", placeSchema);

module.exports.PlaceModel = PlaceModel;
