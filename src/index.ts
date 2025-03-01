import express from 'express';
import { connectDB } from './db';
import * as dotenv from 'dotenv';
import { startBackgroundJob } from './jobs/cronJob';
import { deviationRouter, statsRouter } from './routes';
import cors from 'cors';

dotenv.config();

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  await connectDB();

  app.use('/stats', statsRouter);
  app.use('/deviation', deviationRouter);

  app.get('/', (req, res) => {
    res.send('Server is running...');
  });

  startBackgroundJob();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

main().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
