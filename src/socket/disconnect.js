import { Server } from "socket.io";

export const disconnect = {
    socketFunc: (socket) => {

        socket.on('disconnect', function () {
            console.log('disconnected' + socket.username)
            if (socket.username != undefined) {
                console.log(socket.username)
                GLOBALlobby = GLOBALlobby.filter(username => username != socket.username)
                console.log(GLOBALlobby)
            }
        });

    }
};
export default disconnect
