var mongol = {};
var mongoose = require('mongoose');

//mongoloidadmin:humong0us..
 
mongoose.createConnection('mongodb://128.199.133.246:27017/mongoloid', function(err) {
    if (err) throw err;
});
 
var Schema = mongoose.Schema;
var chatsSchema =  new Schema({
   chat: String,
   username: String,
   date: { type: Date, default: Date.now }
}); 

var Chat = mongoose.model('Chat', chatsSchema); 

//mongoloidadmin:humong0us..
// Connect to Mongoose
mongol.createConnection =  function() {
 
 //    mongoose.createConnection('mongodb://128.199.103.10:27017/mongoloid', function(err) {
   // if (err) throw err;
   //}//);


   return mongoose;
};

mongol.disConnection = function() {
     mongoose.connection.close(); 
}



mongol.saveToMongo = function(msg, username) {
//        app.connect();
	//var stuff = mongoose.model.get('chats');
	
	var chat = new Chat();
	chat.chat  = msg;
	chat.username = 'test';
	chat.date  = new Date();
	chat.save(function(err) {
	    if (err) { console.log(err); }
       });

	disConnection();
}

mongol.retrieveMessages = function() {
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

module.exports = mongol;
