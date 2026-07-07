import { Router } from 'express';
const router = Router();

router.get('/', (_, res) => {
  res.json({ message: 'List users', data: [] });
});

router.post('/', (_, res) => {
  res.status(201).json({ message: 'Create user' });
});

export default router;
