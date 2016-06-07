 

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
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter');
var flash = require('connect-flash');
var events = require('events');
//run socket only in /chat
var mysql = require('mysql');

// New Code
var mongo = require('mongodb');

var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
//increase count functiobns
 
//count visitors
var count = 0;
//count connections
var connections = 0;


//start express server
var app = express();


var counter = require('./counter');

app.set('connections', connections);
app.set('count', count);


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(__dirname + '/public'));


//chat server port
var port = 3700;
var routes = require('./routes/index');
var users = require('./routes/users');
var onlineusers = require('./routes/onlineusers');

//fetch from mongoose mongoloid.js
var mongoloid = require('./mongoloid');

var msgs = mongoloid.retrieveMessages();

// for chat typing/timeout setTimeout if user is typing through socket?
var typing = false;
var timeout = undefined;

console.log(  msgs );

//process.exit();

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

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
 });

app.set('port', process.env.PORT || 3001);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
 //server.address().port);

});

//eventEmitter.on('visit', counter.increaseCount(count));
//eventEmitter.on('visit', counter.reportCount(count));

//eventEmitter.on('msgreaceived', epaloids);


var configDB = require('./config/database.js');


//console.log(configDB);
/*
var connection = mysql.createConnection({
    host     :  '127.0.0.1',
    user     :  'user1',
    password :  'ZhbBf2QTQStNe',
    port     : '/var/run/mysqld/mysqld.sock',
    sockePath  : '/var/run/mysqld/mysqld.sock'
});
*/
/*
//database :  configDB.mysql_database
connection.connect(function(err) {
	if (err) { 
		console.error('error connecting' + err.stack);
                return;
        }
  console.log('My SQL connected as id' + connection.threadId);
  //next();
});
*/
// run the emit of EventSocket for the visit
//eventEmitter.emit('visit');
var port = 3001;
var io = require('socket.io').listen(server.listen(port));

io.sockets.on('connection', function (socket) {
  
    request('https://www.bitstamp.net/api/ticker/', function (error, response, body) { 
      var chunk = JSON.parse(body);
      var bitcoinLastPrice = chunk.last;
      console.log(chunk.last);
      //emit welcome
     //var ipDetectedMessage =  '<br>Connection From: ' + app.get('ipaddress') + '<br>'; 
             socket.emit('message', { message: '<br> Welcome to BIT Chat. <br>1 Bitcoin = ' + chunk.last + ' USD'  }); // function() { });
	});

    
    socket.emit('newvisit', { connections: connections}); 

        //message: say });
       
    console.log("Connection " + socket.id + " accepting chat messages.");
    console.log('Count:' + count);
    
    socket.on('send', function (data) {      
        io.sockets.emit('message', data);
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
     
       if(data.message == 'ciao') {
            var say = "Buon Giorno!";
       } else { 
	   var say = dictionary[Math.round(Math.random() * (dictionary.length - 1))];
           request('http://api.jpalala.com/email.php?to=robot%40mongoloid.jpalala.com&api=a258d468b4fe38e55afde3fe4e7d0a7ee11ed688&the_subject=New+Chat+Sent&the_msg=' + data.message , function (error, response, body) { 
           console.log('Message sent');
	   }); 
       }
     
         var botdata = { message: say, username: 'Chatty Joe'}; 
	io.sockets.emit('message' , botdata);
        console.log(botdata);
        //add to mongodb database
    	//});
   });
});
//mongoose.connection.disconnect(); 

module.exports = app;
