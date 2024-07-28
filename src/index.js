<<<<<<< Updated upstream
import { initMongoConnection } from './db/initMongoConnecrion.js';
=======
import { initMongoConnection } from './db/initMongoConnection.js';
>>>>>>> Stashed changes
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

void bootstrap();