import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initSchema, checkDbHealth } from './db';
import contactRoutes from './routes/contact';
import newsletterRoutes from './routes/newsletter';
import insightsRoutes from './routes/insights';
import servicesRoutes from './routes/services';
import industriesRoutes from './routes/industries';
import solutionsRoutes from './routes/solutions';
import authRoutes from './routes/auth';

const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', async (_req, res) => {
  const dbOk = await checkDbHealth();
  res.json({
    status: 'ok',
    db: dbOk ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/industries', industriesRoutes);
app.use('/api/solutions', solutionsRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Error]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

async function bootstrap() {
  try {
    await initSchema();
    app.listen(PORT, () => {
      console.log(`[Server] 1Touch Development API running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[Bootstrap] Failed to initialize:', err);
    process.exit(1);
  }
}

bootstrap();

export default app;
