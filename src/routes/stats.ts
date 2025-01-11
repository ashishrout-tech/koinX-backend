import { Router, Request, Response } from 'express';
import { CryptoData } from '../models';
import { coinSchema } from '../schemas';
import { Errors } from '../utils/error';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const result = coinSchema.safeParse(req.query);
    if (!result.success) {
      return Errors.INVALID_COIN(res);
    }

    const { coin } = result.data;

    const latestData = await CryptoData.findOne({
      coinId: coin.toLowerCase(),
    })
      .sort({ createdAt: -1 })
      .exec();

    if (!latestData) {
      return Errors.NO_DATA_FOUND(res);
    }

    const response = {
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData['24hChange'],
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in /stats API:', error);
    return Errors.INTERNAL_SERVER_ERROR(res);
  }
});

export default router;
