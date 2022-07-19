import { MessageInfo } from '../message/MessageInfo';

export interface GetTimeTravelDetailDto {
  title: string;
  image: string;
  year: number;
  month: number;
  day: number;
  writtenDate: string;
  messages: MessageInfo[];
}
