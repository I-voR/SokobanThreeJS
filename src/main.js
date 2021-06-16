import express from 'express'
import crypto from 'crypto'
import { createServer } from "http"
import { Server } from "socket.io"
import Mongo from './mongo/mongo.js'

export const main = {
    init: () => {
        const PORT = process.env.PORT || 8080
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb'
        //const express = require("express")
        const app = express()
        //const httpServer = require("http").createServer(app);
        const httpServer = createServer(app)
        const options = {
            cors: {
                origin: "*",
            }
        }

        app.use(express.static('client'))
        //const io = require("socket.io")(httpServer, options);
        const io = new Server(httpServer, options)
        //const httpServer = app.listen(process.env.PORT || 8080)

        //const httpServer = require("http").createServer(app)
        httpServer.listen(PORT, function () {
            console.log('Server started on port:', PORT)
        })

        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', "*")
            res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE')
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
            res.header('Access-Control-Allow-Credentials', true)
            next()
        })

        app.all('/', function (request, response, next) {
            response.header('Access-Control-Allow-Origin', "*")
            response.header('Access-Control-Allow-Headers', 'X-Requested-With')
        })

        let mongoC = new Mongo(MONGODB_URI)
        mongoC.start()
        mongoC.getRecords()
        mongoC.createCollection()
        //mongoC.insertRecord({ nick: "IwoIwonIwonowicz", map: "1", moves: "lllDDrrUur" })

        app.get("/records", function (req, res) {
            res.send(global.GLOBALdata)
        })

        io.on("connection", socket => { /* ... */ })
        io.sockets.on('connection', function (socket) {
            socket.emit('debugoutput', "test emitu")
            socket.on('adduser', function (username) {
                if (GLOBALlobby.length === 2) {
                    GLOBALlobby = []
                }
                GLOBALlobby.push(username)
                console.log(GLOBALlobby)

                socket.data.username = username
                console.log(socket.data.username)
                socket.join('poczekalnia')
                socket.data.room = 'poczekalnia'


                if (GLOBALlobby.length === 2) {
                    io.to('poczekalnia').emit('leavePoczekalnia')
                }

                socket.on('createSession', function () {
                    let users = GLOBALlobby
                    let roomname = users[0] + '-' + users[1]
                    socket.leave('poczekalnia')
                    socket.join(roomname)
                    socket.data.room = roomname
                    socket.emit('debugoutput', roomname)
                    socket.emit('sessionready')

                    socket.on('requestMap', function () {
                        //global jsona z mapami
                        var md5sum = crypto.createHash('md5')
                        var mapNumber = socket.data.room
                        md5sum.update(mapNumber)
                        mapNumber = md5sum.digest('hex')

                        let mapJSON = GLOBALmaps
                        let index = parseInt(mapNumber.replace(/\D/g, '')) % mapJSON.length
                        console.log(index)
                        socket.to(roomname).emit('postMap', mapJSON[index])
                    })

                    socket.on('move', function (direction) {
                        socket.to(roomname).emit('positionUpdate', direction)
                        console.log('move' + roomname + ' ' + direction)
                    })

                    socket.on('sendRecord', function (record) {
                        //record = { nick: "IwoIwonIwonowicz", map: "1", moves: "lllDDrrUur" }
                        mongoC.insertRecord(record)
                        mongoC.getRecords()
                    })

                    socket.on('end', function () {
                        socket.emit('gameOver')
                    })
                })
            })

            socket.on('disconnect', function () {
                console.log('disconnected' + socket.data.username)
                if (socket.data.username != undefined) {
                    console.log(socket.data.username)
                    GLOBALlobby = GLOBALlobby.filter(username => username != socket.data.username)
                    console.log(GLOBALlobby)
                }
            })
        })
    }
}

export default main
