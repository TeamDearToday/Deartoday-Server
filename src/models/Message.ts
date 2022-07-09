import mongoose from "mongoose";
import { MessageInfo } from "../interfaces/message/MessageInfo";

const MessageSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});