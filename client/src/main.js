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

    let username = prompt("Type your nickname: ")
    while (username == "" || username == undefined) {
        username = prompt("Your nickname can't be empty! Type your nickname: ")
    }
    socket.emit('adduser', username)


})


function debug() {
    socket.emit('debug')
}
socket.on('debugoutput', function (a) {
    console.log(a)
})
socket.on('leavePoczekalnia', function (a) {
    socket.emit("createSession")
})

function roomTest() {

}

