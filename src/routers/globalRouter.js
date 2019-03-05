import express from 'express';
import routes from '../routes';
import {home} from '../controllers/chatController';
import {
    join,
    login,
    logout
} from '../controllers/userController';

const globalRouter = express.Router();

console.log(home);
globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;

// 첫 화면, 채팅 화면, 회원 가입, 로그인 , 로그 아웃으로 이동