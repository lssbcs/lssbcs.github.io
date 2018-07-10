var counter = 0;
setInterval(function(){
    document.body.appendChild("<p>"+String.fromCharCode(counter)+"</p>");
    counter++;
}, 50);