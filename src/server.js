import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(env('PORT', '3000'));

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

  app.use(contactsRouter);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
    next();
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: `Something went wrong (${err.message})`,
      error: err.message,
    });
    next();
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
