import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {userRouter} from './router';

const app = express();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(helmet());
app.use(morgan("dev"));


const handleHome = (req,res) => {
    res.send('Hello this is home');
}

app.get('/', handleHome);

app.use('/user', userRouter);


export default app;

// const socketHandler = (socket) => {
//     // console.log("connected : " + io.engine.clientsCount);

//         socket.on('nickname', (nick, status) => {
//                 socket.broadcast.emit('login notification', nick, status);
//         })
//         socket.on('chat message', (nick, msg) => 
//         {
//             socket.broadcast.emit('message from others', nick, msg);
//         })
//         socket.on('gif', (nick, url) => {
//             socket.broadcast.emit('gif from others', nick,url);
//         })
// } 

// io.on('connection', socketHandler);