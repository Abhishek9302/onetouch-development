import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT * FROM solutions ORDER BY sort_order ASC, id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[Solutions] Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch solutions' });
  }
});

router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM solutions WHERE slug = $1',
      [slug]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Solution not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('[Solutions] Fetch by slug error:', err);
    res.status(500).json({ error: 'Failed to fetch solution' });
  }
});

export default router;
