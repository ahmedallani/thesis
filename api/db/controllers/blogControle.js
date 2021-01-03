var { Blogs } = require("../models/blogsModel");

module.exports = {
  create: (obj, callbacks) => {
    const blog = new Blogs(obj);
    blog.save(callbacks);
  },
  read: (callbacks) => {
    Blogs.find().exec(callbacks);
  },
  update: (id, obj, callback) => {
    Blogs.findOneAndUpdate(
      { _id: id },
      obj,
      callback
    );
  },
  delete: (id, callback) => {
    Blogs.findByIdAndRemove({ _id: id }).exec(callback);
  },
};