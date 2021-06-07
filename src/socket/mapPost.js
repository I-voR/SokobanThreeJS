export const map = {
    Post: (socket, roomname) => {

        socket.on('requestMap', function () {
            //global jsona z mapami
            let mapJSON = GLOBALmaps
            let index = Math.floor(Math.random() * (mapJSON.length))

            socket.to(roomname).emit('postMap', mapJSON[index])
        })




    }
};
export default map


