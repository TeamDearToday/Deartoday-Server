import mongoose, { MongooseError } from 'mongoose';
import { TimeTravelInfo } from '../../interfaces/timeTravel/TimeTravelInfo';
import { TimeTravelCountDto } from '../../interfaces/timeTravel/TimeTravelCountDto';
import { TimeTravelCreateDto } from '../../interfaces/timeTravel/TimeTravelCreateDto';
import { GetAnswersDto } from '../../interfaces/timeTravel/GetAnswersDto';
import { GetQuestionDto } from '../../interfaces/timeTravel/GetQuestionDto';
import { GetTimeTravelDto } from '../../interfaces/timeTravel/GetTimeTravelAllDto';
import { GetTimeTravelDetailDto } from '../../interfaces/timeTravel/GetTimeTravelDetailDto';
import { MessageInfo } from '../../interfaces/message/MessageInfo';
import { OldMediaResponseDto } from '../../interfaces/oldMedia/OldMediaResponseDto';
import OldMedia from '../../models/OldMedia';
import TimeTravel from '../../models/TimeTravel';
import User from '../../models/User';
import getRandomQuestions from '../../modules/shuffleQuestion';
import { Result } from 'express-validator';
import Message from '../../models/Message';

const postTimeTravel = async (timeTravelCreateDto: TimeTravelCreateDto): Promise<TimeTravelInfo> => {
  try {
    const timeTravelQuestions = timeTravelCreateDto.questions;
    const timeTravelAnswers = timeTravelCreateDto.answers;

    const messageList: MessageInfo[] = [];

    for (let i = 0; i < timeTravelQuestions.length; i++) {
      const message = new Message({
        question: timeTravelQuestions[i],
        answer: timeTravelAnswers[i],
      });

      await message.save();
      messageList.push(message._id);
    }

    const timeTravel = new TimeTravel({
      userId: timeTravelCreateDto.userId,
      image: timeTravelCreateDto.image,
      title: timeTravelCreateDto.title,
      year: timeTravelCreateDto.year,
      month: timeTravelCreateDto.month,
      day: timeTravelCreateDto.day,
      writtenDate: timeTravelCreateDto.writtenDate,
      messages: messageList,
    });
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
      userId: user,
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
      year: year,
    });

    const images = await Promise.all(
      oldMedias.map(async (oldMedia) => {
        return oldMedia.image;
      }),
    );

    const data = { images };

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

const getAnswers = async (userId: string): Promise<string[] | null> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const timeTravels = await TimeTravel.find({
      userId: user,
    }).populate('messages', 'answer');

    const data = await Promise.all(
      timeTravels.map(async (timeTravel) => {
        const result: GetAnswersDto = {
          lastAnswer: timeTravel.messages[timeTravel.messages.length - 1].answer,
        };

        return result.lastAnswer;
      }),
    );

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
      userId: userId,
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
    if(!mongoose.Types.ObjectId.isValid(timeTravelId)) return null;
    const timeTravelDetail = await TimeTravel.findById(timeTravelId).populate('messages', 'question answer -_id');

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
  getOldMedia,
  getQuestion,
  getAnswers,
  getTimeTravelDetail,
  postTimeTravel,
  getTimeTravelList,
};
export default TimeTravelService;
