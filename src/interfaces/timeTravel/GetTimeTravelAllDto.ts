import mongoose from "mongoose";

export interface GetTimeTravelDto {
  timeTravelId: mongoose.Types.ObjectId;
  title: string;
  year: number;
  month: number;
  day: number;
  writtenDate: string;
  image: string;
}