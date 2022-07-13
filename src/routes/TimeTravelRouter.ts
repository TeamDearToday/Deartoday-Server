import { Router } from 'express';
import TimeTravelController from '../controllers/timeTravel/TimeTravelController';
import auth from '../middlewares/auth';

const router: Router = Router();

// 메인 - 시간여행 개수
router.get('/count', auth, TimeTravelController.getTimeTravelCount);

// 시간여행 가상공간 - 특정 연도 사진 가져오기
router.get('/oldMedia', TimeTravelController.getOldMedia);

// 시간여행 가상공간 - 질문 가져오기
router.get('/question', TimeTravelController.getQuestion);

// 시간여행 가상공간 - 질문, 대답, 과거사진, 날짜, 제목 쓰기
router.post('/', TimeTravelController.postTimeTravel);

// 메세지 확인하기
router.get('/answers', TimeTravelController.getAnswers);

// 비디오 테이프 목록 가져오기
router.get('/', TimeTravelController.getTimeTravelList);

// 시간여행 상세내역 확안하기
router.get('/:timeTravleId', TimeTravelController.getTimeTravelId);

export default router;
