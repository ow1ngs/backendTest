import { handlerPath } from '@libs/handler-resolver';
import inputSchema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    JWT_SECRET_KEY: 'my-32-character-ultra-secure-and-ultra-long-secret'
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'postSongs',
        request: {
          schemas: {
            'application/json': inputSchema,
          },
        },
      },
    },
  ],
};
