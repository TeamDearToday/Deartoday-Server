import AWS from 'aws-sdk';
import config from '.';

const s3: AWS.S3 = new AWS.S3({
  accessKeyId: config.s3AccessKey,
  secretAccessKey: config.s3SecretKey,
  region: 'ap-northeast-2',
});

export default s3;
