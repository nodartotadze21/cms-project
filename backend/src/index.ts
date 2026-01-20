import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import postRoutes from './routes/posts.js';
import newsRoutes from './routes/news.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  res.json({ message: 'CMS backend up' });
});

app.use('/api', postRoutes);
app.use('/api', newsRoutes);

const PORT = Number(process.env.PORT || 4000);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API listening on ${PORT}`);
  });
}

start();
