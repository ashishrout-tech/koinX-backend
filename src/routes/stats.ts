import { Router, Request, Response } from 'express';
import { CryptoData } from '../models';
import { coinSchema } from '../schemas';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const result = coinSchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        error: `Invalid coin. Supported coins are: ${result.error.format().coin?._errors.join(', ')}`,
      });
    }

    const { coin } = result.data;

    const latestData = await CryptoData.findOne({
      coinId: coin.toLowerCase(),
    })
      .sort({ createdAt: -1 })
      .exec();

    if (!latestData) {
      return res
        .status(404)
        .json({ error: 'No data found for the requested coin' });
    }

    const response = {
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData['24hChange'],
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in /stats API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
