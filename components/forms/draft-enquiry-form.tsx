"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cloneElement, isValidElement, useRef, useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, ArrowRight, CheckCircle2, ImagePlus, Loader2 } from "lucide-react";

import { submitEnquiry } from "@/app/actions/enquiries";
import { track } from "@/components/analytics/track";
import { tradeOptions } from "@/lib/trades";
import { cn } from "@/lib/utils";
import { enquirySchema } from "@/lib/validators/enquiry";

type FormValues = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  trade: string;
  location: string;
  existingWebsite: string;
  description: string;
  services: string;
  preferredColours: string;
  additionalInformation: string;
};

const empty: FormValues = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  trade: "",
  location: "",
  existingWebsite: "",
  description: "",
  services: "",
  preferredColours: "",
  additionalInformation: "",
};

const inputClass =
  "mt-2 block w-full rounded-xl border border-input bg-background px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-shadow focus:border-ember focus:outline-none focus:ring-4 focus:ring-ring/40 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/15";

export function DraftEnquiryForm() {
  const started = useRef(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: empty,
  });

  function onFocus() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "draft" });
  }

  async function onSubmit(values: FormValues, event?: BaseSyntheticEvent) {
    setFormError(null);
    const formElement = event?.target;
    if (!(formElement instanceof HTMLFormElement)) return;

    const formData = new FormData(formElement);
    (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
      formData.set(key, values[key]);
    });

    const result = await submitEnquiry(formData);
    if (!result.ok) {
      track("form_submit_error", { form: "draft" });
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([key, message]) => {
          if (message) setError(key as keyof FormValues, { message });
        });
      }
      setFormError(result.message ?? "Please check the form and try again.");
      return;
    }

    track("form_submit_success", { form: "draft" });
    setSuccess(result.message ?? "Thanks. We have your request.");
  }

  if (success) {
    return (
      <div role="status" className="py-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft">
          <CheckCircle2 aria-hidden className="size-7 text-brand" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">Request received.</h2>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground">{success}</p>
        <p className="mt-6 text-sm text-muted-foreground">Keep an eye on your inbox, including the spam folder.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={onFocus} noValidate>
      {formError ? (
        <div
          role="alert"
          className="mb-8 flex gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {formError}
        </div>
      ) : null}

      <div className="divide-y divide-border">
      <FormSection step="1" title="About you">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" error={errors.name?.message} htmlFor="name">
            <input id="name" className={inputClass} autoComplete="name" {...register("name")} />
          </Field>
          <Field label="Business name" error={errors.businessName?.message} htmlFor="businessName">
            <input id="businessName" className={inputClass} autoComplete="organization" {...register("businessName")} />
          </Field>
          <Field label="Email" error={errors.email?.message} htmlFor="email">
            <input id="email" type="email" className={inputClass} autoComplete="email" {...register("email")} />
          </Field>
          <Field label="Phone" error={errors.phone?.message} htmlFor="phone">
            <input id="phone" type="tel" className={inputClass} autoComplete="tel" {...register("phone")} />
          </Field>
        </div>
      </FormSection>

      <FormSection step="2" title="Your business">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Trade" error={errors.trade?.message} htmlFor="trade">
            <select id="trade" className={inputClass} {...register("trade")}>
              <option value="">Choose a trade</option>
              {tradeOptions.map((trade) => (
                <option key={trade.value} value={trade.value}>
                  {trade.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Where you work" error={errors.location?.message} htmlFor="location">
            <input id="location" className={inputClass} placeholder="e.g. Hamilton" {...register("location")} />
          </Field>
        </div>
        <Field label="About the business" error={errors.description?.message} htmlFor="description">
          <textarea
            id="description"
            rows={4}
            className={inputClass}
            placeholder="How long you've been going, the kind of jobs you do, what makes you different."
            {...register("description")}
          />
        </Field>
        <Field label="Services you offer" error={errors.services?.message} htmlFor="services">
          <textarea
            id="services"
            rows={3}
            className={inputClass}
            placeholder="e.g. Switchboard upgrades, lighting, EV chargers"
            {...register("services")}
          />
        </Field>
        <Field label="Existing website" optional error={errors.existingWebsite?.message} htmlFor="existingWebsite">
          <input id="existingWebsite" className={inputClass} placeholder="https://" {...register("existingWebsite")} />
        </Field>
      </FormSection>

      <FormSection step="3" title="Look and feel" optional>
        <Field label="Preferred colours" optional error={errors.preferredColours?.message} htmlFor="preferredColours">
          <input
            id="preferredColours"
            className={inputClass}
            placeholder="e.g. Navy and yellow, or match my van"
            {...register("preferredColours")}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <UploadBox
            id="logo"
            name="logo"
            label="Logo"
            hint="JPG, PNG or WebP · up to 2 MB"
            status={logoName}
            onChange={(files) => setLogoName(files?.[0]?.name ?? null)}
          />
          <UploadBox
            id="photos"
            name="photos"
            label="Job photos"
            hint="Up to 6 · 5 MB each"
            multiple
            status={photoCount > 0 ? `${photoCount} photo${photoCount === 1 ? "" : "s"} selected` : null}
            onChange={(files) => setPhotoCount(files?.length ?? 0)}
          />
        </div>
        <Field
          label="Anything else we should know"
          optional
          error={errors.additionalInformation?.message}
          htmlFor="additionalInformation"
        >
          <textarea id="additionalInformation" rows={3} className={inputClass} {...register("additionalInformation")} />
        </Field>
      </FormSection>
      </div>

      <div hidden>
        <label htmlFor="company_fax">Company fax</label>
        <input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-8 inline-flex h-13 w-full items-center justify-center gap-2 bg-ember-button rounded-full py-4 text-[15px] font-semibold text-night transition-all duration-300 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" /> Sending your request…
          </>
        ) : (
          <>
            Get my free website draft
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Free and no obligation. We&apos;ll only use your details to prepare and discuss your draft.
      </p>
    </form>
  );
}

function FormSection({
  step,
  title,
  optional,
  children,
}: {
  step: string;
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="py-8 first:pt-0 last:pb-0">
      <fieldset>
        <legend className="flex w-full items-center gap-3">
          <span className="grid size-6 place-items-center rounded-full bg-night font-mono text-[11px] text-primary-foreground">
            {step}
          </span>
          <span className="text-lg font-semibold tracking-tight">{title}</span>
          {optional ? <span className="text-sm text-muted-foreground">Optional</span> : null}
        </legend>
        <div className="mt-6 space-y-5">{children}</div>
      </fieldset>
    </div>
  );
}

function UploadBox({
  id,
  name,
  label,
  hint,
  multiple,
  status,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  hint: string;
  multiple?: boolean;
  status: string | null;
  onChange: (files: FileList | null) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center transition-colors hover:border-foreground/40 hover:bg-surface has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ring/40",
        status ? "border-brand bg-brand-soft/40" : "border-input",
      )}
    >
      <ImagePlus aria-hidden className={cn("size-5", status ? "text-brand" : "text-muted-foreground")} />
      <span className="mt-2 text-sm font-medium">{status ?? label}</span>
      <span className="mt-0.5 text-xs text-muted-foreground">{hint}</span>
      <input
        id={id}
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        className="sr-only"
        onChange={(event) => onChange(event.currentTarget.files)}
      />
    </label>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  const describedBy = error ? `${htmlFor}-error` : undefined;
  const control = isValidElement<{ "aria-invalid"?: boolean; "aria-describedby"?: string }>(children)
    ? cloneElement(children, {
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm font-medium">
        {label}
        {optional ? <span className="text-xs font-normal text-muted-foreground">Optional</span> : null}
      </label>
      {control}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle aria-hidden className="size-3.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
