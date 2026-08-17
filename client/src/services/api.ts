import axios from '@/lib/axios';

const paginate = (params: any) => ({
  page: params?.page || 1,
  limit: params?.limit || 15,
  ...(params?.search && { search: params.search }),
  ...(params?.industry && { industry: params.industry }),
  ...(params?.stage && { stage: params.stage }),
  ...(params?.founder_type && { founder_type: params.founder_type }),
  ...(params?.ipr_type && { ipr_type: params.ipr_type }),
  ...(params?.domain && { domain: params.domain }),
  ...(params?.category && { category: params.category }),
  ...(params?.status && { status: params.status }),
  ...(params?.is_published !== undefined && { is_published: params.is_published }),
});

// Generic CRUD service factory
function crudService(path: string) {
  return {
    list: (params?: any) => axios.get(path, { params: paginate(params) }),
    get: (id: number) => axios.get(`${path}/${id}`),
    create: (data: any) => axios.post(path, data),
    update: (id: number, data: any) => axios.patch(`${path}/${id}`, data),
    delete: (id: number) => axios.delete(`${path}/${id}`),
  };
}

export const startupService = crudService('/api/startups');
export const iprService = crudService('/api/ipr');
export const mentorService = crudService('/api/mentors');
export const programService = crudService('/api/programs');
export const eventService = crudService('/api/events');
export const opportunityService = crudService('/api/opportunities');
export const partnerService = crudService('/api/partners');
export const storyService = crudService('/api/stories');
export const resourceService = crudService('/api/resources');

// Auth
export const authService = {
  login: (data: any) => axios.post('/api/auth/login', data),
  logout: () => axios.post('/api/auth/logout'),
  me: () => axios.get('/api/auth/me'),
};

// Impact
export const impactService = {
  get: () => axios.get('/api/impact'),
  update: (data: any) => axios.patch('/api/impact', data),
};

// Submissions
export const submissionService = {
  submitIdea: (data: any) => axios.post('/api/ideas', data),
  submitIncubation: (data: any) => axios.post('/api/incubation', data),
  submitIprRequest: (data: any) => axios.post('/api/ipr-requests', data),
  submitMentorRequest: (data: any) => axios.post('/api/mentor-requests', data),
  submitPartnership: (data: any) => axios.post('/api/partnerships', data),
  sendContact: (data: any) => axios.post('/api/contact', data),
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Admin
export const adminService = {
  getDashboardStats: () => axios.get('/api/admin/dashboard'),
  listIdeas: (params?: any) => axios.get('/api/admin/ideas', { params: paginate(params) }),
  updateIdeaStatus: (id: number, status: string) => axios.patch(`/api/admin/ideas/${id}/status`, { status }),
  listIncubation: (params?: any) => axios.get('/api/admin/incubation', { params: paginate(params) }),
  updateIncubationStatus: (id: number, status: string) => axios.patch(`/api/admin/incubation/${id}/status`, { status }),
  listMentorRequests: (params?: any) => axios.get('/api/admin/mentor-requests', { params: paginate(params) }),
  updateMentorRequestStatus: (id: number, status: string) => axios.patch(`/api/admin/mentor-requests/${id}/status`, { status }),
  listIprRequests: (params?: any) => axios.get('/api/admin/ipr-requests', { params: paginate(params) }),
  updateIprRequestStatus: (id: number, status: string) => axios.patch(`/api/admin/ipr-requests/${id}/status`, { status }),
  listPartnerships: (params?: any) => axios.get('/api/admin/partnerships', { params: paginate(params) }),
};
