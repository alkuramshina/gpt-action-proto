import type { MiddlewareHandler } from 'hono';
import { LogType, setLogMessage } from './helpers';

export const authenticationMiddleware: MiddlewareHandler = async (ctx, next) => {
  const authenticationHeader = ctx.req.header("Authorization");
  const token = authenticationHeader?.split(' ')[1];

  console.log(setLogMessage(LogType.header, { 
    header: authenticationHeader, 
    token: token 
  }));

  if (token === undefined) {
    throw new Error('Unauthorized')
  }

  await next();
}