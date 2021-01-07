var { Modelmap } = require("../models/mapModel");
module.exports = {
  create: (obj, callbacks) => {
    const map = new Modelmap(obj);
   map.save(callbacks);
  },
  read: callbacks => {
    Modelmap.find().exec(callbacks);
  },
  delete: (id, callback) => {
    Modelmap.findOneAndDelete({ _id: id }).exec(callback);
  }
};