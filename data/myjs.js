//var host = "http://localhost:8001";
var host = "http://maccontroller.herokuapp.com";
var socket = io.connect(host);
//var uid = Math.random().toString(36).slice(2);
//self.port.emit("uid", uid);
//socket.emit("uid", uid);
var uid = "5566";
socket.on(uid, function (data) {
    console.log(data);
    if (data.newTab) {
        self.port.emit("newTab", data.newTab);
    } else {
        var directive = parseInt(data);
        if (isNaN(directive))
            return;
        if (directive > 4) {
//            self.port.emit("directive", directive);
            self.postMessage(directive);
        } else
            $("a#"+directive).click();
    }
//    socket.emit('result', true);
});

$(function(){
    $("a.helperlink").click(function(e) {
        e.preventDefault();
        console.log(this.textContent);
        $(location).attr('href', $(this).attr("href"));
    });
});