const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportLocal = require("./passportLocal");
const passportGoogle = require("./passportGoogle");
const passportFacebook = require("./passportFacebook");
const User = require("./db/models/users.js");

const app = express();
mongoose.connect(
  "mongodb+srv://dhiadhafer:dhia123@cluster0.4vcxr.mongodb.net/esciper?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  { useMongoClient: true }
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose.connection
  .once("open", () => console.log("Connected to the database!"))
  .on("error", err => console.log("Error", err));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passportLocal(passport, User.getUserByEmail, User.getUserById);
passportGoogle(passport);
passportFacebook(passport);

app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send({ username: req.user.username });
  } else {
    return res.send({ username: false });
  }
  console.log({ user: req.user });
  res.json({ user: req.user });
});
app.post("/login", passport.authenticate("local"), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log("req.user", { user: req.user });
  res.json({ user: req.user });
});

//google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);
//facebook
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"]
  })
);

app.get(
  "/auth/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

app.post("/register", checkNotAuthenticated, async (req, res) => {
  let { username, email, password } = req.body;
  try {
    user = await User.save({ username, email, password });
    passport.authenticate("local")(req, res, function() {
      res.json({ user: req.user });
    });
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});
app.delete("/logout", (req, res) => {
  req.logOut();

  res.sendStatus(204);
  // res.redirect("/login");
});
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
var products = require("./routes/products.js");
var blogs = require("./routes/blogs.js");
app.use("/blogs", blogs);
var appointment = require("./routes/appointment.js");

app.get("/images/:img", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", req.params.img));
});

app.use("/appointment", appointment);

var activity = require("./routes/activity.js");
app.use("/activity", activity);

module.exports = {
  path: "/api",
  handler: app
};
