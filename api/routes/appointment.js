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

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "messaoudighofrane2@gmail.com",
        pass: "291220fafou"
      }
    })
  );

  // setup email data with unicode symbols
  let mailOptions = {
    from: "messaoudighofrane2@gmail.com", // sender address
    to: "ahmedbouhrira365@gmail.com", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "hiiiiiiii", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", info.response);
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
