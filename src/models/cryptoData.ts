import mongoose from 'mongoose';

const CryptoDataSchema = new mongoose.Schema(
  {
    coinId: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    '24hChange': { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const CryptoData = mongoose.model('CryptoData', CryptoDataSchema);
