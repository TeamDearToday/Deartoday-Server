import { NextFunction, Request, Response } from 'express';
import statusCode from '../../modules/statusCode';
import AuthService from '../../services/auth/AuthService';
import util from '../../modules/util';
import message from '../../modules/responseMessage';
import { UserLoginDto } from '../../interfaces/user/UserLoginDto';


/**
 *  @route Post /auth/login/:social
 *  @desc social login
 *  @access Public
 */
const socialLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { social } = req.params;
  const userLoginDto: UserLoginDto = req.body;

  try {
    let data;
    switch (social) {
      case 'KAKAO':
        data = AuthService.kakaoLogin(userLoginDto);
        break;
      case 'APPLE':
        // data = AuthService.appleLogin(소셜토큰 넘겨주기, fcmToken);
        break;
      default:
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UNDEFINED_SOCIAL_TYPE));
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