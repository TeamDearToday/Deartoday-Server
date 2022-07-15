import mongoose from 'mongoose';
import { PostBaseResponseDto } from '../../interfaces/common/PostBaseResponseDto';
import { OldMediaResponseDto } from '../../interfaces/oldMedia/OldMediaResponseDto';
import { GetQuestionDto } from '../../interfaces/timeTravel/GetQuestionDto';
import { GetTimeTravelDto } from '../../interfaces/timeTravel/GetTimeTravelAllDto';
import { TimeTravelCountDto } from '../../interfaces/timeTravel/TimeTravelCountDto';
import { TimeTravelInfo } from '../../interfaces/timeTravel/TimeTravelInfo';
import OldMedia from '../../models/OldMedia';
import TimeTravel from '../../models/TimeTravel';
import User from '../../models/User';
import getRandomQuestions from '../../modules/shuffleQuestion';

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

const getOldMedia = async (year: number): Promise<OldMediaResponseDto | null> => {
    try {
        const oldMedias = await OldMedia.find({
            year: year
        });
        console.log(oldMedias);
        
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

const TimeTravelService = {
  getTimeTravelCount,
  getOldMedia,
  getQuestion,
  getTimeTravelList,
};
export default TimeTravelService;
