import { Response } from 'express';

export const Errors = {
  INVALID_COIN: (res: Response) =>
    res.status(400).json({
      error: `Invalid coin. Supported coins are: ${['bitcoin', 'ethereum', 'matic-network'].join(', ')}`,
    }),

  NO_DATA_FOUND: (res: Response) =>
    res.status(404).json({
      error: 'No data found for the requested coin',
    }),

  INTERNAL_SERVER_ERROR: (res: Response) =>
    res.status(500).json({
      error: 'Internal server error',
    }),
};
