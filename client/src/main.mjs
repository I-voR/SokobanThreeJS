/* eslint-disable no-unused-vars */
import Player from './components/Player.js'
import MapLoader from './MapLoader.mjs'

//const { $CombinedState } = require('redux')
console.log(location.href)

;(function(globals){
    globals.VARS = {
        map: [],
        objects1: [],
        objects2: []
    }
}((1,eval)('this')))

const socket = io(location.href, {
    'force new connection': true,
    'reconnectionAttempts': 'Infinity',
    'timeout': 10001,
    'transports': ['websocket']
})

const mapLoader = new MapLoader(socket)

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
        VARS.map = map
        VARS.objects1 = mapLoader.load(VARS.map)
        VARS.objects2 = mapLoader.load(VARS.map)
        new Player(player1, VARS.objects1)
        new Player(player2, VARS.objects2)
    })
}

init()

