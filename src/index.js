import { initMongoConnection } from './db/initMongoConnecrion.js';

const init = async () => {
  await initMongoConnection();
};

init();
