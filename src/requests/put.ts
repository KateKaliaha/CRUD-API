import { IncomingMessage, ServerResponse } from 'http';
import { validateBody } from '../helpers/helpers';
import { users } from '../data/data';
import { validate } from 'uuid';

export const updateUser = (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const validateId = validate(id);

      if (!validateId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'ID is not uuid format!' }));
        return;
      }

      const validateUserBody = validateBody(body);

      if (validateUserBody) {
        const { username, age, hobbies } = JSON.parse(body);

        const user = {
          username,
          age,
          hobbies,
        };

        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
          res.statusCode = 404;
          res.end(
            JSON.stringify({
              message: 'User not exist!',
            }),
          );
        } else {
          users[index] = { id, ...user };
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(users[index]));
        }
      } else {
        throw new Error();
      }
    } catch {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          message: 'Body does not contain required fields',
        }),
      );
    }
  });
};
