export const map = {
    Post: (socket) => {

        socket.on('requestMap', function () {
            //global jsona z mapami
            let mapJSON = GLOBALmaps

            socket.emit('postMap', mapJSON)
        })




    }
};
export default map


