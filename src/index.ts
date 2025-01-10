import { connectDB } from '@/db';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  await connectDB();
}

main();
