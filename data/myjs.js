//var host = "http://localhost:8001";
var host = "http://maccontroller.herokuapp.com";
var socket = io.connect(host);
var uid = Math.random().toString(36).slice(2);

self.postMessage({"uid": uid});

socket.on(uid, function (data) {
    console.log(data);
    if (data.newTab) {
        self.postMessage({"newTab": data.newTab});
    } else {
        var directive = parseInt(data);
        if (isNaN(directive))
            return;
        if (directive > 4) {
            self.postMessage(self.postMessage({"toDo": directive}));
        } else
            $("a#"+directive).click();
    }
});

$(function(){
    $("a.helperlink").click(function(e) {
        e.preventDefault();
        console.log(this.textContent);
        $(location).attr('href', $(this).attr("href"));
    });
});