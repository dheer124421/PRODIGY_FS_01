import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';

const router = express.Router();

router.get('/profile', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select('_id name email createdAt');
  if (!user) return res.status(404).json({ message: 'Not found' });
  return res.json({ user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt } });
});

export default router;


