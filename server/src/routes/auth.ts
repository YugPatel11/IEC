import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db/pool';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    const result = await query(
      'SELECT id, username, email, password_hash FROM admins WHERE username = $1',
      [username]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const admin = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      data: {
        token,
        admin: { id: admin.id, username: admin.username, email: admin.email },
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  return res.json({ success: true, data: req.admin });
});

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
  return res.json({ success: true, message: 'Logged out' });
});

// POST /api/auth/setup — create first admin (only if no admins exist)
router.post('/setup', async (req: Request, res: Response) => {
  try {
    const existing = await query('SELECT id FROM admins LIMIT 1');
    if ((existing.rowCount ?? 0) > 0) {
      return res.status(403).json({ success: false, message: 'Admin already exists' });
    }

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const secret = req.headers['x-setup-secret'];
    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ success: false, message: 'Invalid setup secret' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await query(
      'INSERT INTO admins (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, passwordHash]
    );

    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err: any) {
    console.error("Setup error:", err);
    return res.status(500).json({ success: false, message: 'Setup failed', error: err.message || err.toString() });
  }
});

export default router;
