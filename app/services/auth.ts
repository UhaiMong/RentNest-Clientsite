import { apiRequest } from "./api";

export type UserRole = "TENANT" | "LANDLORD";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  register(payload: RegisterPayload) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  login(payload: LoginPayload) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  logout() {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  },

  me() {
    return apiRequest("/auth/me");
  },
};
