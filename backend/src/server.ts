import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🎬 MACTS Backend Server is live on http://localhost:${PORT}`);
  console.log(`🎥 Academy API Health Check: http://localhost:${PORT}/api/health`);
});

