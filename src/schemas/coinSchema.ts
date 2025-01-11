import { z } from 'zod';

export const coinSchema = z.object({
  coin: z.enum(['bitcoin', 'ethereum', 'matic-network']),
});

export type CoinQuery = z.infer<typeof coinSchema>;
