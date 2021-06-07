const events = {
    main: () => {
        $('body').on('keydown', function (e) {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':

                    socket.emit('move', 'up', events.getPlayerPosition())
                    break

                case 'ArrowLeft':
                case 'a':
                    socket.emit('move', 'left', events.getPlayerPosition())
                    break

                case 'ArrowDown':
                case 's':
                    socket.emit('move', 'down', events.getPlayerPosition())
                    break

                case 'ArrowRight':
                case 'd':
                    socket.emit('move', 'right', events.getPlayerPosition())
                    break

                default:
                    break
            }
        })

        events.socketHandle()
    },
    getPlayerPosition: () => {
        return ""
    },
    socketHandle: () => {

        socket.on('positionUpdate', function (object) {

            console.log(object.player + " " + object.coords)

        })

    }

}

