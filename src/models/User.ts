import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
    socialType: {
        type: String,
        enum: ['kakao', 'apple'],
        required: true
    },
    socialToken: {
        type: String,
        required: true
    },
    fcmTokens: {
        type: [String],
        required: true
    }
})