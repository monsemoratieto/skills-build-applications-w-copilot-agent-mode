import express from 'express';
import cors from 'cors';
import db from './config/database.js';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.json({ status: 'OctoFit Tracker backend is running', port: PORT });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
