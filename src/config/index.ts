import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT as string, 10) as number,

  /**
   * MongoDB URI
   */
  mongoURI: process.env.MONGODB_URI as string,

  /**
   * AWS S3
   */
  s3AccessKey: process.env.AWS_ACCESS_KEY_ID as string,
  s3SecretKey: process.env.AWS_SECRET_KEY as string,
  bucketName: process.env.BUCKET_NAME as string,

  /**
   * jwt secret
   */
  jwtSecret: process.env.JWT_SECRET as string,

  /**
   * jwt algorithm
   */
  jwtAlgo: process.env.JWT_ALGO as string,

  /**
   * slack webhook
   */
  webhook: process.env.DEV_WEB_HOOK_ERROR_MONITORING as string,
};
