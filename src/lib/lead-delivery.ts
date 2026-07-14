import type { QuoteFormValues } from "./quote-schema";

export function isLeadDeliveryConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.LEAD_DESTINATION_EMAIL && process.env.LEAD_FROM_EMAIL
  );
}

interface DeliverLeadResult {
  ok: boolean;
  status: number;
}

/**
 * Sends the lead via the Resend REST API. Only called once
 * `isLeadDeliveryConfigured()` is true, so env vars are non-null here.
 */
export async function deliverLead(
  data: Omit<QuoteFormValues, "companyWebsite">
): Promise<DeliverLeadResult> {
  const apiKey = process.env.RESEND_API_KEY as string;
  const to = process.env.LEAD_DESTINATION_EMAIL as string;
  const from = process.env.LEAD_FROM_EMAIL as string;

  const lines = [
    `New quote request — AA Dump Removal`,
    ``,
    `Name: ${data.name}`,
    `Phone: ${data.phone ?? "(not provided)"}`,
    `Email: ${data.email ?? "(not provided)"}`,
    `Customer type: ${data.customerType}`,
    `Pickup city: ${data.pickupCity}`,
    `Pickup ZIP: ${data.pickupZip}`,
    `Service type: ${data.serviceType}`,
    `Estimated load size: ${data.loadSize}`,
    `Preferred date: ${data.preferredDate ?? "(not provided)"}`,
    ``,
    `Item/material description:`,
    data.itemDescription,
    ``,
    `Additional details:`,
    data.additionalInfo || "(none)",
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email || undefined,
      subject: `New quote request from ${data.name}`,
      text: lines.join("\n"),
    }),
  });

  return { ok: response.ok, status: response.status };
}
