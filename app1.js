diff --git a/app.js b/app.js
index 3596791..04f0e38 100644
--- a/app.js
+++ b/app.js
@@ -1,153 +1,17 @@
+var msgs = mongoloid.retrieveMessages();
+console.log(  msgs );
+process.exit();
 
-
-var chatbot = require('bot');
-var http = require('http');
-var methodOverride = require('method-override');
-var express = require('express');
-var path = require('path');
-var favicon = require('serve-favicon');
-var logger = require('morgan');
-var session = require('express-session');
-var cookieParser = require('cookie-parser');
-var bodyParser = require('body-parser');
-var request = require('request');
-var mysql = require('mysql');
-var passport = require('passport');
-var LocalStrategy = require('passport-local');
-var TwitterStrategy = require('passport-twitter');
-var flash = require('connect-flash');
-var events = require('events');
-
-// New Code
-var mongo = require('mongodb');
-var monk = require('monk');
-var db = monk('localhost:27017/nodetest1');
-//increase count functiobns
- 
-//count visitors
-var count = 0;
-//count connections
-var connections = 0;
-
-
-//start express server
-var app = express();
-
-
-var counter = require('./counter');
-
-app.set('connections', connections);
-app.set('count', count);
-
-
-//chat server port
-var port = 80;
-var routes = require('./routes/index');
-var users = require('./routes/users');
-var onlineusers = require('./routes/onlineusers');
-
-//chat variables
-var typing = false;
-var timeout = undefined;
-
-//handle eventEmitter
-//var eventEmitter = new events.EventEmitter();
-
-function getIPs(server) {
-  var handles = process._getActiveHandles(),
-      ips = [];
-
-  for (var i = 0, handle, len = handles.length; i < len; ++i) {
-    handle = handles[i];
-    if (handle.readable
-        && handle.writable
-        && handle.server === server
-        && handle.remoteAddress) {
-      ips.push(handle.remoteAddress);
-    }
-  }
- console.log(ips);
-  return ips;
-}
-
-
-//timeout function
-function clearTimeout( tO ) {
-  var t0 = 0;
-}
-function timeoutFunction() {
-   typing = false;
-   socket.emit(noLongerTypingMessage);
-}
-
-function onKeyDownNotEnter() {
-  if(typing == false) {
-    typing = true;
-    socket.emit(typingMessage);
-    timeout = setTimeout(timeoutFunction, 5000);
-  } else {
-    clearTimeout(timeout);
-    timeout = setTimeout(timeoutFunction, 5000);
-  }
-
-}
-
-//setup request to ticker
-
-// view engine setup
-app.set('views', path.join(__dirname, 'views'));
-app.set('view engine', 'jade');
-
-
-// required for passport
-app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
-app.use(passport.initialize());
-app.use(passport.session()); // persistent login sessions
-app.use(flash()); // use connect-flash for flash messages stored in session
-
-
-// uncomment after placing your favicon in /public
-//app.use(favicon(__dirname + '/public/favicon.ico'));
-app.use(logger('dev'));
-//app.use(bodyParser.json());
-app.use(bodyParser.urlencoded({ extended: false }));
-app.use(methodOverride('X-HTTP-Method-Override'));
-app.use(cookieParser());
-
-
-// view engine setup
-app.set('views', path.join(__dirname, 'views'));
-app.set('view engine', 'jade');
-
-
-app.use(express.static(__dirname + '/public'));
-//path.join(__dirname, 'public')));
-
-// uncomment after placing your favicon in /public
-//app.use(favicon(__dirname + '/public/favicon.ico'));
-app.use(logger('dev'));
-app.use(bodyParser.json());
-app.use(bodyParser.urlencoded());
-app.use(cookieParser());
-app.use(flash());
-app.use(express.static((__dirname, 'public')));
-//path .join (__dirname
-
-// Make our db accessible to our router
-app.use(function(req,res,next){
-    req.db = db;
-    //req.session.clientID = 
-    next();
-});
-
-app.use(function(req, res,next) {
+app.use(function(req, res,next) { 
     app.set('ipaddress', req.ip);
-    next();
+    next();  
 });
 
+
 app.use('/', routes);
 app.use('/users', users);
 
+
 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
     var err = new Error('Not Found');
@@ -155,7 +19,6 @@ app.use(function(req, res, next) {
     next(err);
 });
 
-
 // development error handler
 // will print stacktrace
 if (app.get('env') === 'development') {
@@ -172,8 +35,6 @@ if (app.get('env') === 'development') {
 // no stacktraces leaked to user
 app.use(function(err, req, res, next) {
 
-   //var IP = request.connection.remoteAddress;
-   ///console.log(IP);
     res.status(err.status || 500);
     res.render('error', {
         message: err.message,
@@ -196,13 +57,15 @@ var server = app.listen(app.get('port'), function() {
 
 
 var configDB = require('./config/database.js');
+
+
 //console.log(configDB);
 var connection = mysql.createConnection({
-    host     :  'localhost',
+    host     :  '127.0.0.1',
     user     :  'user1',
     password :  'ZhbBf2QTQStNe',
-    port     : '3306',
-    _socket  : '/var/run/mysqld/mysqld.sock'
+    port     : '/var/run/mysqld/mysqld.sock',
+    sockePath  : '/var/run/mysqld/mysqld.sock'
 });
 
 
@@ -212,7 +75,7 @@ connection.connect(function(err) {
 		console.error('error connecting' + err.stack);
                 return;
         }
-  console.log('connected as id' + connection.threadId);
+  console.log('My SQL connected as id' + connection.threadId);
   //next();
 });
 
@@ -223,22 +86,24 @@ connection.connect(function(err) {
 var mysql = require('mysql');
 // run the emit of EventSocket for the visit
 //eventEmitter.emit('visit');
-     
+ 
+
+
+
+
 var io = require('socket.io').listen(server.listen(port));
 
 io.sockets.on('connection', function (socket) {
-     //   getIPs();
   
     request('https://www.bitstamp.net/api/ticker/', function (error, response, body) { 
       var chunk = JSON.parse(body);
-       
       var bitcoinLastPrice = chunk.last;
       
-      var welcomeMessage =  '<br> Welcome to BIT Chat. <br>1 Bitcoin = ' + chunk.last + ' USD';
-      var ipDetectedMessage =  '<br>Connection From: ' + app.get('ipaddress') + '<br>'; 
-      socket.emit('message', { message: welcomeMessage }, function() {
-        });
-    });
+      var welcomeMessage =  '<br> Welcome to BIT Chat. <br>1 Bitcoin = ' + chunk.last + ' USD' ;
+      //emit welcome
+     //var ipDetectedMessage =  '<br>Connection From: ' + app.get('ipaddress') + '<br>'; 
+             socket.emit('message', { message: welcomeMessage }); // function() { });
+	});
 
     
     socket.emit('newvisit', { connections: connections}); 
@@ -246,14 +111,14 @@ io.sockets.on('connection', function (socket) {
         //message: say });
        
     console.log("Connection " + socket.id + " accepting chat messages.");
-    console.log(count);
+    console.log('Count:' + count);
     
-    socket.on('send', function (data) {
-        
+    socket.on('send', function (data) {      
         io.sockets.emit('message', data);
    	console.log(data);
-	// socket.on('umepal',  function(data) {
-         var dictionary = ['Chatbot says hello', 
+       // socket.on('umepal',  function(data) {
+       
+       var dictionary = ['Chatbot says hello', 
                            'Chatbot says hi', 'Chatbot says you are welcome here', 
                            'Chatbot says you are so fine', 'Chatbot says Oh that\'s awesome', 
 			   'Chatbot says hello World to you too', 
@@ -265,13 +130,16 @@ io.sockets.on('connection', function (socket) {
          var say = dictionary[Math.round(Math.random() * (dictionary.length - 1))];
          var botdata = { message: say, username: 'Chatty Joe'}; 
 	io.sockets.emit('message' , botdata);
-         console.log(botdata);
+        console.log(botdata);
+
+        //add to mongodb database
+
     	//});
 
 
    });
 });
 
-//io.set('transports',['xhr-polling']);
+ //mongoose.connection.disconnect(); 
 
 module.exports = app;
