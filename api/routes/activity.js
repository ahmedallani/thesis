var express = require("express");
var activityControl = require("../db/controllers/activityControl.js");
var router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "assets");
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});
var upload = multer({ storage });
router.post("/", upload.single("image"), function(req, res) {
  const obj = {
    title: req.body.title,
    image: req.file.originalname,
    description: req.body.description,
    food: req.body.food,
    transportation: req.body.transportation
  };
  console.log("obj", obj);
  activityControl.create(obj, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});
router.route("/:id").put(function(req, res) {
  console.log(req.body);
  activityControl.update(req.params.id, req.body, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});
router.route("/:id").delete((req, res) => {
  console.log(req.params._id);
  activityControl.delete(req.params._id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;
