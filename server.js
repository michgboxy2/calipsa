"use strict";
const express = require('express');
const app     = express();

var http = require('http').createServer(app);
var io   = require('socket.io')(http);
const dbs = require('./db');


app.use(express.static(__dirname + "/vueclient/dist"));

io.on('connection', (socket) => {
  console.log('a user connected');
    // gameplay.init(io, socket, dbs);
    require('./gameplay')(io, socket, dbs);
    socket.on('disconnect', (data) => {console.log('player has left game');});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

