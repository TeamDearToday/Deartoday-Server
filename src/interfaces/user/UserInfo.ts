import mongoose from 'mongoose';

export interface UserInfo {
  id: mongoose.Types.ObjectId;
  socialType: string;
  socialId: string;
  accessToken: string;
  fcmTokens: string[];
}
