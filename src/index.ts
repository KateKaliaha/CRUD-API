import * as dotenv from 'dotenv';

import { createServer, IncomingMessage, ServerResponse } from 'http';

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = 'localhost';

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}
const users: IUser[] = [];

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'User not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
