import mongoose from 'mongoose';
import { PostBaseResponseDto } from '../../interfaces/common/PostBaseResponseDto';
import { TimeTravelCountDto } from '../../interfaces/timeTravel/TimeTravelCountDto';
import TimeTravel from '../../models/TimeTravel';
import User from '../../models/User';

const getTimeTravelCount = async (userId: string): Promise<TimeTravelCountDto | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }

    const count = await TimeTravel.find({
        userId: userId
    })
    .count();

    const data = {
        timeTravelCount: count
    }

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const TimeTravelService = {};
export default TimeTravelService;
