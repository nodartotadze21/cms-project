import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import postRoutes from './routes/posts.js';
import newsRoutes from './routes/news.js';
import uploadRoutes from './routes/upload.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  res.json({ message: 'CMS backend up' });
});

// Cloudinary verification endpoint
app.get('/api/check-cloudinary', (_req, res) => {
  const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✅ დაყენებული' : '❌ არ არის დაყენებული',
    api_key: process.env.CLOUDINARY_API_KEY ? '✅ დაყენებული' : '❌ არ არის დაყენებული',
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ დაყენებული' : '❌ არ არის დაყენებული',
    cloud_name_value: process.env.CLOUDINARY_CLOUD_NAME,
  };
  res.json(cloudinaryConfig);
});

app.use('/api', postRoutes);
app.use('/api', newsRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = Number(process.env.PORT || 4000);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API listening on ${PORT}`);
  });
}

start();
