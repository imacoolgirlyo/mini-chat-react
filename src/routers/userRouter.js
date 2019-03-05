import express from 'express';
import routes from '../routes';
import {editProfile, changePassword, userDetail} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePasswrod, changePassword);



export default userRouter;

// 유저 디테일 페이지에서, 프로필 변경, 비밀번호 변경 가능