var express = require("express");
var router = express.Router();
var mapControle = require("../db/controllers/mapControle.js");

router.route("/").get(function(req, res) {
  mapControle.read((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.post("/", function(req, res) {
  const obj = {
    title:req.body.title,
    type:req.body.type,
    coordinates :req.body.coordinates
  };
  console.log("obj", obj);
  mapControle.create(obj, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/:id").delete((req, res) => {
  console.log(req.params.id);
  mapControl.delete(req.params.id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router