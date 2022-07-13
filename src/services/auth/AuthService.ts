import axios from 'axios';
import { UserLoginDto } from '../../interfaces/user/UserLoginDto';
import User from '../../models/User';
import getToken from '../../modules/jwtHandler';

// 카카오랑 통신하기 -> 유저 정보 가져와
// 토큰 발급
// 유저 확인하기 -> 있으면 바로 리턴 (토큰은 발급해줘야징)
// 없으면 -> 유저정보 디비에 넣어줘 create + 토큰 발급해주기
// 토큰 리턴
const kakaoLogin = async (userLoginDto: UserLoginDto) => {
  let kakaoUserData;
  try {
    const kakaoUser = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${userLoginDto.socialToken}`,
      },
    });

    kakaoUserData = kakaoUser.data;
  } catch (error) {
    console.log('kakao token error');
    return 
  }

  // 카카오 계정이 있는지 체크
  if (!kakaoUserData.id) {
    return null;
  }

  let jwtToken;

  // const user = await User.find({
  //   email: kakaoUser.data.kakao_account
  // });

  // console.log(user);

  if (!kakaoUserData.kakao_account) {
    const user = new User({
      socialType: 'KAKAO',
    });

    const data = {
      _id: user.id,
    };

    jwtToken = getToken(data._id);
    user.accessToken = jwtToken;
    user.fcmTokens = [];
    console.log('hjihih');

    await user.save();
  } else {
    jwtToken = getToken(kakaoUserData._id);
    kakaoUserData.accessToken = jwtToken;
    console.log('haaaaaaa');
  }
  return jwtToken;
};

const appleLogin = async (token: string) => {
  // jwt decode 하면 그냥 바로 유저정보 가져올 수 있어 통신 안해도

  // 토큰 발급

  // 유저 확인하기 -> 있으면 바로 리턴 (토큰은 발급해줘야징)

  // 없으면 -> 유저정보 디비에 넣어줘 create + 토큰 발급해주기

  // 토큰 리턴
  return {};
};

const AuthService = {
  kakaoLogin,
  appleLogin,
};

export default AuthService;
