import mongoose from 'mongoose';
import config from '../config';
import User from '../models/User';
import Message from '../models/Message';
import TimeTravel from '../models/TimeTravel';
import OldMedia from '../models/OldMedia';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);

    console.log('Mongoose Connected ...');

    User.createCollection().then(function (collection) {
      console.log("User Collection is created!")
    });

    Message.createCollection().then(function (collection) {
      console.log('Message Collection is created!');
    });

    TimeTravel.createCollection().then(function (collection) {
      console.log('TimeTravel Collection is created!');
    });

    OldMedia.createCollection().then(function (collection) {
      console.log('OldMedia Collection is created!');
    });
    
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
