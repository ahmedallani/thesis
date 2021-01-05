var express = require("express");
var router = express.Router();

const chatControle = require("../db/controllers/chatControle.js");
let adminId = "5ff4e6d86ed18531d8b098ea"
router.route("/").post(function (req, res) {
  let  chat = {
    from:req.user._id,
    message: req.body.message,
    to:adminId
  }

  chatControle.create(chat, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/").get(function (req, res) {
  chatControle.read(req.user._id, adminId,(err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;