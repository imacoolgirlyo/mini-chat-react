import express from 'express';
import routes from '../routes';
import {editProfile, changePassword, userDetail} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
// 왜 user detail 이 제일 마지막에 있어야 하는 거지 ? 
userRouter.get(routes.userDetail, userDetail);


export default userRouter;

// 유저 디테일 페이지에서, 프로필 변경, 비밀번호 변경 가능