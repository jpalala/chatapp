var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('mysql');
var passport = require('passport');
var flash = require('connect-flash');
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

//count visitors
var count = 0;
//count connections
var connections = 0;
var increaseCount = function() {
  console.log('new visitor!');
  connections++;
  count++;
} 

//report counts
var reportCount = function() {
  console.log('TOTAL COUNT:', count);
}

function getIPs(server) {
  var handles = process._getActiveHandles(),
      ips = [];

  for (var i = 0, handle, len = handles.length; i < len; ++i) {
    handle = handles[i];
    if (handle.readable
        && handle.writable
        && handle.server === server
        && handle.remoteAddress) {
      ips.push(handle.remoteAddress);
    }
  }
 console.log(ips);
  return ips;
}



//handle eventEmitter
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('visit', increaseCount);
eventEmitter.on('visit', reportCount);

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

//chat server port
var port = 3700;
var routes = require('./routes/index');
var users = require('./routes/users');
var onlineusers = require('./routes/onlineusers');

//chat variables
var typing = false;
var timeout = undefined;



var app = express();
//timeout function
function clearTimeout( tO ) {
  var t0 = 0;
}
function timeoutFunction() {
   typing = false;
   socket.emit(noLongerTypingMessage);
}

function onKeyDownNotEnter() {
  if(typing == false) {
    typing = true;
    socket.emit(typingMessage);
    timeout = setTimeout(timeoutFunction, 5000);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 5000);
  }

}

//setup request to ticker

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


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

var io = require('socket.io').listen(server.listen(port));

io.sockets.on('connection', function (socket) {
     getIPs();
   request('https://www.bitstamp.net/api/ticker/', function (error, response, body) { 
      var chunk = JSON.parse(body);
       
      var bitcoinLastPrice = chunk.last;
      
      var welcomeMessage =  '<br> Welcome to BIT Chat. <br>1 Bitcoin = ' + chunk.last + ' USD';
      var ipDetectedMessage =  '<br>Connection From: ' + app.get('ipaddress') + '<br>';
	

       socket.emit('message', { message: welcomeMessage }, function() {
       
            socket.emit('message', { message: ipDetectedMessage });
      });
    });

    
    socket.emit('newvisit', { connections: connections}); 
    
    // run the emit of EventSocket for the visit
    eventEmitter.emit('visit');
        
    console.log("Connection " + socket.id + " accepting chat messages.");
    console.log(count);
    
    socket.on('send', function (data) {
        
        io.sockets.emit('message', data);
    });
});


module.exports = app;
