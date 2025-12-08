import type { AuthMethods, User } from "./types";

/**
 * Demo implementation of auth methods
 * Replace this with your actual API calls
 */
export const authMethods: AuthMethods = {
  getCurrentUser: async (): Promise<User | null> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user is logged in (e.g., token in localStorage)
    const token = localStorage.getItem("auth-token");
    if (!token) {
      return null;
    }

    // Return mock user
    return {
      id: "1",
      username: "demo_user",
      displayName: "Demo User",
      pictureUrl: "/icon.png",
    };
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Clear token
    localStorage.removeItem("auth-token");
  },

  refresh: async (): Promise<string> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    const oldToken = localStorage.getItem("auth-token");
    if (!oldToken) {
      throw new Error("No token found");
    }

    // Return new access token
    const newToken = "mock-jwt-access-token-" + Date.now();
    localStorage.setItem("auth-token", newToken);

    return newToken;
  },
};
