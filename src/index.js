// import express from 'express';
import { initMongoConnection } from './db/initMongoConnection.js';
import setupServer from './src/contacts/controllers/db/middlewares/routers/routers/utils/validation/server.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();