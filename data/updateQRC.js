self.port.on("updateQRC", function(data){
    console.log("updateQRC");
    console.log(data.src);
    img = document.getElementById("qrcode");
    img.src = data.src;
    uid_holder = document.getElementById("uid_holder");
    uid_holder.textContent = "uid: " + data.uid;
});