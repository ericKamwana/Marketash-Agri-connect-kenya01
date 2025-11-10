import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import { User } from './models'; // uses models/index.ts

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agriconnect_dev';

const app = express();

// middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// health
app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

// quick test route to verify models are importable
app.get('/debug/users-count', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await User.countDocuments();
    res.json({ users: count });
  } catch (err) {
    next(err);
  }
});

// global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: err?.message || 'Internal Server Error' });
});

const start = async () => {
  await connectDB(MONGODB_URI);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
};

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});