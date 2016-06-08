window.onload = function() {
 
    var messages = [];
    var conxs = [];
    var epalmessages = [];
    var socket = io.connect('http://chatapp.jpalala.com:3001');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var status = document.getElementById("status");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }


            
		content.innerHTML = html;
	            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    socket.on('newvisit', function (data) {
        //console.log(data);    
        conxs.push(data);
        var htmlstatus = '';
        for(var i =0; i<conxs.length; i++) {
            htmlstatus += 'There are ' + conxs[i].connections + ' more people who loaded this page';
        }
        
        //clear it first
        
        status.value = '';
        status.value =  htmlstatus;
    });

    socket.on('umepal', function (data) {
        botmessages.push(data);
        var htmlmessage = '';
        for(var i =0; i<botmessages.length; i++) {
            htmlmessage +=  botmessages.message;
//.connections + ' more people who loaded this page';
        }
        
        //clear it first
        
        status.value = '';
        status.value =  htmlmessage;
    });


    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
	   
 	   // socket.emit('send', { message: newmessage , username: 'Chatbot' });




            field.value = "";
        }
    };
    
}

$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });

     $.ajax({
           url: "http://api.jpalala.com?callback=test&quot",
           crossDomain: true,
           jsonp: "callback",
           dataType: "jsonp",
      success: function(response) {
               console.log(response);
            }
         }).done(function(data) {
           //console.log(data);
           $("#content").after('<p>It is now :'+ data.US_Pacific + ' PST and ' + data.PH + ' in the Philippines</p>');
        });
});

$(window).on('beforeunload', function(){
    socket.close();
});
