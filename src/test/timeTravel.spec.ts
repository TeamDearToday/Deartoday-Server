import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

/**
 * 시간여행 개수 조회
 * 200, 401 케이스
 */
describe('GET /timeTravel/count', () => {
    // 시간여행 개수 조회 성공 케이스
  it('시간여행 개수 조회 - 성공', (done) => {
    req(app)
      .get('/timeTravel/count')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
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
  // 시간 여행 개수 조회 401 케이스
  it('시간여행 개수 조회 - 유효하지 않은 토큰', (done) => {
    req(app)
      .get('/timeTravel/count')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer process.env.TEST_TOKEN` })
      .expect(401)
      .expect('Content-Type', /json/)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
});