import axios from "axios";
import User from "../../models/User";
import getToken from "../../modules/jwtHandler";

const kakaoLogin = async (token: string) => {
  const user = await axios({
    method: 'get',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      accessToken: `Bearer ${token}`,
    },
  });

  const userId = user.data.id;

  if (!userId) {
    const user = new User({
      socialType: 'KAKAO',
      accessToken: getToken()
    })
  }
  // 카카오랑 통신하기 -> 유저 정보 가져와

  // 토큰 발급

  // 유저 확인하기 -> 있으면 바로 리턴 (토큰은 발급해줘야징)

  // 없으면 -> 유저정보 디비에 넣어줘 create + 토큰 발급해주기

  // 토큰 리턴
  return {};
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
    appleLogin
};

export default AuthService;