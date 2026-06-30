import type { AuthUser } from "../types/auth";

const TOKEN_KEY = "AuthToken";
const LAST_ACTIVITY_KEY = "lastActivity";

interface JwtPayload {
  userId?: number;
  email?: string;
  role?: AuthUser["role"];
  exp?: number;
  nickname:string;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payloadPart = token.split(".")[1];

    if (!payloadPart) {
      return null;
    }

    // JWT uses Base64URL, while atob expects standard Base64.
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");

    return JSON.parse(atob(base64)) as JwtPayload;
  } catch {
    return null;
  }
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  updateLastActivity();
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function clearAuthStorage(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LAST_ACTIVITY_KEY);
}

export function updateLastActivity(): void {
  localStorage.setItem(LAST_ACTIVITY_KEY,Date.now().toString());
}

export function getLastActivity(): number | null {
  const value = localStorage.getItem(LAST_ACTIVITY_KEY);

  if (!value) {
    return null;
  }

  const timestamp = Number(value);

  return Number.isNaN(timestamp) ? null : timestamp;
}

export function getUserFromToken(): AuthUser | null {
  const token = getToken();

  if (!token) {
    return null;
  }

  const payload = decodeJwtPayload(token);

  if (
    !payload ||
    !payload.userId ||
    !payload.email ||
    !payload.role || 
    !payload.exp
  ) {
    removeToken();
    return null;
  }

  const expiresAt = payload.exp * 1000;

  // exp is in seconds in a JWT; Date.now() is milliseconds.
  if (Date.now() >= expiresAt) {
    clearAuthStorage();
    return null;
  }

  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    nickname:payload.nickname,
    expiresAt,
  };
}
