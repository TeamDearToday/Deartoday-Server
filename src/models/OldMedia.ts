import mongoose from 'mongoose';
import { OldMediaInfo } from '../interfaces/oldMedia/OldMediaInfo';

const OldMediaSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
});
