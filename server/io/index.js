'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {

    	var room;
    	var userId;
        // Now have access to socket, wowzers!
        console.log("socket.id", socket.id);
        socket.on('teacher slide change', function(newIdx){
        	socket.broadcast.emit('slide change', newIdx);
        });

        socket.on('request join', function(obj){
        	room = obj.presentation;
        	socket.join(obj.presentation);
        	if(obj.student) {
	        	userId = obj.student._id;
        		socket.broadcast.to(obj.presentation).emit('student joined', obj.student);
        	}
        });

        socket.on('disconnect', function(){
        	io.sockets.to(room).emit('somebody left', userId);
        	
        })

    });
    
    return io;

};
