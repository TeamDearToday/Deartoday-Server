import mongoose from "mongoose";

export interface UserLogoutDto {
    userId: mongoose.Types.ObjectId;
    fcmToken: string;
}