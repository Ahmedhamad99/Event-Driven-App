import mongoose from 'mongoose';
import logger from '../src/utils/logger.js';

const connection = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/activitydb';
  if (!uri) {
    logger.error('MONGO_URI is not defined');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error('MongoDB connection error', err);
    process.exit(1);
  }
};

export default connection;