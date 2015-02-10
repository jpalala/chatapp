
$(document).ready(function() { 


/*
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
    xmlhttp.send();

    hostipInfo = xmlhttp.responseText.split("\n");

    for (i=0; hostipInfo.length >= i; i++) {
        ipAddress = hostipInfo[i].split(":");
        if ( ipAddress[0] == "IP" ) ipaddress.value = ipAddress[1];
    }
*/

    var messages = [];
    var conxs = [];
    var socket = io.connect('http://bitchat.jpalala.com');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
   

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

    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    };

    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
             var text = strip(field.value);
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
           sendMessage();
    	sendButton.click();
        }
    });
});

$(window).on('beforeunload', function(){
    socket.close();
});
