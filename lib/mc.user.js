var socket = io.connect("http://localhost:8001");
socket.on('action', function (data) {
    console.log(data);
    window.location = "maccontroller://MacController?action=" + data;
    socket.emit('result', true);
});
