import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit';
const PORT = Number(process.env.PORT || 8000);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB:', MONGO_URL);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
