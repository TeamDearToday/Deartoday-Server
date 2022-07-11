import mongoose from 'mongoose';

export interface UserInfo {
  _id: mongoose.Schema.Types.ObjectId;
  socialType: string;
  socialToken: string;
  jwtToken: string;
  fcmTokens: string[];
}
