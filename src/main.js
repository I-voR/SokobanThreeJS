import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";
import connect from './socket/connect.js';



export const main = {
    init: () => {
        const PORT = process.env.PORT || 8080
        //const express = require("express")
        const app = express()
        //const httpServer = require("http").createServer(app);
        const httpServer = createServer(app);
        const options = {
            cors: {
                origin: "*",
            }
        };
        //const io = require("socket.io")(httpServer, options);
        const io = new Server(httpServer, options);
        //const httpServer = app.listen(process.env.PORT || 8080)

        //const httpServer = require("http").createServer(app)
        httpServer.listen(PORT, function () {
            console.log('Server started on port:', PORT)
        })

        app.use(function (req, res, next) {

            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
            res.header('Access-Control-Allow-Credentials', true);
            next();


        },
            express.static('client'))

        app.all('/', function (request, response, next) {
            response.header('Access-Control-Allow-Origin', "*");
            response.header('Access-Control-Allow-Headers', 'X-Requested-With');
        })





        connect.socketFunc(io)


    }
};
export default main



