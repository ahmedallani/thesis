var express = require("express");
var router = express.Router();

const chatControle = require("../db/controllers/chatControle.js");
let adminId = "5ff4e6d86ed18531d8b098ea";

router.route("/").post(function(req, res) {
  let to
  let testTo = "to" in req.params;
  if (!testTo) {
    to = adminId;
  } else {
    to = req.params.to;
  }
  let chat = {
    from: req.user._id,
    message: req.body.message,
    to: to
  };
  chatControle.create(chat, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/").get(function(req, res) {
  let to
  let testTo = "to" in req.params;
  if (!testTo) {
    to = adminId;
  } else {
    to = req.params.to;
  }
  chatControle.read(req.user._id, to, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;
