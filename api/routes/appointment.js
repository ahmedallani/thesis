var express = require("express");
var appointmentControle = require("../db/controllers/appointmentControle.js");
const exphbs = require("express-handlebars");
var smtpTransport = require("nodemailer-smtp-transport");
const nodemailer = require("nodemailer");
var router = express.Router();
// const app = express()

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

router.route("/").post(function(req, res) {
  const output = `
    <p>You have a new reservation</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Appointment Date: ${req.body.appointmentDate}</li>
      <li>Place: ${req.body.place}</li>
      <li>Number Of People: ${req.body.numberOfPeople}</li>
    </ul>
  `;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'escapercompany@gmail.com',
      pass: 'escaperrbk2021'
    }
  });
  
  var mailOptions = {
    from: 'escapercompany@gmail.com',
    to: 'messaoudighofrane2@gmail.com , dhiadhaferr@gmail.com , ahmedbouhrira365@gmail.com  ',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html:output
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send({error});
    } else {
      console.log('Email sent: ' + info.response);
      res.send({info})
    }
  });
 
});

// router.route("/").post(function(req, res) {
//   appointmentControle.create(req.body, (err, data) => {
//     if (err) {
//       throw err;
//     }
//     res.send(data);
//   });
// });

router.route("/").get(function(req, res) {
  appointmentControle.read((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/:id").delete((req, res) => {
  console.log(req.params.id);
  appointmentControle.delete(req.params.id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;
