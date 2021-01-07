var mongoose = require("mongoose");

const mapSchema = mongoose.Schema({
  location: {
		type : Point,
		coordinates : []
  },
  discription: String
});

const Modelmap = mongoose.model("map", mapSchema);

module.exports.Modelmap = Modelmap;
