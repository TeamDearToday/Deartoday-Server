import mongoose from "mongoose";

export interface UserInfo {
    socialType: string;
    socialToken: string;
    jwtToken: string;
    fcmTokens: string[];
}