"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt } from "@/lib/decode-jwt";
import { dashboardPathForRole } from "@/lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ActionState = {
  success: boolean;
  message: string;
} | null;

function safeRedirectTarget(redirectTo: string | null) {
  if (
    redirectTo &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
  ) {
    return redirectTo;
  }
  return null;
}

async function storeTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
    sameSite: "lax",
    path: "/",
  });
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 * 1000,
    sameSite: "lax",
    path: "/",
  });
}

// Login action
export async function loginAction(
  redirectTo: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();

  if (!result.success) {
    return { success: false, message: result.message ?? "Login failed" };
  }

  await storeTokens(result.data.accessToken, result.data.refreshToken);

  const decoded = decodeJwt(result.data.accessToken);
  const target =
    safeRedirectTarget(redirectTo) ??
    dashboardPathForRole(decoded?.role ?? "TENANT");

  redirect(target);
}

// Register action
export async function registerAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    role: formData.get("role"),
    password: formData.get("password"),
  };

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!result.success) {
    return { success: false, message: result.message ?? "Registration failed" };
  }

  if (result.data?.accessToken) {
    await storeTokens(result.data.accessToken, result.data.refreshToken);
    const decoded = decodeJwt(result.data.accessToken);
    redirect(dashboardPathForRole(decoded?.role ?? "TENANT"));
  }

  // Otherwise just send them to log in.
  redirect("/login");
}

// Logout action
export async function logoutAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch(() => null);
  }

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/login");
}

// Refresh token
export async function refreshTokenAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return null;

  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const result = await res.json();
  if (!result.success) return null;

  await storeTokens(
    result.data.accessToken,
    result.data.refreshToken ?? refreshToken,
  );
  return result.data.accessToken as string;
}
