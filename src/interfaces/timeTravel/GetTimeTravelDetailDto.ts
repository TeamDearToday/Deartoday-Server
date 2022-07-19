import { Message } from '../../models/Message';
import { MessageInfo } from '../message/MessageInfo';
import { GetMessageDto } from './GetMessageDto';

export interface GetTimeTravelDetailDto {
  title: string;
  image: string;
  year: number;
  month: number;
  day: number;
  writtenDate: string;
  messages: Message[];
}
