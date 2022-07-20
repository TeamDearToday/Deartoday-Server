export const slackMessage = (method: string, originalUrl: string, error: any, uid?: number): string => {
  return `[에러] [${method}] ${originalUrl} ${uid ? `[유저아이디]: ${uid}` : 'req.user 없음'} ${JSON.stringify(error)}`;
};
