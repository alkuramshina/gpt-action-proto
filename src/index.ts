import { authenticationMiddleware } from './middleware';
import { watchData } from './data';
import { LogType, setLogMessage } from './helpers';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { getLinksRoute, mainApiInfo } from './openapi';

const app = new OpenAPIHono();

app.onError((error, ctx) => {
  console.log(error.message);
  const status = error.message == 'Unauthorized' ? 401 : 500;

  return ctx.json({
    error: error.message,
    status: status
  }, status);
});

app.get('/swagger', swaggerUI({ url: '/documentation' }));
app.doc('/documentation', mainApiInfo);

app.use(getLinksRoute.getRoutingPath(), authenticationMiddleware);
app.openapi(getLinksRoute, async (ctx) => {
  const queryData = ctx.req.query();
  console.log(setLogMessage(LogType.query, queryData));

  return ctx.json(watchData);
});

app.post('/links', authenticationMiddleware, async (ctx) => {
  const requestData = await ctx.req.parseBody();
  console.log(setLogMessage(LogType.body, requestData));

  const queryData = ctx.req.query();
  console.log(setLogMessage(LogType.query, queryData));

  return ctx.json(watchData);
});

app.notFound((c) => {
  return c.text('404 Not Found', 404);
});

export default app;