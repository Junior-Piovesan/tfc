import { NextFunction, Request, Response, Router } from 'express';

import UserMiddleware from '../middlewares/users/userMiddleware';
import UserController from '../controllers/users/users.controllers';

const userController = new UserController();
const usermiddleware = new UserMiddleware();

const router = Router();

router.post(
  '/',
  (req:Request, res:Response, next:NextFunction) => {
    UserMiddleware.checkInfologinMiddlaware(req, res, next);
  },

  (req:Request, res:Response, next:NextFunction) => {
    usermiddleware.checkEmailIsValid(req, res, next);
  },

  (req:Request, res:Response, next:NextFunction) => {
    usermiddleware.checkPassworIsValid(req, res, next);
  },

  (req:Request, res:Response) => {
    userController.userLogin(req, res);
  },
);

router.get(
  '/role',
  // (req:Request, res:Response, next:NextFunction) => {
  //   res.status(200).json({ message: 'oi' });
  // },
  (req:Request, res:Response, next:NextFunction) => {
    UserMiddleware.checkTokenExist(req, res, next);
  },

);

export default router;
