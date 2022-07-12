import mongoose from 'mongoose';

export interface UserInfo {
  socialType: string;
  accessToken: string;
  fcmTokens: string[];
}
