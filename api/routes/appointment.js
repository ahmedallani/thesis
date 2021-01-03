var express = require("express");
var appointmentControle = require("../db/controllers/appointmentControle.js");
const exphbs = require('express-handlebars');
var smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
var router = express.Router();
const app = express()


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


router.route("/").post(function(req, res){
  const output = `
    <p>You have a new reservation</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Appointment Date: ${req.body.appointmentDate}</li>
      <li>Place: ${req.body.place}</li>
      <li>Number Of People: ${req.body.numberOfPeople}</li>
    </ul>

  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.google.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'messaoudighofrane2@gmail.com', // generated ethereal user
        pass: '291220fafou'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <messaoudighofrane2@gmail.com>', // sender address
      to: 'ahmedbouhrira365@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'nouuunaaaa', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
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
