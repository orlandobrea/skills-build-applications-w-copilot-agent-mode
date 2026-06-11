import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async (): Promise<typeof mongoose> => {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB:', MONGO_URL);
  return mongoose;
};

export default mongoose;
