import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.headers;
  if (!accessToken) {
    // return 토큰이 비어잇습니다.;
  }

  try {
    // 액세스 토큰 해독 verify
    // 에러처리
    // userId = decodedToken.id
    // const user = User.findOne(userId)
    // if(!user) 유저없음~
    // req.user = user;
    // next();
  } catch (error) {}
};

const authUtil = {
  isAuth,
};

export default authUtil;

// route.use(authUtil.isAuth);
/// 이 아래로 저 미들웨어 다 적용
