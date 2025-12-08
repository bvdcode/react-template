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
   * Login user with credentials
   * @param credentials - Login credentials (flexible object)
   * @returns User object on success
   */
  login: (credentials: unknown) => Promise<User>;

  /**
   * Logout current user
   */
  logout: () => Promise<void>;

  /**
   * Refresh authentication token/session
   * @returns User object on success
   */
  refresh: () => Promise<User>;
}

/**
 * Auth context state
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

/**
 * Auth context value with state and actions
 */
export interface AuthContextValue extends AuthState {
  login: (credentials: unknown) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}
