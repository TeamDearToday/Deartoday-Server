import router from '../routes/index';
import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

describe('POST /auth/login/KAKAO', () => {
    it('카카오 로그인 성공', done => {
        request(router)
        .get('/auth/login')
    })
})