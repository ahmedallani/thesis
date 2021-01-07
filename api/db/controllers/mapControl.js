const { map } = require("leaflet");
var { Modelmap } = require("../models/map");
module.exports = {
  create: (obj, callbacks) => {
    const map = new Modelmap(obj);
    map.save(callbacks);
  },
  read: (callbacks) => {
    Modelmap.find().exec(callbacks);
  },
  delete: (id, callback) => {
    Modelmap.findByIdAndRemove({ _id: id }).exec(callback);
  },
}