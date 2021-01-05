var express = require("express");
var router = express.Router();

const chatControle = require("../db/controllers/chatControle.js");

router.route("/").post(function (req, res) {

  chatControle.create(req.body, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/").get(function (req, res) {
  chatControle.read((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;