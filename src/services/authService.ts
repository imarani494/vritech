import { apiClient } from '@/lib/api/client';
import { AuthResponse, LoginCredentials, User } from '@/types/auth';

export const authService = {
  /**
   * Authenticate user against Fake Store API login endpoint
   */
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const response = await apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: {
        username: credentials.username,
        password: credentials.password || '83r5^_', // Default FakeStore API demo password if omitted
      },
    });

    if (!response.token) {
      throw new Error('Invalid login response from authentication server');
    }

    // Construct user object based on authenticated username
    const user: User = {
      id: 1,
      username: credentials.username,
      email: `${credentials.username}@fakestore.com`,
    };

    return {
      token: response.token,
      user,
    };
  },
};
