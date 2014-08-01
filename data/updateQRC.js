addon.port.on("updateQRC", function(data){
    img = document.getElementById("qrcode");
    img.src = data.src;
    uid_holder = document.getElementById("uid_holder");
    uid_holder.textContent = data.uid;
});