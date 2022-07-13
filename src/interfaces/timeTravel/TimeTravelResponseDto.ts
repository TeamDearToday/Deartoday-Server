import mongoose from 'mongoose';
import TimeTravel from '../../models/TimeTravel';

export interface TimeTravelResponseDto {
  userId: mongoose.Schema.Types.ObjectId;
  image: string;
}
