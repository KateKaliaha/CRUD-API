import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { users } from '../data/data';

export const removeUser = (id: string, res: ServerResponse) => {
  const validateId = validate(id);

  if (!validateId) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'ID is not uuid format!' }));
    return;
  }

  const findUserById = users.find((user) => user.id === id);
  if (findUserById) {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
    return;
  }

  if (!findUserById) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'User not exist!' }));
    return;
  }
};
