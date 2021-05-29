//const { $CombinedState } = require("redux")
console.log(location.href)


const socket = io(location.href, {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10001,
    "transports": ["websocket"]
})


//var socket = io.connect('http://localhost:8000')

socket.on('connect', function () {


})


function debug() {
    socket.emit('debug')
}
socket.on('debugoutput', function (a) {
    console.log(a)
})

