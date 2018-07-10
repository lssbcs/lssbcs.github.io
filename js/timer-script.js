var counter = 0;
setInterval(function(){
    var character = String.fromCharCode(counter);
    document.body.append(character);
    counter++;
}, 20);