import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  admin?: { id: number; username: string; email: string };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Server error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
}

export function paginate(req: Request) {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 15));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export function paginationResponse(total: number, page: number, limit: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
