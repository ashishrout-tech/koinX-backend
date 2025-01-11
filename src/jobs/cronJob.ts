import { fetchCoinData } from '../services/priceService';
import { CryptoData } from '../models/cryptoData';
import cron from 'node-cron';

export async function job() {
  console.log(`[${new Date().toISOString()}] Running background job...`);
  try {
    const data = await fetchCoinData();

    const records = Object.keys(data).map((coin) => ({
      coinId: coin,
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      '24hChange': data[coin].usd_24h_change,
    }));

    if (records.length > 0) {
      await CryptoData.insertMany(records);
      console.log(
        `[${new Date().toISOString()}] Crypto data saved successfully!`
      );
    } else {
      console.log(`[${new Date().toISOString()}] No data available to save.`);
    }
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error in background job:`,
      error
    );
  }
}

export const startBackgroundJob = () => {
  console.log('Initializing background job...');
  cron.schedule('*/2 * * * *', job);
};
