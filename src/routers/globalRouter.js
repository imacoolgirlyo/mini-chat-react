import express from 'express';
import routes from '../routes';
import {home , submitMessage} from '../controllers/chatController';
import {
    getJoin,
    postJoin,
    login,
    logout
} from '../controllers/userController';


const globalRouter = express.Router();


globalRouter.get(routes.home, home);
globalRouter.post(routes.messages, submitMessage);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;

// 첫 화면, 채팅 화면, 회원 가입, 로그인 , 로그 아웃으로 이동