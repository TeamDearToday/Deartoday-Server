import mongoose from 'mongoose';
import TimeTravel from '../../models/TimeTravel';

export interface TimeTravelResponseDto {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  year: number;
  month: number;
  day: number;
  writtenDate: string;
  image: string;
}
