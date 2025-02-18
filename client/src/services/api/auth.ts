import config from '../../config';

export const authService = {
  checkAuth: async () => {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.me}`, {
        credentials: 'include'
      });
      
      // Pro 401 rovnou vracíme null bez throw error
      if (response.status === 401) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error('Auth check failed');
      }
      
      return response.json();
    } catch (error) {
      console.error('Unexpected auth error:', error);
      return null;  // Pro všechny chyby vracíme null
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.logout}`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      
      return response.json();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};