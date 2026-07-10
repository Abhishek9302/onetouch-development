import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { email, name } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO subscribers (email, name)
       VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET updated_at = NOW(), active = true
       RETURNING id`,
      [email.toLowerCase().trim(), name || null]
    );
    res.status(201).json({
      message: 'Successfully subscribed to the AI Intelligence newsletter.',
      data: { id: result.rows[0].id },
    });
  } catch (err) {
    console.error('[Newsletter] Insert error:', err);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

export default router;
