const express = require("express");
const socket = require('socket.io');
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static('public'));

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});

const io = socket(server);

io.on("connection", function (socket) {
   socket.on("playerMove", function (data) {
       socket.emit("playerMove", data);
   });
   socket.on("playerFire", function (data) {
      socket.emit("playerFire", data);
   });
});