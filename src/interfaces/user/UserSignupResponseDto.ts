import mongoose from "mongoose";

export interface UserSignupResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
    accessToken: string;
}