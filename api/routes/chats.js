var express = require("express");
var router = express.Router();

const chatControle = require("../db/controllers/chatControle.js");
// let adminId = "5ff4e6d86ed18531d8b098ea";

router.route("/").post(function(req, res) {
  let chat = {
    from: req.user._id,
    message: req.body.message,
    to: req.body.to
  };
  chatControle.create(chat, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/").get(function(req, res) {
  console.log("req.query", req.query);
  let obj = {
    user1: req.user._id,
    user2: req.query.user2
  };
  chatControle.read(obj, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;
