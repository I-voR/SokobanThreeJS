socket.emit('requestMap')
socket.on('postMap', function (mapJSON) {
    console.log(mapJSON)
})
