var express = require('express');
var app = express();

//var server = http.createServer(app);
var mongol = {};
// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
//increase count functiobns
 
var mongoose = require('mongoose');
//mongoloidadmin:humong0us..
 
     mongoose.createConnection('mongodb://128.199.103.10:27017/mongoloid', function(err) {
    if (err) throw err;
   });
 
var Schema = mongoose.Schema;
var chatsSchema =  new Schema({
   chat: String,
   username: String,
   date: { type: Date, default: Date.now }
}); 

var Chat = mongoose.model('Chat', chatsSchema); 
	
app.get('/', function(req, res) { 
	 
	var collection = db.get('chats');
	collection.find({},{}, function(e, docs) {
	       // console.log(docs);
		    
	    res.json(docs);
        });

});

 app.listen(3000); 

 /*    var messages = Chat.find({}, function(error, chats){
         if(error) {
            console.error(error);
          } else {
  	     console.log(chats.toArray());
           }         
       });

*/

/* 
mongol.saveToMongo = function(msg, username) {
	
	var chat = new Chat();
	chat.chat  = msg;
	chat.username = 'test';
	chat.date  = new Date();
	chat.save(function(err) {
	    if (err) { console.log(err); }
       });

	disConnection();
}
*/

/*mongol.retrieveMessages = function() {
	var callback = function(err,data) { 
	console.log(data);	 
         }
       
	//createConnection();
       var messages = Chat.find({}, function(error, chats){
         if(error) {
            return error;
          } else {

             return data.toArray(callback); //res.json(data);
          
	} 
            // process.exit();
    });

      //return messages;
   
   
};
*/
/*
module.exports = mongol;*/
