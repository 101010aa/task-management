import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const taskAPI = {
    getAll: () => api.get('/tasks'),
    getById: (id) => api.get(`/tasks/${id}`),
    create: (task) => api.post('/tasks', task),
    update:(id, task) => api.put(`/tasks/${id}`, task),
    delete: (id) => api.delete(`/tasks/${id}`),
};
export default api;