const message = {
  // 전체적으로 쓰이는 코드
  NULL_VALUE: '필요한 값이 없습니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '존재하지 않는 자원입니다.',
  BAD_REQUEST: '잘못된 문법으로 인하여 서버가 요청을 이해할 수 없습니다.',
  INTERNAL_SERVER_ERROR: '서버 잘못입니다.',
  NULL_VALUE_TOKEN: '토큰이 없습니다.',
  INVALID_PASSWORD: '비밀번호 오류입니다.',

  // TimeTravel
  NO_IMAGE_FILE: '이미지가 없습니다.',
  CREATE_TIMETRAVEL: '시간여행을 생성했습니다.',
  // 유저 관련
  NO_USER: '유저가 존재하지 않습니다.',
  SIGNIN_USER_SUCCESS: '로그인 성공',

  // 로그인 관련
  UNDEFINED_SOCIAL_TYPE: '소셜 타입이 잘못되었습니다.',

  // 토큰 관련
  NO_TOKEN: '토큰 값이 요청되지 않았습니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  EXPIRED_TOKEN: '만료된 토큰입니다.',

  // 타임트레블 관련
  GET_TIME_TRAVEL_COUNT_SUCCESS: '시간여행 개수 조회 성공',
  GET_QUESTIONS_SUCCESS: '질문을 들고오는데 성공했습니다.',
  GET_TIME_TRAVEL_LIST_SUCCESS: '시간여행 목록 불러오기 성공',
};

export default message;
