export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}
