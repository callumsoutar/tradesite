import { z } from "zod";

import { tradeOptions, type TradeValue } from "@/lib/trades";

const tradeValues = tradeOptions.map((trade) => trade.value);

function isTrade(value: string): value is TradeValue {
  return tradeValues.includes(value as TradeValue);
}

function isOptionalUrl(value: string) {
  if (value === "") return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  businessName: z.string().trim().min(2, "Enter your business name."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a phone number.")
    .max(30, "Enter a phone number."),
  trade: z.string().trim().refine(isTrade, "Choose your trade."),
  location: z.string().trim().min(2, "Enter the town or city you work in."),
  existingWebsite: z
    .string()
    .trim()
    .refine(isOptionalUrl, "Enter a valid website URL, including https://."),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a bit more about the business, at least a sentence.")
    .max(4000, "Please shorten the description."),
  services: z
    .string()
    .trim()
    .min(2, "List the services you offer.")
    .max(2000, "Please shorten the services list."),
  preferredColours: z.string().trim().max(200, "Please shorten the colour notes."),
  additionalInformation: z
    .string()
    .trim()
    .max(4000, "Please shorten the additional information."),
});

export type EnquiryInput = Omit<z.infer<typeof enquirySchema>, "trade"> & {
  trade: TradeValue;
};

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export function parseEnquiryInput(input: Record<string, string>): {
  data?: EnquiryInput;
  fieldErrors?: FieldErrors;
} {
  const result = enquirySchema.safeParse({
    name: input.name ?? "",
    businessName: input.businessName ?? "",
    email: input.email ?? "",
    phone: input.phone ?? "",
    trade: input.trade ?? "",
    location: input.location ?? "",
    existingWebsite: input.existingWebsite ?? "",
    description: input.description ?? "",
    services: input.services ?? "",
    preferredColours: input.preferredColours ?? "",
    additionalInformation: input.additionalInformation ?? "",
  });

  if (!result.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof EnquiryInput] = issue.message;
      }
    }
    return { fieldErrors };
  }

  return {
    data: {
      ...result.data,
      trade: result.data.trade as TradeValue,
    },
  };
}
