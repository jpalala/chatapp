window.onload = function() {
     var messages = [];
     var socket = io.connect('http://127.0.0.1:3001');
     var field = document.getElementById("field");
     var sendButton = document.getElementById("send");
     var content = document.getElementById("content");

     socket.on('message', function (data) {
        if(data.message) {
              messages.push(data.message);
              var html = '';
              for(var i=0; i<messages.length; i++) {
                 html += messages[i] + '<br />';
              }
            content.innerHTML = html;
         } else {
             console.log("There is a problem:", data);
	     }
      });

       sendButton.onclick= function() {
         var text = field.value;
         socket.emit('send', { message : text});
      };
}

$(window).on('beforeunload', function(){
    socket.close();
});

