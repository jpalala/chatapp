var HomeModel = Backbone.Model.extend({
  defaults: {
    //Backbone collection for users
    onlineUsers: new UserCollection(),
    //Backbone collection for user chats, predefined message
    userChats: new ChatCollection([
      new ChatModel({sender: '', message: 'Chat Server v.1'}) 
   ])
  },
  
  //method for adding a new user
  addUser: function(username) {
     this.get('onlineUsers').add(new UserModel({name:username}));
  },

  removeUser: function(username) {
    var onlineUsers = this.get('onlineUsers');
    var u = onlineUsers.find(function(item) {
       return item.get('name') == username;
    });
    if (u) {
       onlineUsers.remove(u);
    }
  },

  addChat: function(chat) {
    this.get('userChats').add(new ChatModel({sender: chat.sender, message: chat.message}));
  },
});


