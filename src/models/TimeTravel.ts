import mongoose from "mongoose";
import { TimeTravelInfo } from "../interfaces/timeTravel/TimeTravelInfo";

const TimeTravelSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  },
);