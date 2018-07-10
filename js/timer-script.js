var counter = 0;
setInterval(function(){
    document.body.append("<p>"+String.fromCharCode(counter)+"</p>");
    counter++;
}, 2000);