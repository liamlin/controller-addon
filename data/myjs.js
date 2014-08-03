//var host = "http://localhost:8001";
var host = "http://maccontroller.herokuapp.com";
var socket = io.connect(host);
// For a prototype this is good enough
// But there's some stuff out there about making uuids in javascript more robust:
// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
var uid = Math.random().toString(36).slice(2);

self.postMessage({"uid": uid});

// Need some comments in the function below
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
        } else  // Keep the curly braces or no curly braces consistent for if/else with one line
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
