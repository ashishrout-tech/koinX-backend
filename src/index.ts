import { connectDB } from './db';
import * as dotenv from 'dotenv';
import { job } from './jobs/cronJob';

dotenv.config();

async function main() {
  await connectDB();
  await job();
}

main();
