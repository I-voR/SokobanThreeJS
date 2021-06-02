import disconnect from './disconnect.js';
import pairing from './pairing.js';
import map from './mapPost.js'
export var connect = {
    socketFunc: (io) => {
        io.on("connection", socket => { /* ... */ });
        io.sockets.on('connection', function (socket) {
            socket.emit('debugoutput', "test emitu")
            socket.on('adduser', function (username) {
                if (GLOBALlobby.length === 2) {
                    GLOBALlobby = []
                }
                GLOBALlobby.push(username)
                console.log(GLOBALlobby)

                socket.username = username
                console.log(socket.username)
                socket.join('poczekalnia')

                pairing.socketFunc(io, socket)
                map.Post(socket)
            })



            disconnect.socketFunc(socket)

        });


    }
};
export default connect



