const express = require("express");
require('dotenv').config()
const path = require("path");
const { User } = require("./db/models/users");

const port = process.env.PORT || 3000;
let isProd = process.env.NODE_ENV === "production";
const app = require("./index");
if (isProd) {
  let pth = path.join(__dirname, "../dist");
  app.use(express.static(pth));
} else {
  const { Nuxt, Builder } = require("nuxt");

  const config = require("../nuxt.config.js");
  config.dev = !isProd;

  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
  }
  app.use(nuxt.render);
}
var http = require("http").createServer(app);
var io = require("socket.io")(http);
io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("update", async function(data) {
    debugger;
    console.log("update", data);
    let user = await User.findOne({ _id: data.to });
    console.log(user, io.sockets.sockets);
    if (user.socket !== undefined) {
      socket.broadcast.to(user.socket).emit("update", { from: data.from });
    }
  });

  // Handle typing event
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
