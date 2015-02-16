

var chatbot = require('bot');
var http = require('http');
var methodOverride = require('method-override');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter');
var flash = require('connect-flash');
var events = require('events');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongoloidadmin:humong0us@mongoloid.jpalala.com:12701/mongoloid');

var stuff = db.get('chats');
console.log(stuff.find());
//start express server
var app = express();


var counter = require('./counter');

app.set('connections', connections);
app.set('count', count);


//chat server port
var port = 80;
var routes = require('./routes/index');
//chat variables
var typing = false;
var timeout = undefined;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(__dirname + '/public')); 
//path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(flash());
app.use(express.static((__dirname, 'public')));
//path .join (__dirname

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    //req.session.clientID = 
    next();
});

app.use(function(req, res,next) {
    app.set('ipaddress', req.ip);
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

   //var IP = request.connection.remoteAddress;
   ///console.log(IP);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
 });

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
 //server.address().port);

});

//eventEmitter.on('visit', counter.increaseCount(count));
//eventEmitter.on('visit', counter.reportCount(count));

//eventEmitter.on('msgreaceived', epaloids);


var configDB = require('./config/database.js');
//console.log(configDB);
var connection = mysql.createConnection({
    host     :  'localhost',
    user     :  'user1',
    password :  'ZhbBf2QTQStNe',
    port     : '3306',
    _socket  : '/var/run/mysqld/mysqld.sock'
});


//database :  configDB.mysql_database
connection.connect(function(err) {
	if (err) { 
		console.error('error connecting' + err.stack);
                return;
        }
  console.log('connected as id' + connection.threadId);
  //next();
});




//run socket only in /chat
var mysql = require('mysql');
// run the emit of EventSocket for the visit
//eventEmitter.emit('visit');
     
var io = require('socket.io').listen(server.listen(port));

io.sockets.on('connection', function (socket) {
     //   getIPs();
  
    request('https://www.bitstamp.net/api/ticker/', function (error, response, body) { 
      var chunk = JSON.parse(body);
       
      var bitcoinLastPrice = chunk.last;
      
      var welcomeMessage =  '<br> Welcome to BIT Chat. <br>1 Bitcoin = ' + chunk.last + ' USD';
      var ipDetectedMessage =  '<br>Connection From: ' + app.get('ipaddress') + '<br>'; 
      socket.emit('message', { message: welcomeMessage }, function() {
        });
    });

    
    socket.emit('newvisit', { connections: connections}); 

        //message: say });
       
    console.log("Connection " + socket.id + " accepting chat messages.");
    console.log(count);
    
    socket.on('send', function (data) {
        
        io.sockets.emit('message', data);
   	console.log(data);
	// socket.on('umepal',  function(data) {
         var dictionary = ['Chatbot says hello', 
                           'Chatbot says hi', 'Chatbot says you are welcome here', 
                           'Chatbot says you are so fine', 'Chatbot says Oh that\'s awesome', 
			   'Chatbot says hello World to you too', 
                           'Chatbot says Are you talking to me?', 
                      'Chatbot says sorry, keep chatting', 
                  'Chatbot plays epal','Chatbot says Chat with me, you shall', 
                  'Chatbot says that\'s what she said', 
                  'Chatbot says that was a joke, right?'];
         var say = dictionary[Math.round(Math.random() * (dictionary.length - 1))];
         var botdata = { message: say, username: 'Chatty Joe'}; 
	io.sockets.emit('message' , botdata);
         console.log(botdata);
    	//});


   });
});

//io.set('transports',['xhr-polling']);

module.exports = app;
