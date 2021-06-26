import { RequestHandler } from 'express';

const timeout: RequestHandler = (req, res, next) => {
  setTimeout(() => next(), 500);
};
  
export default timeout;
  
