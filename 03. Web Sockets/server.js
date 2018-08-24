const express = require("express");
const app = express();
const server = app.listen(3000);

const socket = require('socket.io');
const io = socket(server);

app.use(express.static('public'));
console.log('Server listening on port 3000...');

io.sockets.on('connection', function(socket){
    console.log("New client has connected!" + socket);

    socket.on("mouse", function(data){
       socket.broadcast.emit("mouse", data);
    });
});
