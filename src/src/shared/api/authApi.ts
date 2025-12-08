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
};
