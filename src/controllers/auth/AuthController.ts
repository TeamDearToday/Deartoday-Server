import { NextFunction, Request, Response } from 'express';
import statusCode from '../../modules/statusCode';
import AuthService from '../../services/auth/AuthService';
import util from '../../modules/util';
import message from '../../modules/responseMessage';
import { UserLoginDto } from '../../interfaces/user/UserLoginDto';
import { UserLogoutDto } from '../../interfaces/user/UserLogoutDto';
import exceptionMessage from '../../modules/exceptionMessage';

/**
 *  @route Post /login/:social
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
        data = await AuthService.kakaoLogin(userLoginDto);
        break;
      case 'APPLE':
        // data = AuthService.appleLogin(userLoginDto);
        break;
      default:
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UNDEFINED_SOCIAL_TYPE));
    }

    if (data === null) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }
    data = {
      accessToken: data,
    };
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNIN_USER_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send;
  }
};

/**
 *  @route Patch /logout
 *  @desc social logout
 *  @access Private
 */
const socialLogout = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;
  const fcmToken = req.body.fcmToken;
  const userLogoutDto: UserLogoutDto = {
    userId,
    fcmToken
  }
  try {
    const data = await AuthService.socialLogout(userLogoutDto);
    if (!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    if (data === exceptionMessage.FCMTOKEN_INVALID) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.INVALID_FCMTOKEN));
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.LOGOUT_USER_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send;
  }
};

const AuthContoller = {
  socialLogin,
  socialLogout
};

export default AuthContoller;
