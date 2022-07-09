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
    },
    image: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        requied: true
    }
  },
  {
    timestamps: true,
  },
);