
export var pairing = {
    socketFunc: (io, socket) => {

        if (GLOBALlobby.length === 2) {
            io.to('poczekalnia').emit('leavePoczekalnia');
        }

        socket.on('createSession', function () {
            let users = GLOBALlobby
            let roomname = users[0] + '-' + users[1]
            socket.leave('poczekalnia')
            socket.join(roomname)

            socket.emit('debugoutput', roomname)
        })


    }
};
export default pairing



