var express = require("express");
var mapControle = require("../db/controllers/mapControle.js");
var router = express.Router();

router.route("/").post(function (req, res) {
  debugger;
  mapControle.create(req.body, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});
router.route("/").get(function (req, res) {
  mapControle.read((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});
router.route("/:id").delete((req, res) => {
  console.log(req.params.id);
  mapControle.delete(req.params.id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});
module.exports = router;