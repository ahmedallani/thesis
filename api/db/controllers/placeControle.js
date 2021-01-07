var { PlaceModel } = require("../models/palceModel");
module.exports = {
  create: (obj, callbacks) => {
    const place = new PlaceModel(obj);
    place.save(callbacks);
  },
  read: callbacks => {
    PlaceModel.find().exec(callbacks);
  },
  delete: (id, callback) => {
    PlaceModel.findOneAndDelete({ _id: id }).exec(callback);
  }
};
