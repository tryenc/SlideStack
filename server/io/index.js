'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        // Now have access to socket, wowzers!
        console.log("socket.id", socket.id);
        socket.on('teacher slide change', function(newIdx){
        	console.log("newIdx", newIdx);
        	socket.broadcast.emit('slide change', newIdx);
        });
    });
    
    return io;

};
