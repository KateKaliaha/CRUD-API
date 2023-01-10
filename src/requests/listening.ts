import { IncomingMessage, ServerResponse } from 'http';
import { removeUser } from './delete.js';
import { getAllUsers, getUserById } from './get.js';
import { createUser } from './post.js';
import { updateUser } from './put.js';

export const listening = (req: IncomingMessage, res: ServerResponse) => {
  const requestURL = req.url;
  const requestURLSplit = (req.url as string).split('/');

  switch (req.method) {
    case 'GET': {
      if (requestURL === '/api/users') {
        getAllUsers(res);
      } else if (
        requestURL?.startsWith('/api/users') &&
        requestURLSplit.length === 4 &&
        requestURLSplit[3] !== ''
      ) {
        const id = requestURLSplit[3];
        getUserById(id, res);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Invalid request!' }));
      }
      break;
    }

    case 'POST': {
      if (requestURL === '/api/users') {
        createUser(req, res);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Invalid request!' }));
      }
      break;
    }

    case 'PUT': {
      if (
        requestURL?.startsWith('/api/users') &&
        requestURLSplit.length === 4 &&
        requestURLSplit[3] !== ''
      ) {
        const id = requestURLSplit[3];
        updateUser(req, res, id);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Invalid request!' }));
      }
      break;
    }
    case 'DELETE': {
      if (
        requestURL?.startsWith('/api/users') &&
        requestURLSplit.length === 4 &&
        requestURLSplit[3] !== ''
      ) {
        const id = requestURLSplit[3];
        removeUser(id, res);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Invalid request!' }));
      }
      break;
    }

    default: {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Invalid request!' }));
    }
  }
};
