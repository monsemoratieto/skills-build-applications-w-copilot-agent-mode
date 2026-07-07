import { Router } from 'express';
const router = Router();

router.get('/', (_, res) => {
  res.json({ message: 'Leaderboard data', data: [] });
});

export default router;
