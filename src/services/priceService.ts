import axios from 'axios';

const COINS = ['bitcoin', 'matic-network', 'ethereum'];

export const fetchCoinData = async () => {
  const params = {
    ids: COINS.join(','),
    vs_currencies: 'usd',
    include_market_cap: 'true',
    include_24hr_change: 'true',
  };

  const headers = {
    accept: 'application/json',
    'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
  };

  try {
    const response = await axios.get(process.env.COINGECKO_BASE_URL as string, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    throw error;
  }
};
