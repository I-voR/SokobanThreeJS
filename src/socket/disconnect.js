import { Server } from "socket.io";

export const disconnect = {
    socketFunc: (socket) => {

        socket.on('disconnect', function () {

            console.log('disconnected')
            if (socket.data.username != undefined) {
                console.log(socket.data.username)
                GLOBALlobby = GLOBALlobby.filter(username => username != socket.data.username)
                console.log(GLOBALlobby)
            }

        });

    }
};
export default disconnect
