import { IncomingMessage, ServerResponse } from 'http';
import { BodyPost } from '../data/interfaces.js';
import { validateBody } from '../helpers/helpers.js';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/data.js';

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const validate = validateBody(body);

      if (validate) {
        const { username, age, hobbies } = JSON.parse(body);
        const user = {
          username,
          age,
          hobbies,
        };
        const newUser = (user: BodyPost) => {
          return { id: uuidv4(), ...user };
        };
        const createdUser = newUser(user);
        users.push(createdUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(createdUser));
      } else {
        const { username, age, hobbies } = JSON.parse(body);

        if (!username || !age || !hobbies) {
          throw new Error();
        } else {
          res.statusCode = 404;
          res.end(
            JSON.stringify({
              message: 'Body does not contain true fields types',
            }),
          );
        }
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
