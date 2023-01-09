import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from './get.js';
import { createUser } from './post.js';

export const listening = (req: IncomingMessage, res: ServerResponse) => {
  const requestURL = req.url;
  const requestURLSplit = (req.url as string).split('/');

  switch (req.method) {
    case 'GET': {
      if (requestURL === '/api/users') {
        getAllUsers(res);
      } else if (requestURLSplit.length === 4 && requestURLSplit[3] !== '') {
        const id = requestURLSplit[3];
        getUserById(id, res);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Common error' }));
      }
      break;
    }

    case 'POST': {
      if (requestURL === '/api/users') {
        createUser(req, res);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Common error' }));
      }
      break;
    }

    default: {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Common error' }));
    }
  }
};
