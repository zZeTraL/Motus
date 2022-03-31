const express = require("express");
const router = express.Router();

const wordData = require("../data/wordData")

function getWordOfTheDay(){
    return wordData;
}


io.on("connect", (socket) => {
    socket.on("userConnected", () => {
        console.log("User with id: " + socket.id + " is connected!")
        console.log(getWordOfTheDay().wordData[0])
        socket.emit("getWordOfTheDay", getWordOfTheDay().wordData[0]);
    })
})

module.exports = router;