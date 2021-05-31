import disconnect from './disconnect.js';
import pairing from './pairing.js';
export var connect = {
    socketFunc: (io) => {

        io.sockets.on('connection', function (socket) {
            socket.emit('debugoutput', "test emitu")
            socket.on('adduser', function (username) {
                GLOBALlobby.push(username)
                console.log(GLOBALlobby)

                socket.username = username
                console.log(socket.username)
            })

            socket.on('disconnect', function () {

                console.log('disconnected')
                if (socket.data.username != undefined) {
                    console.log(socket.data.username)
                    GLOBALlobby = GLOBALlobby.filter(username => username != socket.data.username)
                    console.log(GLOBALlobby)
                }

            });

            //disconnect.socketFunc(socket)
            pairing.socketFunc(io, socket)

        });


    }
};
export default connect



