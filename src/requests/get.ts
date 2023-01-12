import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { users } from '../data/data';

export const getAllUsers = (res: ServerResponse) => {
  res.statusCode = 200;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUserById = (id: string, res: ServerResponse) => {
  const validateId = validate(id);
  if (!validateId) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'ID is not uuid format!' }));
    return;
  }
  const findUserById = users.find((user) => user.id === id);
  if (findUserById) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(findUserById));
    return;
  }
  if (!findUserById) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'User not found!' }));
    return;
  }
};
