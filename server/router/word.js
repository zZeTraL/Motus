const express = require("express");
const router = express.Router();

const wordData = require("../data/wordData")
//let wordOfTheDay = getWordOfTheDay();

function getWordOfTheDay(){
    let random = Math.floor(Math.random() * wordData.wordArray.length);
    return wordData.wordArray[random];
}


io.on("connect", (socket) => {
    socket.on("userConnected", () => {
        console.log("User with id: " + socket.id + " is connected!")
        socket.emit("getWordOfTheDay", getWordOfTheDay());
    })
})

module.exports = router;