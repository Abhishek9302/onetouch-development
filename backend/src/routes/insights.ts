import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT id, slug, title, excerpt, author, category, tags, published_at, read_time, created_at
       FROM insights
       WHERE published = true
       ORDER BY published_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[Insights] Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, slug, title, excerpt, content, author, category, tags, published_at, read_time, created_at
       FROM insights
       WHERE slug = $1 AND published = true`,
      [slug]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('[Insights] Fetch by slug error:', err);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

export default router;
