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

  login: async (credentials: unknown): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock login logic
    const { email, password } = credentials as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Simulate successful login
    const token = "mock-jwt-token";
    localStorage.setItem("auth-token", token);

    return {
      id: "1",
      username: email,
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

  refresh: async (): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    const token = localStorage.getItem("auth-token");
    if (!token) {
      throw new Error("No token found");
    }

    // Return refreshed user
    return {
      id: "1",
      username: "demo_user",
      displayName: "Demo User",
      pictureUrl: "/icon.png",
    };
  },
};
