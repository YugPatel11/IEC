import { Router, Request, Response } from 'express';
import { query } from '../db/pool';
import { authenticate, AuthRequest, paginate, paginationResponse } from '../middleware/auth';

const router = Router();

// --- Impact Metrics ---
router.get('/impact', async (_req, res) => {
  const r = await query('SELECT * FROM impact_metrics LIMIT 1');
  return res.json({ success: true, data: r.rows[0] || null });
});

router.patch('/impact', authenticate, async (req: AuthRequest, res: Response) => {
  const body = req.body;
  const fields = ['startups_supported', 'ipr_supported', 'students_reached', 'mentoring_sessions', 'programs_conducted', 'funding_supported', 'industry_partners', 'mentors'];
  const keys = Object.keys(body).filter(k => fields.includes(k));
  if (keys.length === 0) return res.status(400).json({ success: false, message: 'No valid fields' });
  const values = keys.map(k => body[k]);
  const setParts = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
  values.push(new Date().toISOString());
  const r = await query(
    `UPDATE impact_metrics SET ${setParts}, updated_at = $${values.length} RETURNING *`,
    values
  );
  return res.json({ success: true, data: r.rows[0] });
});

// --- Submissions ---
function submissionPost(table: string, fields: string[]) {
  return async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const keys = fields.filter(k => body[k] !== undefined);
      const values = keys.map(k => body[k]);
      const ph = keys.map((_, i) => `$${i + 1}`).join(', ');
      const r = await query(`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${ph}) RETURNING id`, values);
      return res.status(201).json({ success: true, data: r.rows[0] });
    } catch (err) {
      console.error(`POST ${table}:`, err);
      return res.status(500).json({ success: false, message: 'Submission failed' });
    }
  };
}

router.post('/ideas', submissionPost('ideas', ['name', 'email', 'mobile', 'user_type', 'department', 'idea_title', 'problem', 'proposed_solution', 'current_stage', 'team_members', 'document_url']));
router.post('/incubation', submissionPost('incubation_applications', ['founder_name', 'team_info', 'startup_name', 'problem', 'solution', 'target_users', 'business_model', 'current_stage', 'prototype_status', 'ipr_status', 'funding_status', 'pitch_deck_url', 'email', 'phone']));
router.post('/ipr-requests', submissionPost('ipr_requests', ['applicant_name', 'department', 'ipr_type', 'title', 'description', 'existing_disclosure', 'document_url', 'email', 'phone']));
router.post('/mentor-requests', submissionPost('mentor_requests', ['name', 'email', 'area_of_help', 'startup_stage', 'problem', 'preferred_domain', 'availability']));
router.post('/partnerships', submissionPost('partnerships', ['name', 'organization', 'email', 'phone', 'org_type', 'partnership_area', 'message']));
router.post('/contact', submissionPost('contact_messages', ['name', 'email', 'phone', 'user_type', 'subject', 'message']));

// --- Admin Submission Lists ---
function submissionList(table: string, cols: string, statusCol = 'status') {
  return async (req: Request, res: Response) => {
    const { page, limit, offset } = paginate(req);
    const r = await query(`SELECT ${cols} FROM ${table} ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [limit, offset]);
    const total = (await query(`SELECT COUNT(*) FROM ${table}`)).rows[0].count;
    return res.json({ success: true, data: r.rows, pagination: paginationResponse(parseInt(total), page, limit) });
  };
}

router.get('/admin/ideas', authenticate, submissionList('ideas', 'id, name, email, mobile, user_type, department, idea_title, current_stage, status, created_at'));
router.get('/admin/incubation', authenticate, submissionList('incubation_applications', 'id, founder_name, startup_name, email, phone, current_stage, status, created_at'));
router.get('/admin/ipr-requests', authenticate, submissionList('ipr_requests', 'id, applicant_name, department, ipr_type, title, email, status, created_at'));
router.get('/admin/mentor-requests', authenticate, submissionList('mentor_requests', 'id, name, email, preferred_domain, startup_stage, status, created_at'));
router.get('/admin/partnerships', authenticate, submissionList('partnerships', 'id, name, organization, email, org_type, partnership_area, status, created_at'));
router.get('/admin/contact', authenticate, submissionList('contact_messages', 'id, name, email, subject, created_at'));

// --- Admin Status Updates ---
function statusUpdate(table: string) {
  return async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: 'Status required' });
    const r = await query(`UPDATE ${table} SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, status`, [status, id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: r.rows[0] });
  };
}

router.patch('/admin/ideas/:id/status', authenticate, statusUpdate('ideas'));
router.patch('/admin/incubation/:id/status', authenticate, statusUpdate('incubation_applications'));
router.patch('/admin/ipr-requests/:id/status', authenticate, statusUpdate('ipr_requests'));
router.patch('/admin/mentor-requests/:id/status', authenticate, statusUpdate('mentor_requests'));

// --- Admin Dashboard Stats ---
router.get('/admin/dashboard', authenticate, async (_req, res) => {
  try {
    const tables = ['startups', 'ipr_records', 'ideas', 'incubation_applications', 'mentor_requests', 'ipr_requests', 'partnerships', 'programs', 'events', 'opportunities', 'mentors', 'partners', 'success_stories', 'resources'];
    const counts = await Promise.all(tables.map(t => query(`SELECT COUNT(*) FROM ${t}`)));
    const pending = await Promise.all([
      query(`SELECT COUNT(*) FROM ideas WHERE status = 'Submitted'`),
      query(`SELECT COUNT(*) FROM incubation_applications WHERE status = 'Submitted'`),
      query(`SELECT COUNT(*) FROM mentor_requests WHERE status = 'Submitted'`),
    ]);

    return res.json({
      success: true,
      data: {
        startups: parseInt(counts[0].rows[0].count),
        ipr: parseInt(counts[1].rows[0].count),
        ideas: parseInt(counts[2].rows[0].count),
        incubation: parseInt(counts[3].rows[0].count),
        mentorRequests: parseInt(counts[4].rows[0].count),
        iprRequests: parseInt(counts[5].rows[0].count),
        partnerships: parseInt(counts[6].rows[0].count),
        programs: parseInt(counts[7].rows[0].count),
        events: parseInt(counts[8].rows[0].count),
        opportunities: parseInt(counts[9].rows[0].count),
        mentors: parseInt(counts[10].rows[0].count),
        partners: parseInt(counts[11].rows[0].count),
        stories: parseInt(counts[12].rows[0].count),
        resources: parseInt(counts[13].rows[0].count),
        pendingIdeas: parseInt(pending[0].rows[0].count),
        pendingIncubation: parseInt(pending[1].rows[0].count),
        pendingMentorReq: parseInt(pending[2].rows[0].count),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to load stats' });
  }
});

export default router;
