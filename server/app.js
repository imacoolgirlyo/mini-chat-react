const http = require('http');
const express = require('express');
// express 서버의 인스턴스, app
const app = express();
// const server = http.createServer(app);
const server = app.listen(8080); 
const path = require('path');
const io = require('socket.io')(server);

const port = '8080';

app.use(express.static(path.join(__dirname, 'public')));



const socketHandler = (socket) => {

    console.log(`${socket.id} is connected`);
    console.log("connected : " + io.engine.clientsCount);

        socket.on('nickname', (nick, status) => {
            console.log(status);
            socket.broadcast.emit('login notification', nick, status);
        })
        // socket.on('disconnect', );
        socket.on('chat message', (ob) => {

            
            const nickname = ob.nick;
            const message = ob.msg;
    
            socket.broadcast.emit('message from others', {nickname, message});
        })
} 

io.on('connection', socketHandler);

// 새로운 사람 들어오고, 나가고 표시, 알림