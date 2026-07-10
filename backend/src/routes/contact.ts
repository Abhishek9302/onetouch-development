import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, email, company, role, phone, service_interest, message, budget_range } = req.body;

  if (!name || !email || !company || !role || !service_interest || !message) {
    res.status(400).json({ error: 'Missing required fields: name, email, company, role, service_interest, message' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, company, role, phone, service_interest, message, budget_range)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, created_at`,
      [name.trim(), email.toLowerCase().trim(), company.trim(), role.trim(), phone || null, service_interest, message.trim(), budget_range || null]
    );
    res.status(201).json({
      message: 'Consultation request received. Our team will contact you within one business day.',
      data: { id: result.rows[0].id },
    });
  } catch (err) {
    console.error('[Contact] Insert error:', err);
    res.status(500).json({ error: 'Failed to submit contact request' });
  }
});

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, company, role, service_interest, budget_range, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[Contact] Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

export default router;
