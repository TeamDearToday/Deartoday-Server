import mongoose from 'mongoose';

export interface UserInfo {
  socialType: string;
  socialId: string;
  accessToken: string;
  fcmTokens: string[];
}
