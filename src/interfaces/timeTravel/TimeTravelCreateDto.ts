import { MessageInfo } from '../../interfaces/message/MessageInfo';

export interface TimeTravelCreateDto {
  userId: string;
  title: string;
  image: string;
  year: number;
  month: number;
  day: number;
  writtenDate: string;
  questions: string[];
  answers: string[];
}
