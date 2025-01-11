import { Router, Request, Response } from 'express';
import { coinSchema, CoinQuery } from '../schemas';
import { CryptoData } from '../models';
import { Errors } from '../utils/error';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const result = coinSchema.safeParse(req.query);
    if (!result.success) {
      return Errors.INVALID_COIN(res);
    }

    const { coin }: CoinQuery = result.data;

    const records = await CryptoData.find({ coinId: coin.toLowerCase() })
      .sort({ createdAt: -1 })
      .limit(100)
      .exec();

    if (records.length === 0) {
      return Errors.NO_DATA_FOUND(res);
    }

    const prices: number[] = records.map((record) => record.price);

    // Mean
    let total = 0;
    for (const price of prices) {
      total += price;
    }
    const mean = total / prices.length;

    // Variance
    let squaredDifferencesSum = 0;
    for (const price of prices) {
      const difference = price - mean;
      const squaredDifference = difference * difference;
      squaredDifferencesSum += squaredDifference;
    }
    const variance = squaredDifferencesSum / prices.length;

    // Standard deviation
    const deviation = Math.sqrt(variance);

    res.status(200).json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    console.error('Error in /deviation API:', error);
    return Errors.INTERNAL_SERVER_ERROR(res);
  }
});

export default router;
