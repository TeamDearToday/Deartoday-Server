import UserInfo from '../interfaces/user/UserInfo';

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
    
    interface Response {}
    interface Application {}
  }
}
