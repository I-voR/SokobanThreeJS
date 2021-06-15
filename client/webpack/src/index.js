/* eslint-disable no-unused-vars */
import Config from './components/Config'
import Main from './components/Main'
import { io } from 'socket.io-client'

console.log(location.href)

const socket = io(location.href, {
    'force new connection': true,
    'reconnectionAttempts': 'Infinity',
    'timeout': 10001,
    'transports': ['websocket']
})

socket.on('connect', function() {
    let user = prompt('Type your nickname: ')
    while (user === '' || user === null) {
        user = prompt('Your nickname can\'t be empty! Type your nickname: ')
    }
    Config.userName = user
    socket.emit('adduser', user)
})

socket.on('debugoutput', function(a) {
    // eslint-disable-next-line no-console
    console.debug(a)
})

socket.on('leavePoczekalnia', function(a) {
    socket.emit('createSession')
})

let user
while (user === '' || user === null) {
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

socket.on('sessionready', function() {
    socket.emit('requestMap')
})

socket.on('positionUpdate', function(dir) {
    Config.enemyMove = dir
})

/** 
* Used to init WebGL
*/
function init() {
    Config.socket = socket
    const player1 = document.getElementById('player1')
    const player2 = document.getElementById('player2')

    socket.on('postMap', function(map) {
        Config.map = map.map.split('\n')
        Config.mapNo = map.id
        new Main(player1, true)
        new Main(player2, false)
    })
}

init()
