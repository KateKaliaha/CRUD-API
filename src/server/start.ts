import { server } from '../index';

export const runServer = (port: number) => {
  server.listen(port, () => {
    console.log(`Server process ${process.pid} listen: ${port}`);
  });

  process.on('SIGINT', () => {
    server.close(() => process.exit());
  });
};
