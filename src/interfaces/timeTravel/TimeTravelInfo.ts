import mongoose from "mongoose";
import { MessageInfo } from "../message/MessageInfo";

export interface TimeTravelInfo {
    userId: mongoose.Types.ObjectId;
    title: string;
    image: string;
    year: number;
    month: number;
    day: number;
    writtenDate: string;
    messages: MessageInfo[];
}