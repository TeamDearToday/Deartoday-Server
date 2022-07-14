import mongoose from "mongoose";

export interface GetTimeTravelDto {
  timeTravelId: string;
  title: string;
  year: number;
  month: number;
  day: number;
  writtenDate: string;
  image: string;
}