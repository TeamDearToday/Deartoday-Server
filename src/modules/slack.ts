import config from '../config/index';
import { Request } from 'express';
import slackAPI from './slackAPI';

// export const slackMessage = (method: string, originalUrl: string, error: any, uid?: number): string => {
//   return `[ERROR] [${method}] ${originalUrl} ${uid ? `uid: ${uid}` : 'req.user 없음'} ${JSON.stringify(error)}`;
// };

const slack = (req: any, error: any) => {
  const slackMessage = `--
    
    <유저>
    - [${req.user ? req.user.id : '유저아이디없음'}] ${req.user ? req.user.nickname : '유저닉네임없음'}
    
   <에러 URL>
   - [${req.method.toUpperCase()}] ${req.url}
   
    <에러 메세지>
   - ${error.message} (${error.error})
   `;

  slackAPI.sendMessagesToSlack(slackMessage, config.webhook);
};

export { slack };
