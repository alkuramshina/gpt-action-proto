import type { MiddlewareHandler } from 'hono';

export const authenticationMiddleware: MiddlewareHandler = async (ctx, next) => {
    const authenticationHeader = ctx.req.header("Authorization");
    const token = authenticationHeader?.split(' ')[1];
    console.log(authenticationHeader, token);

    if (token === undefined) {
        throw new Error('Unauthorized')
    }

    await next();
}