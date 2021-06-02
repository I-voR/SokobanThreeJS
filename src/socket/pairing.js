
export var pairing = {
    socketFunc: (io, socket) => {

        if (GLOBALlobby.length === 2) {
            io.to('poczekalnia').emit('leavePoczekalnia');
        }

        socket.on('createSession', function () {
            let users = GLOBALlobby
            let roomname = GLOBALlobby[0] + '-' + GLOBALlobby[1]
            socket.join(roomname)
        })


    }
};
export default pairing



