import { httpClient, setAccessToken, clearAccessToken } from "./httpClient";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const authApi = {
  /**
   * Login with username/password
   */
  login: async (credentials: LoginRequest): Promise<string> => {
    const response = await httpClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    const token = response.data.accessToken;
    setAccessToken(token);
    return token;
  },

  /**
   * Logout - clear token
   */
  logout: async (): Promise<void> => {
    clearAccessToken();
    await httpClient.post("/auth/logout");
  },

  /**
   * Tries to refresh access token using backend refresh cookie.
   * Safe to call on app startup; errors are swallowed.
   */
  refresh: async (): Promise<void> => {
    try {
      const res = await httpClient.post<{ accessToken: string }>(
        "/auth/refresh",
        {},
      );
      const token = res.data?.accessToken;
      if (token) {
        setAccessToken(token);
      }
    } catch {
      // no active refresh cookie or refresh failed; remain unauthenticated
    }
  },
};
