/* eslint-disable no-unused-vars */
import Config from './components/Config'
import Main from './components/Main'

//const { $CombinedState } = require('redux')
console.log(location.href)

const socket = io(location.href, {
    'force new connection': true,
    'reconnectionAttempts': 'Infinity',
    'timeout': 10001,
    'transports': ['websocket']
})

//var socket = io.connect('http://localhost:8000')

socket.on('connect', function() {
    let user = prompt('Type your nickname: ')
    while (user === '' || user === null) {
        console.log(user)
        user = prompt('Your nickname can\'t be empty! Type your nickname: ')
    }
    socket.emit('adduser', user)
})

socket.on('debugoutput', function(a) {
    console.debug(a)
})

socket.on('leavePoczekalnia', function(a) {
    socket.emit('createSession')
})

let user = prompt('Type your nickname: ')
while (user === '' || user === null) {
    console.log(user)
    user = prompt('Your nickname can\'t be empty! Type your nickname: ')
}

/** 
* Used to emit debug data
*/
function debug() {
    socket.emit('debug')
}

/** 
* Used to test room creation
*/
function roomTest() {
    'pass'
}

/** 
* Used to init WebGL
*/
function init() {
    const player1 = document.getElementById('player1')
    const player2 = document.getElementById('player2')

    socket.emit('requestMap')
    socket.on('postMap', function(map) {
        Config.map = map.split('\n')

        new Main(player1, true)
        new Main(player2, false)
    })
    // let map = "#######\n#.   .#\n#  $  #\n# $@$ #\n#  $  #\n#.   .#\n#######"
    // let map = '########\n#.  $ .#\n#.$$$$.#\n#. @$ .#\n########'
    // Config.map = map.split('\n')

    // new Main(player1, true)
    // new Main(player2, false)
}

init()
