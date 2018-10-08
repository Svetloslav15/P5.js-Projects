var opponents = [];

function Opponent(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
}

let express = require('express');
let app = express();

let server = app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000...");
});

app.use(express.static('public'));

let io = require('socket.io')(server);

setInterval(heartbeat, 33);

function heartbeat() {
    io.sockets.emit('heartbeat', opponents);
}

io.sockets.on('connection',
    function(socket) {
        console.log("We have a new client: " + socket.id);

        socket.on('start',
            function(data) {
                console.log(socket.id + " " + data.x + " " + data.y + " " + data.radius);
                let opponent = new Opponent(socket.id, data.x, data.y, data.radius);
                opponents.push(opponent);
            }
        );

        socket.on('update',
            function(data) {
                let opponent;
                for (let i = 0; i < opponents.length; i++) {
                    if (socket.id == opponents[i].id) {
                        opponent = opponents[i];
                        opponent.x = data.x;
                        opponent.y = data.y;
                        opponent.r = data.radius;
                    }
                }

            }
        );

        socket.on('disconnect', function() {
            console.log("Client has disconnected");
        });
    }
);