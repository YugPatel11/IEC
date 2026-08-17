import { Router, Request, Response } from 'express';
import { query } from '../db/pool';
import { authenticate, AuthRequest, paginate, paginationResponse } from '../middleware/auth';

function crudRouter(table: string, publicFields: string[], allFields: string[], filters: string[] = []) {
  const router = Router();
  const allCols = allFields.join(', ');

  // GET all (public-safe, with pagination)
  router.get('/', async (req: Request, res: Response) => {
    try {
      const { page, limit, offset } = paginate(req);
      const search = req.query.search as string || '';
      const conditions: string[] = [];
      const params: any[] = [];
      let paramIdx = 1;

      // is_published / status filter for public
      if (!req.headers.authorization) {
        if (allFields.includes('is_published')) {
          conditions.push(`is_published = TRUE`);
        }
      }

      // Dynamic filters
      filters.forEach(f => {
        const val = req.query[f] as string;
        if (val && val !== 'true' && val !== 'false') {
          conditions.push(`${f} = $${paramIdx++}`);
          params.push(val);
        } else if (val === 'true') {
          conditions.push(`${f} = TRUE`);
        } else if (val === 'false') {
          conditions.push(`${f} = FALSE`);
        }
      });

      // Special: is_published as boolean
      if (req.query.is_published !== undefined && !filters.includes('is_published')) {
        conditions.push(`is_published = $${paramIdx++}`);
        params.push(req.query.is_published === 'true');
      }

      // Search
      if (search && allFields.includes('title')) {
        conditions.push(`(title ILIKE $${paramIdx} OR description ILIKE $${paramIdx++})`);
        params.push(`%${search}%`);
      } else if (search && allFields.includes('name')) {
        conditions.push(`name ILIKE $${paramIdx++}`);
        params.push(`%${search}%`);
      }

      const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const countResult = await query(`SELECT COUNT(*) FROM ${table} ${where}`, params);
      const total = parseInt(countResult.rows[0].count);

      params.push(limit, offset);
      const dataResult = await query(
        `SELECT ${allCols} FROM ${table} ${where} ORDER BY id DESC LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
        params
      );

      return res.json({
        success: true,
        data: dataResult.rows,
        pagination: paginationResponse(total, page, limit),
      });
    } catch (err) {
      console.error(`GET ${table} error:`, err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // GET by ID
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const result = await query(`SELECT ${allCols} FROM ${table} WHERE id = $1`, [req.params.id]);
      if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Not found' });
      return res.json({ success: true, data: result.rows[0] });
    } catch {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // POST (admin)
  router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
      const body = req.body;
      const keys = Object.keys(body).filter(k => allFields.includes(k));
      if (keys.length === 0) return res.status(400).json({ success: false, message: 'No valid fields' });
      const values = keys.map(k => body[k]);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      const result = await query(
        `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING ${allCols}`,
        values
      );
      return res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      console.error(`POST ${table} error:`, err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // PATCH (admin)
  router.patch('/:id', authenticate, async (req: AuthRequest, res: Response) => {
    try {
      const body = req.body;
      const keys = Object.keys(body).filter(k => allFields.includes(k));
      if (keys.length === 0) return res.status(400).json({ success: false, message: 'No valid fields' });
      const values = keys.map(k => body[k]);
      const setParts = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
      values.push(req.params.id);
      const result = await query(
        `UPDATE ${table} SET ${setParts}, updated_at = NOW() WHERE id = $${values.length} RETURNING ${allCols}`,
        values
      ).catch(() =>
        // If no updated_at column, try without it
        query(`UPDATE ${table} SET ${setParts} WHERE id = $${values.length} RETURNING ${allCols}`, values)
      );
      if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Not found' });
      return res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      console.error(`PATCH ${table} error:`, err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // DELETE (admin)
  router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
    try {
      const result = await query(`DELETE FROM ${table} WHERE id = $1 RETURNING id`, [req.params.id]);
      if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Not found' });
      return res.json({ success: true, message: 'Deleted' });
    } catch {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  return router;
}

// --- Specific entity field definitions ---
export const startupsRouter = crudRouter(
  'startups',
  ['id', 'name', 'logo_url', 'description', 'founder_name', 'industry', 'stage', 'year', 'current_status', 'impact', 'is_published', 'created_at'],
  ['id', 'name', 'slug', 'logo_url', 'description', 'problem', 'solution', 'founder_name', 'department', 'industry', 'stage', 'year', 'founder_type', 'support_received', 'current_status', 'impact', 'external_url', 'is_published', 'created_at', 'updated_at'],
  ['industry', 'stage', 'founder_type', 'is_published']
);

export const iprRouter = crudRouter(
  'ipr_records',
  ['id', 'title', 'applicant_name', 'department', 'ipr_type', 'year', 'status', 'is_published'],
  ['id', 'title', 'applicant_name', 'department', 'ipr_type', 'year', 'status', 'description', 'is_published', 'created_at'],
  ['ipr_type', 'status', 'is_published']
);

export const mentorsRouter = crudRouter(
  'mentors',
  ['id', 'name', 'photo_url', 'designation', 'organization', 'expertise', 'bio', 'domain', 'is_available', 'is_published'],
  ['id', 'name', 'photo_url', 'designation', 'organization', 'expertise', 'bio', 'domain', 'is_available', 'is_published', 'created_at'],
  ['domain', 'is_available', 'is_published']
);

export const programsRouter = crudRouter(
  'programs',
  ['id', 'title', 'description', 'date', 'location', 'eligibility', 'registration_status', 'registration_link', 'image_url', 'status', 'created_at'],
  ['id', 'title', 'description', 'date', 'location', 'eligibility', 'registration_status', 'registration_link', 'image_url', 'outcome', 'status', 'created_at'],
  ['status', 'registration_status']
);

export const eventsRouter = crudRouter(
  'events',
  ['id', 'title', 'date', 'time', 'venue', 'description', 'category', 'registration_status', 'registration_link', 'photo_urls', 'status', 'created_at'],
  ['id', 'title', 'date', 'time', 'venue', 'description', 'category', 'registration_status', 'registration_link', 'photo_urls', 'report_url', 'status', 'created_at'],
  ['category', 'status', 'registration_status']
);

export const opportunitiesRouter = crudRouter(
  'opportunities',
  ['id', 'title', 'organization', 'category', 'deadline', 'eligibility', 'description', 'external_link', 'status', 'created_at'],
  ['id', 'title', 'organization', 'category', 'deadline', 'eligibility', 'description', 'external_link', 'status', 'created_at'],
  ['category', 'status']
);

export const partnersRouter = crudRouter(
  'partners',
  ['id', 'name', 'logo_url', 'category', 'description', 'website', 'is_published'],
  ['id', 'name', 'logo_url', 'category', 'description', 'website', 'is_published', 'created_at'],
  ['category', 'is_published']
);

export const storiesRouter = crudRouter(
  'success_stories',
  ['id', 'title', 'problem', 'idea', 'solution', 'founder_name', 'current_stage', 'impact', 'photo_url', 'status', 'created_at'],
  ['id', 'title', 'problem', 'idea', 'solution', 'founder_name', 'team', 'ppsu_support', 'development_journey', 'current_stage', 'impact', 'photo_url', 'startup_id', 'status', 'created_at'],
  ['status']
);

export const resourcesRouter = crudRouter(
  'resources',
  ['id', 'title', 'description', 'category', 'file_url', 'external_url', 'file_type', 'status', 'created_at'],
  ['id', 'title', 'description', 'category', 'file_url', 'external_url', 'file_type', 'status', 'created_at'],
  ['category', 'status']
);
