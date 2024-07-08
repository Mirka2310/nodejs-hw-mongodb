import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllContacts, getContactsById } from './services/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandlers.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import contactsRouter from './routers/contacts.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = Number(env('PORT', '3007'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });
  app.use(router);
  app.use(contactsRouter);
  app.use('/contacts', contactsRouter);

  app.use(errorHandler);

  app.use(('*', notFoundHandler));
  app.use(cookieParser());
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
