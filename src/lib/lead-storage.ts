import type { QuoteFormValues } from "./quote-schema";

export function isLeadStorageConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

interface PersistLeadResult {
  ok: boolean;
  id?: string;
}

/**
 * Persists a lead to the `leads` table via a Supabase Edge Function, so
 * submissions aren't lost while email delivery is unconfigured (or if it
 * fails). The Edge Function holds the service-role key internally — this
 * app only ever uses the public anon key to invoke it.
 */
export async function persistLead(
  data: Omit<QuoteFormValues, "companyWebsite">,
  deliveryStatus: "not_configured" | "delivered" | "failed"
): Promise<PersistLeadResult> {
  const supabaseUrl = process.env.SUPABASE_URL as string;
  const anonKey = process.env.SUPABASE_ANON_KEY as string;

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/submit-lead`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, deliveryStatus }),
    });

    if (!response.ok) return { ok: false };
    const body = await response.json();
    return { ok: Boolean(body.ok), id: body.id };
  } catch {
    return { ok: false };
  }
}
