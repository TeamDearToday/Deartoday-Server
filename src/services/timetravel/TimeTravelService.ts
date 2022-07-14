import mongoose from 'mongoose';
import { TimeTravelResponseDto } from '../../interfaces/timeTravel/TimeTravelResponseDto';
import { TimeTravelCreateDto } from '../../interfaces/timeTravel/TimeTravelCreateDto';
import { PostBaseResponseDto } from '../../interfaces/common/PostBaseResponseDto';
import { GetQuestionDto } from '../../interfaces/timeTravel/GetQuestionDto';
import { TimeTravelCountDto } from '../../interfaces/timeTravel/TimeTravelCountDto';
import TimeTravel from '../../models/TimeTravel';
import User from '../../models/User';
import getRandomQuestions from '../../modules/shuffleQuestion';

const postTimeTravel = async (timeTravelCreateDto: TimeTravelCreateDto): Promise<TimeTravelCreateDto> => {
  try {
    const timeTravel = new TimeTravel({
      userId: timeTravelCreateDto.userId,
      title: timeTravelCreateDto.title,
      image: timeTravelCreateDto.image,
      year: timeTravelCreateDto.year,
      month: timeTravelCreateDto.month,
      day: timeTravelCreateDto.day,
      writtenDate: timeTravelCreateDto.currentDate,
      messages: timeTravelCreateDto.answers,
    });

    await timeTravel.save();

    const data = {
      userId: timeTravelCreateDto.userId,
      title: timeTravelCreateDto.title,
      image: timeTravelCreateDto.image,
      year: timeTravelCreateDto.year,
      month: timeTravelCreateDto.month,
      day: timeTravelCreateDto.day,
      currentDate: timeTravelCreateDto.currentDate,
      questions: timeTravelCreateDto.questions,
      answers: timeTravelCreateDto.answers,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


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

const TimeTravelService = {
  getTimeTravelCount,
  getQuestion,
  postTimeTravel,
};
export default TimeTravelService;
