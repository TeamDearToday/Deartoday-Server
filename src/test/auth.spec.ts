import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

/**
 * 카카오 로그인
 * 200, 400, 401 케이스
 */
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
  // 카카오 로그인 400 에러
  it('카카오 로그인 - 필요한 값 없음', (done) => {
    req(app)
      .post('/auth/login/KAKAO')
      .set('Content-Type', 'application/json')
      .send({
        socialToken: process.env.KAKAO_TOKEN,
      })
      .expect(400)
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
        socialToken: 'process.env.KAKAO_TOKEN',
        fcmToken: '1234',
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

/**
 * 애플 로그인
 * 200, 400, 401 케이스
 */
describe('POST /auth/login/APPLE', () => {
  // 애플 로그인 성공 케이스
  it('애플 로그인 - 성공', (done) => {
    req(app)
      .post('/auth/login/APPLE')
      .set('Content-Type', 'application/json')
      .send({
        socialToken: process.env.APPLE_TOKEN,
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
  // 애플 로그인 400 에러
  it('애플 로그인 - 필요한 값 없음', (done) => {
    req(app)
      .post('/auth/login/APPLE')
      .set('Content-Type', 'application/json')
      .send({
        socialToken: process.env.APPLE_TOKEN,
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  // 애플 로그인 401 에러
  it('애플 로그인 - 유효하지 않은 토큰', (done) => {
    req(app)
      .post('/auth/login/APPLE')
      .set('Content-Type', 'application/json')
      .send({
        socialToken: 'process.env.APPLE_TOKEN',
        fcmToken: '1234',
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

/**
 * 로그아웃
 * 200, 400, 404 케이스
 */
describe('PATCH /auth/logout', () => {
  // 로그아웃 성공 케이스
  it('로그아웃 - 성공', (done) => {
    req(app)
      .patch('/auth/logout')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .send({
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
  // 로그아웃 400 에러
  it('로그아웃 - 필요한 값 없음', (done) => {
    req(app)
      .patch('/auth/logout')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  // 로그아웃 유효하지 않은 fcm token
  it('로그아웃 - 유효하지 않은 fcm token', (done) => {
    req(app)
      .patch('/auth/logout')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .send({
        fcmToken: 'process.env.FCM_TOKEN',
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
