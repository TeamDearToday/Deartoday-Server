import mongoose from 'mongoose';

export interface PostBaseResponseDto {
  userId: mongoose.Schema.Types.ObjectId;
}
