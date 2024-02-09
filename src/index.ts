import { Hono } from 'hono';
import { authenticationMiddleware } from './middleware';
import data from './data';

const app = new Hono();

app.onError((error, ctx) => {
  console.log(error.message);
  const status = error.message == 'Unauthorized' ? 401 : 500;

  return ctx.json({
    error: error.message,
    status: status
  }, status);
});

app.get('/', (ctx) => ctx.text('Hello Cloudflare Workers!'));

app.get('/links', authenticationMiddleware, async (ctx) => {
  const queryData = ctx.req.query();
  console.log('query:');
  console.log(queryData);

  return ctx.json(data);
});

app.post('/links', authenticationMiddleware, async (ctx) => {
  const requestData = await ctx.req.parseBody();
  console.log('body:');
  console.log(requestData);

  const queryData = ctx.req.query();
  console.log('query:');
  console.log(queryData);

  return ctx.json(data);
});

app.notFound((c) => {
  return c.text('404 Not Found', 404);
});

export default app;