import mongoose from 'mongoose';
import { TimeTravelResponseDto } from '../../interfaces/timeTravel/TimeTravelResponseDto';
import { TimeTravelCreateDto } from '../../interfaces/timeTravel/TimeTravelCreateDto';
import TimeTravel from '../../models/TimeTravel';

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

const TimeTravelService = {
  postTimeTravel,
};

export default TimeTravelService;
