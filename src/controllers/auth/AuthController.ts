import { NextFunction, Request, Response } from 'express';
import statusCode from '../../modules/statusCode';
import AuthService from '../../services/auth/AuthService';

const socialLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { social } = req.params;

  try {
    let data;
    switch (social) {
      case 'kakao':
      // data = AuthService.kakaoLogin(소셜토큰 넘겨주기, fcmToken);
      // break;
      case 'apple':
      // data = AuthService.appleLogin(소셜토큰 넘겨주기, fcmToken);
      // break;
    }
    // return 해주기
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send;
  }
};

const AuthContoller = {
  socialLogin,
};

export default AuthContoller;
