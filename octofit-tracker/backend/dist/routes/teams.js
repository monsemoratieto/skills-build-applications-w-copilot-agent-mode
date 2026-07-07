import { Router } from 'express';
const router = Router();
router.get('/', (_, res) => {
    res.json({ message: 'List teams', data: [] });
});
router.post('/', (_, res) => {
    res.status(201).json({ message: 'Create team' });
});
export default router;
