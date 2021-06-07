export const events = {
    handler: (socket, roomname) => {

        socket.on('move', function (direction, position) {

            console.log("move " + direction + " " + position)
            console.log(roomname)

            socket.to(roomname).emit('positionUpdate', { player: socket.data.username, coords: '' })

        })




    }
};
export default events


