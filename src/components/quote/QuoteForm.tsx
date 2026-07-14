"use client";

import { FormEvent, useId, useState } from "react";
import {
  quoteFormSchema,
  quoteFormDefaultValues,
  customerTypeOptions,
  loadSizeOptions,
  type QuoteFormState,
} from "@/lib/quote-schema";
import { services } from "@/config/services";
import { serviceAreaCityNames } from "@/config/service-areas";
import { business, hasPhone } from "@/config/business";

type FormValues = QuoteFormState;
type FieldErrors = Partial<Record<keyof FormValues, string[]>>;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const inputClasses =
  "mt-1.5 block w-full rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-base text-brand-black placeholder:text-black/35 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30";

const labelClasses = "text-sm font-semibold text-brand-black";
const errorClasses = "mt-1.5 text-sm font-medium text-red-600";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span className="text-brand-orange"> *</span>}
      </label>
      {children}
      {error?.[0] && (
        <p id={`${id}-error`} className={errorClasses} role="alert">
          {error[0]}
        </p>
      )}
    </div>
  );
}

export function QuoteForm() {
  const [values, setValues] = useState<FormValues>(quoteFormDefaultValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const datalistId = useId();

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = quoteFormSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      setSubmitState({ status: "idle" });
      const firstField = Object.keys(parsed.error.flatten().fieldErrors)[0];
      if (firstField) {
        document.getElementById(firstField)?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        setSubmitState({ status: "success" });
        setValues(quoteFormDefaultValues);
        return;
      }

      const body = await response.json().catch(() => null);

      if (response.status === 503 && body?.error === "LEAD_DELIVERY_NOT_CONFIGURED") {
        setSubmitState({
          status: "error",
          message: "Online quote delivery is being configured. Please check back shortly.",
        });
        return;
      }

      if (response.status === 429) {
        setSubmitState({
          status: "error",
          message: "You're submitting too quickly. Please wait a minute and try again.",
        });
        return;
      }

      if (response.status === 400 && body?.issues) {
        setErrors(body.issues as FieldErrors);
        setSubmitState({ status: "idle" });
        return;
      }

      setSubmitState({
        status: "error",
        message:
          "Something went wrong submitting your request. Please try again in a moment" +
          (hasPhone ? `, or call us at ${business.phoneDisplay}.` : "."),
      });
    } catch {
      setSubmitState({
        status: "error",
        message:
          "We couldn't reach the server. Check your connection and try again" +
          (hasPhone ? `, or call us at ${business.phoneDisplay}.` : "."),
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <p className="text-xl font-bold text-emerald-800">Quote request sent</p>
        <p className="mt-2 text-sm text-emerald-700">
          Thanks — we received your request and will follow up to confirm the details.
        </p>
      </div>
    );
  }

  const isSubmitting = submitState.status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {submitState.status === "error" && (
        <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {submitState.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClasses}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </Field>

        <Field id="customerType" label="Residential or commercial" required error={errors.customerType}>
          <select
            id="customerType"
            name="customerType"
            required
            className={inputClasses}
            value={values.customerType}
            onChange={(e) => update("customerType", e.target.value as FormValues["customerType"])}
          >
            {customerTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="phone" label="Phone number" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClasses}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClasses}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
      </div>

      <p className="text-xs text-brand-charcoal-light">
        Provide at least a phone number or an email address so we can reach you.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="pickupCity" label="Pickup city" required error={errors.pickupCity}>
          <input
            id="pickupCity"
            name="pickupCity"
            type="text"
            required
            aria-required="true"
            list={datalistId}
            aria-invalid={Boolean(errors.pickupCity)}
            aria-describedby={errors.pickupCity ? "pickupCity-error" : undefined}
            className={inputClasses}
            value={values.pickupCity}
            onChange={(e) => update("pickupCity", e.target.value)}
          />
          <datalist id={datalistId}>
            {serviceAreaCityNames.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </Field>

        <Field id="pickupZip" label="Pickup ZIP code" required error={errors.pickupZip}>
          <input
            id="pickupZip"
            name="pickupZip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.pickupZip)}
            aria-describedby={errors.pickupZip ? "pickupZip-error" : undefined}
            className={inputClasses}
            value={values.pickupZip}
            onChange={(e) => update("pickupZip", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="serviceType" label="Service type" required error={errors.serviceType}>
          <select
            id="serviceType"
            name="serviceType"
            required
            aria-required="true"
            className={inputClasses}
            value={values.serviceType}
            onChange={(e) => update("serviceType", e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Other">Other / not listed</option>
          </select>
        </Field>

        <Field id="loadSize" label="Estimated load size" required error={errors.loadSize}>
          <select
            id="loadSize"
            name="loadSize"
            required
            aria-required="true"
            className={inputClasses}
            value={values.loadSize}
            onChange={(e) => update("loadSize", e.target.value as FormValues["loadSize"])}
          >
            <option value="">Select a load size</option>
            {loadSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="preferredDate" label="Preferred service date" error={errors.preferredDate}>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          className={inputClasses}
          value={values.preferredDate}
          onChange={(e) => update("preferredDate", e.target.value)}
        />
      </Field>

      <Field id="itemDescription" label="What items or material need to be removed?" required error={errors.itemDescription}>
        <textarea
          id="itemDescription"
          name="itemDescription"
          required
          aria-required="true"
          rows={4}
          aria-invalid={Boolean(errors.itemDescription)}
          aria-describedby={errors.itemDescription ? "itemDescription-error" : undefined}
          className={inputClasses}
          value={values.itemDescription}
          onChange={(e) => update("itemDescription", e.target.value)}
        />
      </Field>

      <Field id="additionalInfo" label="Additional details" error={errors.additionalInfo}>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          rows={3}
          aria-invalid={Boolean(errors.additionalInfo)}
          aria-describedby={errors.additionalInfo ? "additionalInfo-error" : undefined}
          className={inputClasses}
          placeholder="Access notes, stairs, gate codes, etc."
          value={values.additionalInfo}
          onChange={(e) => update("additionalInfo", e.target.value)}
        />
      </Field>

      {/* Honeypot field — hidden from sighted and keyboard users, left for bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="companyWebsite">Leave this field blank</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(e) => update("companyWebsite", e.target.value)}
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-brand-charcoal-light">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-4 w-4 rounded border-black/30 text-brand-orange focus:ring-brand-orange"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
          />
          <span>
            I agree to be contacted about this request and have read the{" "}
            <a href="/privacy" className="font-semibold text-brand-orange hover:underline">
              Privacy Policy
            </a>
            . *
          </span>
        </label>
        {errors.consent?.[0] && (
          <p id="consent-error" className={errorClasses} role="alert">
            {errors.consent[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <svg aria-hidden="true" className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Quote Request"
        )}
      </button>
    </form>
  );
}
