const http = require('http');
const express = require('express');
// express 서버의 인스턴스, app
const app = express();
// const server = http.createServer(app);
const server = app.listen(8080); 
const path = require('path');
const io = require('socket.io')(server);

const port = '8080';


app.use(express.static(path.join(__dirname, '../src')));


const socketHandler = (socket) => {
    // console.log("connected : " + io.engine.clientsCount);

        socket.on('nickname', (nick, status) => {
                socket.broadcast.emit('login notification', nick, status);
        })
        socket.on('chat message', (nick, msg) => 
        {
            socket.broadcast.emit('message from others', nick, msg);
        })
        socket.on('gif', (nick, url) => {
            socket.broadcast.emit('gif from others', nick,url);
        })
} 

io.on('connection', socketHandler);