import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import config from "../config";
import User from '../models/User';

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('accessToken');
  if (!accessToken) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_TOKEN));
  }

  try {
    // verify token
    const decoded = jwt.verify(accessToken, config.jwtSecret);
    const user = await User.findById((decoded as any).user.id);

    // no user
    if (!user) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_USER));
    }

    req.user = user;
    return next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

// const authUtil = {
//   isAuth,
// };

// export default authUtil;

// route.use(authUtil.isAuth);
/// 이 아래로 저 미들웨어 다 적용
