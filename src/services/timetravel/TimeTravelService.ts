import mongoose from 'mongoose';
import { TimeTravelCreateDto } from '../../interfaces/timeTravel/TimeTravelCreateDto';
import { GetQuestionDto } from '../../interfaces/timeTravel/GetQuestionDto';
import { GetTimeTravelDto } from '../../interfaces/timeTravel/GetTimeTravelAllDto';
import { TimeTravelCountDto } from '../../interfaces/timeTravel/TimeTravelCountDto';
import TimeTravel from '../../models/TimeTravel';
import User from '../../models/User';
import getRandomQuestions from '../../modules/shuffleQuestion';
import { GetTimeTravelDetailDto } from '../../interfaces/timeTravel/GetTimeTravelDetailDto';
import { Result } from 'express-validator';
import { GetAnswersDto } from '../../interfaces/timeTravel/GetAnswersDto';

const postTimeTravel = async (timeTravelCreateDto: TimeTravelCreateDto) => {
  try {
    const timeTravel = new TimeTravel(timeTravelCreateDto);
    await timeTravel.save();
    return timeTravel;
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
      user: userId,
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

const getAnswers = async (userId: string): Promise<GetAnswersDto[] | null> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }
    const answers = await TimeTravel.find(
      answers: answer
    );

    console.log(answers);

    const data: GetAnswersDto[] = {
      lastAnswer: answers,
    };

    console.log(answers, data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTimeTravelList = async (userId: string): Promise<GetTimeTravelDto[] | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }

    const timeTravelList = await TimeTravel.find({
      user: userId,
    });

    const data = await Promise.all(
      timeTravelList.map(async (timeTravel) => {
        const result: GetTimeTravelDto = {
          timeTravelId: timeTravel._id,
          title: timeTravel.title,
          year: timeTravel.year,
          month: timeTravel.month,
          day: timeTravel.day,
          writtenDate: timeTravel.writtenDate,
          image: timeTravel.image,
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
  postTimeTravel,
  getTimeTravelList,
};
export default TimeTravelService;
