var express = require("express");
var router = express.Router();
var placeControle = require("../db/controllers/placeControle.js");

router.route("/").get(function(req, res) {
  placeControle.read((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.post("/", function(req, res) {
  const obj = {
    lat : req.body.lat,
    lng: req.body.lng,
    title:req.body.title
  };
  console.log("obj", obj);
  placeControle.create(obj, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.delete("/:id", function(req, res) {
  console.log(req.params.id);
  placeControl.delete(req.params.id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router