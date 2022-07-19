import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

describe('POST /auth/login/KAKAO', () => {
    // 카카오 로그인 성공 케이스
  it('카카오 로그인 - 성공', (done) => {
    req(app)
      .post('/auth/login/KAKAO')
      .set('Content-Type', 'application/json')
      .send({
        socialToken: process.env.KAKAO_TOKEN,
        fcmToken: process.env.FCM_TOKEN,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  // 카카오 로그인 404 에러
  it('카카오 로그인 - 필요한 값 없음', (done) => {
    req(app)
      .post('/auth/login/KAKAO')
      .set('Content-Type', 'application/json')
      .send({
        socialToken: process.env.KAKAO_TOKEN,
      })
      .expect(404)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  // 카카오 로그인 401 에러
  it('카카오 로그인 - 유효하지 않은 토큰', (done) => {
    req(app)
      .post('/auth/login/KAKAO')
      .set('Content-Type', 'application/json')
      .send({
        socialToken: "process.env.KAKAO_TOKEN",
        fcmToken: "1234"
      })
      .expect(401)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
});
