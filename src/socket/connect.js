import disconnect from './disconnect.js';
import pairing from './pairing.js';

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

                socket.data.username = username
                console.log(socket.data.username)
                socket.join('poczekalnia')
                socket.data.room = 'poczekalnia'

                pairing.socketFunc(io, socket)

            })



            disconnect.socketFunc(socket)

        });


    }
};
export default connect



