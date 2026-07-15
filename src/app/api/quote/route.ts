import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/quote-schema";
import { sanitizeSingleLine, sanitizeMultiLine } from "@/lib/sanitize";
import { checkRateLimit } from "@/lib/rate-limit";
import { isLeadDeliveryConfigured, deliverLead } from "@/lib/lead-delivery";
import { persistLead } from "@/lib/lead-storage";

const MAX_BODY_BYTES = 20_000;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function logSafe(event: string, fields: Record<string, string | number | boolean>) {
  console.log(JSON.stringify({ event, ts: new Date().toISOString(), ...fields }));
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    logSafe("quote_submission_rejected", { reason: "payload_too_large" });
    return NextResponse.json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    logSafe("quote_submission_rejected", { reason: "rate_limited" });
    return NextResponse.json(
      { ok: false, error: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = quoteFormSchema.safeParse(body);
  if (!parsed.success) {
    logSafe("quote_submission_rejected", { reason: "validation_failed" });
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: bots that fill hidden fields get a quiet, generic success
  // response so they don't learn the field is a trap.
  if (data.companyWebsite) {
    logSafe("quote_submission_honeypot", {});
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const sanitized = {
    ...data,
    name: sanitizeSingleLine(data.name),
    phone: data.phone ? sanitizeSingleLine(data.phone) : undefined,
    email: data.email ? sanitizeSingleLine(data.email) : undefined,
    pickupCity: sanitizeSingleLine(data.pickupCity),
    pickupZip: sanitizeSingleLine(data.pickupZip),
    serviceType: sanitizeSingleLine(data.serviceType),
    preferredDate: data.preferredDate ? sanitizeSingleLine(data.preferredDate) : undefined,
    itemDescription: sanitizeMultiLine(data.itemDescription),
    additionalInfo: data.additionalInfo ? sanitizeMultiLine(data.additionalInfo) : undefined,
  };

  // Persist first so a submission is never lost, regardless of whether
  // email delivery is configured or succeeds. Best-effort: a storage
  // failure is logged but never changes the response contract below.
  async function persistSafely(status: "not_configured" | "delivered" | "failed") {
    const result = await persistLead(sanitized, status);
    logSafe("quote_submission_persisted", { ok: result.ok, status });
  }

  if (!isLeadDeliveryConfigured()) {
    await persistSafely("not_configured");
    logSafe("quote_submission_delivery_not_configured", {
      serviceType: data.serviceType,
      customerType: data.customerType,
    });
    return NextResponse.json(
      { ok: false, error: "LEAD_DELIVERY_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  try {
    const result = await deliverLead(sanitized);
    if (!result.ok) {
      await persistSafely("failed");
      logSafe("quote_submission_delivery_failed", { status: result.status });
      return NextResponse.json({ ok: false, error: "DELIVERY_FAILED" }, { status: 502 });
    }
  } catch {
    await persistSafely("failed");
    logSafe("quote_submission_delivery_error", {});
    return NextResponse.json({ ok: false, error: "DELIVERY_FAILED" }, { status: 502 });
  }

  await persistSafely("delivered");
  logSafe("quote_submission_delivered", {
    serviceType: data.serviceType,
    customerType: data.customerType,
  });
  return NextResponse.json({ ok: true }, { status: 200 });
}
