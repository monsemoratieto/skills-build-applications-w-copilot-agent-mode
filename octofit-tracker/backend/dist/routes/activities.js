import { Router } from 'express';
const router = Router();
router.get('/', (_, res) => {
    res.json({ message: 'List activities', data: [] });
});
router.post('/', (_, res) => {
    res.status(201).json({ message: 'Create activity' });
});
export default router;
