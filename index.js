import main from './src/main.js'
import express from 'express'
import globalSetter from './src/global.js'
//const express = require("express")
globalSetter()
const app = express()
const PORT = process.env.PORT || 3000

//var main = require('./src/main')
main.init()


app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();


},
  express.static('client'))


