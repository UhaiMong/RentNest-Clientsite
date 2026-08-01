"use server";

import { getAccessToken } from "@/lib/session";
import { refreshTokenAction } from "@/app/(auth)/_actions/authActions";

const API_URL = process.env.BACKEND_API_URL;

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { body?: unknown } = {},
): Promise<T> {
  let token = await getAccessToken();

  const doFetch = (accessToken: string | null) =>
    fetch(`${API_URL}/api${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers,
      },
      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });

  let res = await doFetch(token);

  // token expired -> refresh once, retry once
  if (res.status === 401) {
    token = await refreshTokenAction();
    if (token) res = await doFetch(token);
  }

  const result = await res.json();
  if (!res.ok || result.success === false) {
    throw new Error(result.message ?? `Request failed (${res.status})`);
  }
  return result;
}
