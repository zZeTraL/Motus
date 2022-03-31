// Core /!\ important
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// utilitaires
const path = require("path");
const socket = require("socket.io");
const io = socket(server);

global.io = io;

app.use(express.static(__dirname));

// On set notre moteur de render ici EJS
// https://ejs.co/
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render(path.join("..", "views", "index"))
})

const word = require("./server/router/word")
app.use("/", word);

server.listen(4000);