import config from '../../config';

export const authService = {
  checkAuth: async () => {
    const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.me}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Auth check failed');
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.logout}`, {
      method: 'POST',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Logout failed');
    return response.json();
  }
};