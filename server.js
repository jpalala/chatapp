'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');


var app = express();
var server = http.createServer(app);

/* Configuration */
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('port', 3000);

if (process.env.NODE_ENV === 'development') {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

// set the view engine to ejs
app.set('view engine', 'ejs');

/* Socket.io Communication */
var io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

/* Start server */
server.listen(app.get('port'), function (){
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat', function (msg) {
        socket.broadcast.emit('chat', msg);
    });
});

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect and insert content => msg
MongoClient.connect("mongodb://localhost:27017/chatDb", function(err, db) {
    var collection = db.collection('chat messages');
    collection.insert({ content: msg }, function(err, o) {    
      if (err) { 
        console.warn(err.message); 
      }
      else {
        console.log("chat message inserted into db: " + msg); 
      }		
    });
});

/* read top 10 last chat messages and event push the data */
MongoClient.connect("mongodb://localhost:27017/chatDb", function (err, db) {
    var collection = db.collection('chat messages')
    var stream = collection.find().sort({ _id : -1 }).limit(10).stream();
    stream.on('data', function (chat) { socket.emit('chat', chat.content); });
});


module.exports = app;
