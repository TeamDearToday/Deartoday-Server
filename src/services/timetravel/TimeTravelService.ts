import mongoose from 'mongoose';
import { TimeTravelInfo } from '../../interfaces/timeTravel/TimeTravelInfo';
import { GetQuestionDto } from '../../interfaces/timeTravel/GetQuestionDto';
import { GetTimeTravelDto } from '../../interfaces/timeTravel/GetTimeTravelAllDto';
import { TimeTravelCountDto } from '../../interfaces/timeTravel/TimeTravelCountDto';
import TimeTravel from '../../models/TimeTravel';
import User from '../../models/User';
import getRandomQuestions from '../../modules/shuffleQuestion';
import { GetTimeTravelDetailDto } from '../../interfaces/timeTravel/GetTimeTravelDetailDto';
import { Result } from 'express-validator';
import { GetAnswersDto } from '../../interfaces/timeTravel/GetAnswersDto';
import { TimeTravelCreateDto } from '../../interfaces/timeTravel/TimeTravelCreateDto';
import { MessageInfo } from '../../interfaces/message/MessageInfo';
import Message from '../../models/Message';

const postTimeTravel = async (timeTravelCreateDto: TimeTravelCreateDto): Promise<TimeTravelInfo> => {
  try {
    const timeTravelQuestions = timeTravelCreateDto.questions;
    const timeTravelAnswers = timeTravelCreateDto.answers;

    // /**
    //  * TODO
    //  * 메시지 저장 promise로 하는 방법 생각해보기
    //  * Post 할 때 배열로 넣는 방법 찾아내서 배열로 넣기
    //  * timeTravelCreateDto 말고 timeTravelInfo로 저장하기 +
    //  * TimeTravel에 저장하기 전에 timeTravelInfo에 우리가 저장한 메시지들을 timeTravelInfo 요소로 넣기 +
    //  * timeTravel 저장 +
    //  */

    let messageList: MessageInfo[] = [];

    for (let i = 0; i < timeTravelQuestions.length; i++) {
      const message = new Message({
        question: timeTravelQuestions[i],
        answer: timeTravelAnswers[i],
      });

      await message.save();
      messageList.push(message._id);
    }

    // const data = await Promise.all(
    //   messageList.map(async (message) => {
    //     const dataList = new Message({
    //       question: message.question,
    //       answer: message.answer,
    //     });

    //     await dataList.save();

    //     // objectid
    //     const messageInfo = {
    //       _id: dataList._id,
    //     };
    //   }),
    // );

    // console.log(data, '데이터소연?');

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

    console.log(timeTravel);
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

    const timeTravels = await TimeTravel.find({
      user: userId,
    }).populate('messages', 'answer');

    const data = await Promise.all(
      timeTravels.map(async (timeTravel) => {
        const result: GetAnswersDto = {
          lastAnswer: timeTravel.messages[6].answer,
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
