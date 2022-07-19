import router from '../routes/index';
import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

describe('POST /auth/login/KAKAO', () => {
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
});
