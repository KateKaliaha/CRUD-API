import * as dotenv from 'dotenv';

import { createServer } from 'http';
import { listening } from './requests/listening';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = createServer(listening);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
