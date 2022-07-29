import { handlerPath } from '@libs/handler-resolver';
import inputSchema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    JWT_SECRET_KEY: 'my-32-character-ultra-secure-and-ultra-long-secret',
    EXPIRATION_JWT_TIME: '20m'
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'userAuth',
        request: {
          schemas: {
            'application/json': inputSchema,
          },
        },
      },
    },
  ],
};
