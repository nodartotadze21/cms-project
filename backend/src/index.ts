import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  res.json({ message: 'CMS backend up' });
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
