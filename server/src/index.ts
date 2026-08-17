import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { testConnection } from './db/pool';
import { initDatabase } from './db/schema';
import { errorHandler } from './middleware/auth';
import authRouter from './routes/auth';
import apiRouter from './routes/api';
import {
  startupsRouter, iprRouter, mentorsRouter, programsRouter,
  eventsRouter, opportunitiesRouter, partnersRouter, storiesRouter, resourcesRouter
} from './routes/crud';
import uploadRouter from './routes/upload';

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

// Security
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
const submitLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });
app.use('/api/', limiter);
app.use('/api/ideas', submitLimiter);
app.use('/api/incubation', submitLimiter);
app.use('/api/ipr-requests', submitLimiter);
app.use('/api/mentor-requests', submitLimiter);

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/startups', startupsRouter);
app.use('/api/ipr', iprRouter);
app.use('/api/mentors', mentorsRouter);
app.use('/api/programs', programsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/opportunities', opportunitiesRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/upload', uploadRouter);
app.use('/api', apiRouter);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Error handler
app.use(errorHandler);

// Start server
async function start() {
  const dbConnected = await testConnection();
  if (dbConnected) await initDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${dbConnected ? '✅ Connected' : '❌ Disconnected'}`);
  });
}

if (!process.env.VERCEL) {
  start().catch(console.error);
}

export default app;
