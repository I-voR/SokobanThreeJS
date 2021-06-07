//import { events } from '../../client/src/events.js';
import map from './mapPost.js'
import events from './events.js'
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
            socket.data.room = roomname
            socket.emit('debugoutput', roomname)
            socket.emit('sessionready')

            map.Post(socket, roomname)
            events.handler(socket, roomname)
        })


    }
};
export default pairing



