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

/**
 * 시간여행 생성
 * 201, 400 케이스
 */
describe('POST /timeTravel', () => {
  // 시간여행 생성 성공 케이스
  it('시간여행 생성 - 성공', (done) => {
    req(app)
      .post('/timeTravel')
      .set('Content-Type', 'multipart/form-data')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .field("title", "김루희 똥방구")
    //   .send({
    //     "title": '김루희 똥방구',
    //     "image": 'https://cdn.pixabay.com/photo/2022/04/29/17/48/lofoten-7164179_1280.jpg',
    //     "year": 2022,
    //     "month": 7,
    //     "day": 19,
    //     "currentDate": '2022.07.20',
    //     "questions": ['질문1', '질문2', '질문3', '질문4', '질문5', '질문6', '질문7'],
    //     "answers": ['대답1', '대답2', '대답3', '대답4', '대답5', '대답6', '대답7'],
    //   })
      .expect(201)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
});
