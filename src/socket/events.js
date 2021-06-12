export const events = {
    handler: (socket, roomname) => {

        socket.on('move', function (direction, position) {
            let data = { player: socket.data.username, coords: '' }

            socket.to(roomname).emit('positionUpdate', data)


            console.log("move " + direction + " " + position)
            console.log(roomname + ' ' + data)
        })




    }
};
export default events


