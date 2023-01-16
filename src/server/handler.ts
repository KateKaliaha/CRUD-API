import cluster from 'cluster';
import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../data/data';
import { IUser } from '../data/interfaces';
import { listening } from '../requests/listening';

export const handlerServer = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  res.setHeader('Content-Type', 'application/json');

  if (cluster.isWorker) {
    if (process.send) {
      process.send({ action: 'get' });
    }

    process.once('message', async (msg) => {
      const usersData = await listening(req, res, msg as IUser[]);
      if (process.send) {
        process.send({ action: 'send', usersData });
      }
    });
  } else {
    await listening(req, res, users);
  }
};
