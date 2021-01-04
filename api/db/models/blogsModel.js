const { strict } = require("assert");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogsSchema = new Schema({
  title: String,
  image: String,
  body: String
});

const Blogs = mongoose.model("blog", BlogsSchema);
module.exports.Blogs = Blogs;