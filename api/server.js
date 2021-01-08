const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

const app = require("./index");

const { Nuxt, Builder } = require("nuxt");
// We instantiate Nuxt with the options
const config = require("../nuxt.config.js");
config.dev = !isProd;

const nuxt = new Nuxt(config);
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}
app.use(nuxt.render);
var http = require("http").createServer(app);
var io = require("socket.io")(http);
io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("chat", function(data) {
    // console.log(data);
    io.sockets.emit("chat", {...data,socket:socket.id});
  });

  // Handle typing event
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
