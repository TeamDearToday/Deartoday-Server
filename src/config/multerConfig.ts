import multer, { FileFilterCallback } from 'multer';
import s3 from './s3Config';
import multerS3 from 'multer-s3';
import config from '.';
import dayjs from 'dayjs';

type FileNameCallback = (error: Error | null, filename: string) => void;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const datetime = dayjs().format('YYYYMMDDHHmmss');
      cb(null, datetime + '_' + file.originalname);
    },
  }),
});

export default upload;
