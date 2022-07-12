const kakaoLogin = async (token: String) => {
  // 카카오랑 통신하기 -> 유저 정보 가져와

  // 토큰 발급

  // 유저 확인하기 -> 있으면 바로 리턴 (토큰은 발급해줘야징)

  // 없으면 -> 유저정보 디비에 넣어줘 create + 토큰 발급해주기

  // 토큰 리턴
  return {};
};

const appleLogin = async (token: String) => {
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