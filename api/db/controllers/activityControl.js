var { Activity } = require("../models/activityModel");
module.exports = {
  create: (obj, callbacks) => {
    const activity = new Activity(obj);
    activity.save(callbacks);
  },
  read: callbacks => {
    Activity.find().exec(callbacks);
  },
  update: (id, obj, callback) => {
    Activity.findOneAndUpdate({ _id: id }, obj, callback);
  },
  delete: (id, callback) => {
    Activity.findOneAndDelete({ _id: id }).exec(callback);
  }
};
