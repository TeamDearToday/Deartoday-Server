import mongoose from 'mongoose';
import config from '../config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);

    console.log('Mongoose Connected ...');
    
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
