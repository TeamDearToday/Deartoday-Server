import mongoose from 'mongoose';
import { PostBaseResponseDto } from '../../interfaces/common/PostBaseResponseDto';
import { GetQuestionDto } from '../../interfaces/timeTravel/GetQuestionDto';
import { GetAnswerDto } from '../../interfaces/timeTravel/GetAnswerDto';
import { TimeTravelCountDto } from '../../interfaces/timeTravel/TimeTravelCountDto';
import TimeTravel from '../../models/TimeTravel';
import User from '../../models/User';
import getRandomQuestions from '../../modules/shuffleQuestion';
import { GetTimeTravelDetailDto } from '../../interfaces/timeTravel/GetTimeTravelDetailDto';
import { Result } from 'express-validator';

const getTimeTravelCount = async (userId: string): Promise<TimeTravelCountDto | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }

    const count = await TimeTravel.find({
      userId: userId,
    }).count();

    const data = {
      timeTravelCount: count,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getQuestion = async (): Promise<GetQuestionDto | null> => {
  try {
    const data = getRandomQuestions();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAnswers = async (): Promise<GetAnswerDto[] | null> => {
  try {
    const answers = await TimeTravel.find({}).populate('user');

    const data = await Promise.all(
      answers.map(async (answer: any) => {
        const result = {
          // id: answer.id,
          // title: answer.title,
          // year: answer.year,
          // month: answer.month,
          // day: answer.day,
          // questions: answer.questions,
          messages: answer.messages,
        };
        return result;
      }),
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTimeTravelDetail = async (timeTravelId: string): Promise<GetTimeTravelDetailDto | null> => {
  try {
    const timeTravelDetail = await TimeTravel.findById(timeTravelId);

    if (!timeTravelDetail) {
      return null;
    }

    const data: GetTimeTravelDetailDto = {
      title: timeTravelDetail.title,
      year: timeTravelDetail.year,
      month: timeTravelDetail.month,
      day: timeTravelDetail.day,
      writtenDate: timeTravelDetail.writtenDate,
      image: timeTravelDetail.image,
      messages: timeTravelDetail.messages,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const TimeTravelService = {
  getTimeTravelCount,
  getQuestion,
  getAnswers,
  getTimeTravelDetail,
};
export default TimeTravelService;
