import { cookies } from "next/headers";
import { decodeJwt } from "./decode-jwt";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? null;
}

export async function getCurrentUser() {
  const token = await getAccessToken();
  if (!token) return null;
  return decodeJwt(token);
}

export function dashboardPathForRole(role: string) {
  if (role === "ADMIN") return "/admin-dashboard";
  if (role === "LANDLORD") return "/landlord-dashboard";
  return "/tenant-dashboard";
}
