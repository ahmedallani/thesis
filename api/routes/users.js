var express = require("express");
var userControle = require("../db/controllers/userControle.js");

var router = express.Router();

router.route("/").get(function(req, res) {
  userControle.read((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/").put(function(req, res) {
  console.log("socket update",req.body);
  userControle.update(req.user.id, req.body, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;
