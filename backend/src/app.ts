import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { apiRouter } from './routes/api';

export const app = express();

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS
app.use(cors({
  origin: '*',
  credentials: true
}));

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory for screenshots and banners
const uploadsPath = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    brand: 'MACTS - MoonInRed Academy of Cinema Technical Studies',
    domain: 'https://mactsfilminstitute.com',
    timestamp: new Date().toISOString()
  });
});

// Main API Routes
app.use('/api', apiRouter);

// Server-side Redirects
app.get('/mooninred', (_req, res) => {
  res.redirect(301, 'https://www.mooninred.com');
});

app.get('/parent', (_req, res) => {
  res.redirect(301, 'https://www.mooninred.com');
});

// Production / Local Fullstack SPA Static Serving & Catch-All Fallback
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred.'
  });
});

