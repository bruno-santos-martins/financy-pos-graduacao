import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { authService } from '@/features/auth/services/authService';
import type { LoginInput, User } from '@/features/auth/types';

const TOKEN_KEY = 'financy_token';
const USER_KEY = 'financy_user';

export function useAuth() {
  const [token, setToken] = useLocalStorage<string | null>(TOKEN_KEY, null);
  const [user, setUser] = useLocalStorage<User | null>(USER_KEY, null);

  const login = async (input: LoginInput) => {
    const response = await authService.login(input);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return {
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };
}
