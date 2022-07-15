import { MessageInfo } from '../../interfaces/message/MessageInfo';
import mongoose from 'mongoose';

export interface TimeTravelCreateDto {
  userId: mongoose.Types.ObjectId;
  title: string;
  image: string;
  year: number;
  month: number;
  day: number;
  writtenDate: string;
  questions: string[];
  answers: string[];
}
