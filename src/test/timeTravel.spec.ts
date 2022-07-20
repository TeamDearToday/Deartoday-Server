import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
import path from 'path';
import fs from 'fs';
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
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .set('Content-Type', 'multipart/form-data')
      .field('title', '김루희 똥방구')
      .field('year', 2022)
      .field('month', 4)
      .field('day', 19)
      .attach('image', path.resolve(__dirname, 'image', 'test.JPG'))
      .field('writtenDate', '2022.07.19')
      .field('questions[0]', '질문1')
      .field('answers[0]', '대답1')
      .field('questions[1]', '질문2')
      .field('answers[1]', '대답2')
      .field('questions[2]', '질문3')
      .field('answers[2]', '대답3')
      .field('questions[3]', '질문4')
      .field('answers[3]', '대답4')
      .field('questions[4]', '질문5')
      .field('answers[4]', '대답5')
      .field('questions[5]', '질문6')
      .field('answers[5]', '대답6')
      .field('questions[6]', '질문7')
      .field('answers[6]', '대답7')
      .expect(201)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  // 시간여행 정답이나 질문 배열 길이가 7이 아닌 경우
  it('시간여행 생성 - 배열의 길이 에러', (done) => {
    req(app)
      .post('/timeTravel')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .set('Content-Type', 'multipart/form-data')
      .field('title', '김루희 똥방구')
      .field('year', 2022)
      .field('month', 4)
      .field('day', 19)
      .attach('image', path.resolve(__dirname, 'image', 'test.JPG'))
      .field('writtenDate', '2022.07.19')
      .field('questions[0]', '질문1')
      .field('answers[0]', '대답1')
      .field('questions[1]', '질문2')
      .field('answers[1]', '대답2')
      .field('questions[2]', '질문3')
      .field('answers[2]', '대답3')
      .field('questions[3]', '질문4')
      .field('answers[3]', '대답4')
      .field('questions[4]', '질문5')
      .field('answers[4]', '대답5')
      .field('questions[5]', '질문6')
      .field('answers[5]', '대답6')
      .expect(400)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  // 시간여행 필요한 값이 없는 경우
  it('시간여행 생성 - 필요한 값 없음', (done) => {
    req(app)
      .post('/timeTravel')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .set('Content-Type', 'multipart/form-data')
      .field('title', '김루희 똥방구')
      .field('year', 2022)
      .field('month', 4)
      .attach('image', path.resolve(__dirname, 'image', 'test.JPG'))
      .field('writtenDate', '2022.07.19')
      .field('questions[0]', '질문1')
      .field('answers[0]', '대답1')
      .field('questions[1]', '질문2')
      .field('answers[1]', '대답2')
      .field('questions[2]', '질문3')
      .field('answers[2]', '대답3')
      .field('questions[3]', '질문4')
      .field('answers[3]', '대답4')
      .field('questions[4]', '질문5')
      .field('answers[4]', '대답5')
      .field('questions[5]', '질문6')
      .field('answers[5]', '대답6')
      .expect(400)
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
 * 과거 유행 미디어 조회
 * 200, 401 케이스
 */
describe('GET /timeTravel/oldMedia', () => {
  // 과거 유행 미디어 조회 성공 케이스
  it('과거 유행 미디어 조회 - 성공', (done) => {
    req(app)
      .get('/timeTravel/oldMedia')
      .query({ year: '2018' })
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
  // 과거 유행 미디어 조회 400 케이스
  it('과거 유행 미디어 조회 - query 값 없음', (done) => {
    req(app)
      .get('/timeTravel/oldMedia')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  // 과거 유행 미디어 조회 401 케이스
  it('과거 유행 미디어 조회 - unauthorization', (done) => {
    req(app)
      .get('/timeTravel/oldMedia')
      .query({ year: '2018' })
      .set('Content-Type', 'application/json')
      .set({ Authorization: 'asdfadfsfads' })
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
 * 질문 목록 조회
 * 200, 401 케이스
 */
describe('GET /timeTravel/question', () => {
  // 질문 목록 조회 성공 케이스
  it('질문 목록 조회 - 성공', (done) => {
    req(app)
      .get('/timeTravel/question')
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
  // 질문 목록 조회 401
  it('질문 목록 조회 - 유효하지 않은 토큰', (done) => {
    req(app)
      .get('/timeTravel/question')
      .set('Content-Type', 'application/json')
      .set({ Authorization: "error" })
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
 * 메시지 목록 조회
 * 200, 401 케이스
 */
describe('GET /timeTravel/answers', () => {
  // 메시지 목록 조회 성공 케이스
  it('메시지 목록 조회 - 성공', (done) => {
    req(app)
      .get('/timeTravel/answers')
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
  // 메시지 목록 조회 실패 케이스
  it('메시지 목록 조회 - 유효하지 않은 토큰', (done) => {
    req(app)
      .get('/timeTravel/answers')
      .set('Content-Type', 'application/json')
      .set({ Authorization: "error token" })
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
 * 시간여행 목록 조회
 * 200, 401 케이스
 */
describe('GET /timeTravel', () => {
  // 시간여행 목록 조회 성공 케이스
  it('시간여행 목록 조회 - 성공', (done) => {
    req(app)
      .get('/timeTravel')
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
  // 시간여행 목록 조회 실패 케이스
  it('시간여행 목록 조회 - 유효하지 않은 토큰', (done) => {
    req(app)
      .get('/timeTravel')
      .set('Content-Type', 'application/json')
      .set({ Authorization: "token error" })
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