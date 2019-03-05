import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { localsMiddleware } from './middlewares';
import routes from './routes';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';

import path from "path";

const app = express();


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.use(morgan("dev"));
app.use(localsMiddleware);


app.use(routes.users, userRouter);
app.use(routes.home, globalRouter);



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