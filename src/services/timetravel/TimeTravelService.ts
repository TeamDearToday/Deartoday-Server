import mongoose from 'mongoose';
import { PostBaseResponseDto } from '../../interfaces/common/PostBaseResponseDto';
import { GetQuestionDto } from '../../interfaces/timeTravel/GetQuestionDto';
import { GetAnswerDto } from '../../interfaces/timeTravel/GetAnswerDto';
import { TimeTravelCountDto } from '../../interfaces/timeTravel/TimeTravelCountDto';
import TimeTravel from '../../models/TimeTravel';
import User from '../../models/User';
import getRandomQuestions from '../../modules/shuffleQuestion';
import { TimeTravelDetailResponseDto } from '../../interfaces/timeTravel/TimeTravelDetailResponseDto';

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

// const getAnswers = async (messages: string[]): Promise<GetAnswerDto | null> => {
//   try {
//     const answers = await TimeTravel.find({
//       messages: messages,
//     });

//     if (!answers) {
//       return null;
//     }

//     console.log(answers);

//     const data = {
//       lastAnswers: answers[answers.length - 1],
//     };

//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const getTimeTravelDetail = async (timeTravelId: string): Promise<TimeTravelDetailResponseDto | null> => {
  try {
    const timeTravelDetail = await TimeTravel.findById(timeTravelId);

    if (!timeTravelDetail) {
      return null;
    }

    const data: TimeTravelDetailResponseDto = {
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
  // getAnswers,
  getTimeTravelDetail,
};
export default TimeTravelService;
