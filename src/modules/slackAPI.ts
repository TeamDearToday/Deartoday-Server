import axios from 'axios';
import config from '../config/index';
import dotenv from 'dotenv';

dotenv.config();

// const SLACK = process.env.SLACK as string;

const sendMessagesToSlack = (message: string, apiEndPoint: string = config.webhook) => {
  try {
    axios
      .post(apiEndPoint, { text: message })
      .then()
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.log(error);
  }
};

export default {
  sendMessagesToSlack,
};
