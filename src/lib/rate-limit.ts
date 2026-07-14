import { createHmac } from "node:crypto";

/**
 * Best-effort in-memory rate limiter, scoped to a single serverless
 * instance. It stops naive repeat submissions from one instance but does
 * NOT provide distributed rate limiting across Vercel's serverless
 * instances — for that, back this with a shared store (e.g. Upstash
 * Redis / Vercel KV) before relying on it against a real attacker.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function hashKey(ip: string): string {
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!secret) {
    // No secret configured: still rate-limit by IP, just without hashing.
    return ip;
  }
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const key = hashKey(ip);
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const recent = (hits.get(key) ?? []).filter((ts) => ts > windowStart);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestInWindow = recent[0];
    const retryAfterSeconds = Math.ceil((oldestInWindow + WINDOW_MS - now) / 1000);
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) };
  }

  recent.push(now);
  hits.set(key, recent);
  return { allowed: true };
}
