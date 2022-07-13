import mongoose from 'mongoose';
import { UserInfo } from '../interfaces/user/UserInfo';

const UserSchema = new mongoose.Schema({
  socialType: {
    type: String,
    enum: ['KAKAO', 'APPLE'],
    required: true,
  },
  socialId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  fcmTokens: {
    type: [String],
    required: true,
  },
});

export default mongoose.model<UserInfo & mongoose.Document>('User', UserSchema);
