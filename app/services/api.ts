"use server";

import { getAccessToken } from "@/lib/session";
import { refreshTokenAction } from "@/app/(auth)/_actions/authActions";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { body?: unknown } = {},
): Promise<T> {
  let token = await getAccessToken();

  // Normalize path to ensure no leading slash duplicate
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  const doFetch = (accessToken: string | null) =>
    fetch(`${API_URL}/${cleanPath}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers,
      },
      body:
        typeof options.body === "string"
          ? options.body
          : options.body !== undefined
            ? JSON.stringify(options.body)
            : undefined,
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
