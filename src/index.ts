import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { multiServer } from './server/cluster';
import { handlerServer } from './server/handler';
import { runServer } from './server/start';

dotenv.config();

export const PORT = process.env.PORT ? +process.env.PORT : 4000;
export const server = createServer(handlerServer);

if (process.argv[2] === '--multi') {
  multiServer();
} else {
  runServer(PORT);
}
