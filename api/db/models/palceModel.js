var mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  activity:{ type: mongoose.Schema.Types.ObjectId, ref: 'activity' },
  lat: Number,
  lng: Number,
  title: String
});

const PlaceModel = mongoose.model("place", placeSchema);

module.exports.PlaceModel = PlaceModel;
