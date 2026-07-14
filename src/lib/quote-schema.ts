import { z } from "zod";

const CUSTOMER_TYPE_VALUES = ["residential", "commercial"] as const;
const LOAD_SIZE_VALUES = [
  "few-items",
  "quarter-load",
  "half-load",
  "full-load",
  "multiple-loads",
] as const;

export const customerTypeOptions: { value: (typeof CUSTOMER_TYPE_VALUES)[number]; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

export const loadSizeOptions: { value: (typeof LOAD_SIZE_VALUES)[number]; label: string }[] = [
  { value: "few-items", label: "A few items" },
  { value: "quarter-load", label: "Quarter load" },
  { value: "half-load", label: "Half load" },
  { value: "full-load", label: "Full load" },
  { value: "multiple-loads", label: "Multiple loads / large project" },
];

const usZip = /^\d{5}(-\d{4})?$/;
// Loose but effective: 10-15 digits after stripping non-digit characters.
const phoneDigits = (value: string) => value.replace(/\D/g, "");

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

export const quoteFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(100, "Name is too long."),
    phone: z.preprocess(
      emptyToUndefined,
      z
        .string()
        .trim()
        .refine((v) => phoneDigits(v).length >= 10 && phoneDigits(v).length <= 15, {
          message: "Enter a valid phone number.",
        })
        .optional()
    ),
    email: z.preprocess(
      emptyToUndefined,
      z.string().trim().email("Enter a valid email address.").max(254).optional()
    ),
    pickupCity: z.string().trim().min(2, "Enter your pickup city.").max(100),
    pickupZip: z
      .string()
      .trim()
      .regex(usZip, "Enter a valid ZIP code."),
    customerType: z.enum(CUSTOMER_TYPE_VALUES, {
      message: "Select residential or commercial.",
    }),
    serviceType: z.string().trim().min(2, "Select a service type.").max(100),
    itemDescription: z
      .string()
      .trim()
      .min(5, "Tell us a bit about the items or material.")
      .max(2000, "Please keep the description under 2000 characters."),
    loadSize: z.enum(LOAD_SIZE_VALUES, {
      message: "Select an estimated load size.",
    }),
    preferredDate: z.preprocess(emptyToUndefined, z.string().trim().max(50).optional()),
    additionalInfo: z.preprocess(
      emptyToUndefined,
      z.string().trim().max(2000, "Please keep additional details under 2000 characters.").optional()
    ),
    consent: z.literal(true, {
      message: "You must agree before submitting a request.",
    }),
    // Honeypot: real users leave this blank. Deliberately not constrained
    // here so a filled-in value doesn't surface as a validation error —
    // the API route checks it separately and responds with a quiet,
    // generic success instead of tipping off the bot.
    companyWebsite: z.string().max(500).optional().default(""),
  })
  .refine((data) => Boolean(data.phone) || Boolean(data.email), {
    message: "Provide a phone number or an email address so we can reach you.",
    path: ["phone"],
  });

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

/** Loosely-typed shape for uncontrolled/empty form state, distinct from the
 * validated QuoteFormValues (e.g. loadSize allows "" before a selection). */
export interface QuoteFormState {
  name: string;
  phone: string;
  email: string;
  pickupCity: string;
  pickupZip: string;
  customerType: (typeof CUSTOMER_TYPE_VALUES)[number];
  serviceType: string;
  itemDescription: string;
  loadSize: (typeof LOAD_SIZE_VALUES)[number] | "";
  preferredDate: string;
  additionalInfo: string;
  consent: boolean;
  companyWebsite: string;
}

export const quoteFormDefaultValues: QuoteFormState = {
  name: "",
  phone: "",
  email: "",
  pickupCity: "",
  pickupZip: "",
  customerType: "residential",
  serviceType: "",
  itemDescription: "",
  loadSize: "",
  preferredDate: "",
  additionalInfo: "",
  consent: false,
  companyWebsite: "",
};
