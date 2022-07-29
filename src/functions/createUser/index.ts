import inputSchema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'createUser',
        request: {
          schemas: {
            'application/json': inputSchema,
          },
        },
      },
    },
  ],
};
