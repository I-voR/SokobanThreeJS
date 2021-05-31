import disconnect from './disconnect.js';
import pairing from './pairing.js';
export const connect = {
    socketFunc: (io) => {
        io.on("connection", socket => { /* ... */ });
        io.sockets.on('connection', function (socket) {
            socket.emit('debugoutput', "test emitu")
            socket.on('adduser', function (username) {
                GLOBALlobby.push(username)
                console.log(GLOBALlobby)

                socket.username = username
                console.log(socket.username)
            })



            disconnect.socketFunc(socket)
            pairing.socketFunc(io, socket)

        });


    }
};
export default connect



