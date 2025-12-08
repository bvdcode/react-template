/**
 * User information interface
 */
export interface User {
  id: string;
  username: string;
  pictureUrl?: string;
  displayName?: string;
}

/**
 * Authentication methods that need to be implemented
 */
export interface AuthMethods {
  /**
   * Get current user information
   * @returns User object or null if not authenticated
   */
  getCurrentUser: () => Promise<User | null>;

  /**
   * Logout current user
   */
  logout: () => Promise<void>;

  /**
   * Refresh authentication token/session
   * @returns New access token
   */
  refresh: () => Promise<string>;
}

/**
 * Auth context state
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  accessToken: string | null;
}

/**
 * Auth context value with state and actions
 */
export interface AuthContextValue extends AuthState {
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
}
