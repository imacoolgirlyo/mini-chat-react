const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const path = require('path');
const io = require('socket.io')(server);

const port = '8080';

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('socket io is connected');
    socket.on('disconnect', ()=> {
        console.log('user disconnected');
    })

    socket.on('chat message', (msg) => {
        console.log('message : ' + msg);
    })
})