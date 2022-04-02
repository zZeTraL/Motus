window.onload = function() {
    socket.emit("userConnected");
    let allowedKeys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "BACKSPACE", "ENTER"]
    window.addEventListener("keydown", (event) => {
        if(allowedKeys.includes(event.key.toUpperCase())){
            gameManager.onTyping(event);
        }
    })
}
