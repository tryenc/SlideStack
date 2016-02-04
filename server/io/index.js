'use strict';
var socketio = require('socket.io');
var session = require('../app/configure/authentication/session');
var sharedSession = require('express-socket.io-session');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    // Attach socket.io-session middleware
    io.use(sharedSession(session, { autoSave: true }));

    // put the user data on socket.user
    io.use(function (socket, next) {

        //skip if this has already happened
        if (socket.user) return next();

        var userId = socket.handshake.session.passport.user;
        User.findById(userId)
            .then(user => {
                socket.user = user.sanitize();
                socket.user.socket = socket.id;
                next();
            });
    });

    io.on('connection', function (socket) {

    	var room;
        var userId;
        // Now have access to socket, wowzers!
        console.log("socket.id", socket.id);
        console.log("socket.user", socket.user);

        socket.on('login', function (userData) {
            socket.handshake.session.userdata = userData;
            console.log('session stuff: ', socket.handshake.session.userdata);
        });

        socket.on('teacher slide change', function(newIdx){
        	socket.broadcast.emit('slide change', newIdx);
        });

        // TODO with the session we don't need this anymore
        socket.on('request join', function(obj){
        	room = obj.presentation;

        	socket.join(obj.presentation);

        	if (obj.student) {
        		socket.broadcast.to(obj.presentation).emit('student joined', socket.user);
        	}
        });

        socket.on('disconnect', function(){
        	io.sockets.to(room).emit('somebody left', userId);
        });

    });

    return io;

};
