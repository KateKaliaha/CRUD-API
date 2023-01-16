import cluster from 'cluster';
import { cpus } from 'os';
import { changeUsersData, users } from '../data/data';
import { PORT, server } from '../index';
import { runServer } from './start';

export const multiServer = () => {
  const newUser = { users: [...users] };

  if (cluster.isPrimary) {
    runServer(PORT);
    const cpusOS = cpus().length;
    for (let i = 0; i <= cpusOS - 1; i++) {
      cluster.fork({ port: PORT + 1 + i });
    }

    cluster.on('message', (worker, msg) => {
      if (msg.action === 'send') {
        newUser.users = msg.usersData;
        changeUsersData(newUser.users);
      }
      if (msg.action === 'get') {
        newUser.users = users;
        worker.send(newUser.users);
      }
    });

    cluster.on('exit', function () {
      console.log('All workers stopped, exiting.');
      process.exit(0);
    });
  } else {
    const port = Number(process.env.port);
    server.listen(port, () => console.log(`start listening port ${port}`));
  }
};
