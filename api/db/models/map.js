var mongoose = require("mongoose");

const mapSchema = mongoose.Schema({
  location: {
		type : Point,
		coordinates : []
  },
  title: String
});

const Modelmap = mongoose.model("map", mapSchema);

module.exports.Modelmap = Modelmap;
