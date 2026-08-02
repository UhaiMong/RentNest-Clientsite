export type TokenPayload = {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  [key: string]: unknown;
};

export function decodeJwt(token: string): TokenPayload | null {
  try {
    const payload = token.split(".")[1];
    const json = Buffer.from(payload, "base64").toString("utf-8");
    return JSON.parse(json) as TokenPayload;
  } catch {
    return null;
  }
}
