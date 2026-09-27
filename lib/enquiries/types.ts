export const ENQUIRY_STATUSES = [
  "new",
  "contacted",
  "draft_in_progress",
  "draft_ready",
  "sent",
  "converted",
  "not_proceeding",
] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const statusLabels: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  draft_in_progress: "Draft in progress",
  draft_ready: "Draft ready",
  sent: "Sent to customer",
  converted: "Converted",
  not_proceeding: "Not proceeding",
};

export type PreviewContent = {
  businessName: string;
  headline: string;
  about: string;
  services: string[];
  phone: string;
  email: string;
  serviceArea: string;
  colour: string;
  location: string;
  tradeLabel: string;
};

export type EnquiryAsset = {
  id: string;
  enquiry_id: string;
  storage_path: string;
  kind: "logo" | "photo";
  created_at: string;
};

export type EnquiryRow = {
  id: string;
  name: string;
  business_name: string;
  email: string;
  phone: string;
  trade: string;
  location: string;
  existing_website: string | null;
  description: string;
  services: string;
  preferred_colours: string | null;
  additional_information: string | null;
  status: EnquiryStatus;
  internal_notes: string;
  preview_slug: string | null;
  purchased: boolean;
  follow_up_sent_at: string | null;
  draft_sent_at: string | null;
  template: string;
  preview_content: Partial<PreviewContent> | null;
  created_at: string;
  updated_at: string;
};

export function isEnquiryStatus(value: string): value is EnquiryStatus {
  return ENQUIRY_STATUSES.includes(value as EnquiryStatus);
}

export function emptyPreview(): PreviewContent {
  return {
    businessName: "",
    headline: "",
    about: "",
    services: [],
    phone: "",
    email: "",
    serviceArea: "",
    colour: "",
    location: "",
    tradeLabel: "",
  };
}

export function previewFromEnquiry(enquiry: EnquiryRow): PreviewContent {
  const saved = enquiry.preview_content ?? {};
  const fallbackServices = enquiry.services
    .split(/\n|,/)
    .map((service) => service.trim())
    .filter(Boolean);

  return {
    businessName: saved.businessName || enquiry.business_name,
    headline: saved.headline || `${enquiry.business_name}`,
    about: saved.about || enquiry.description,
    services: saved.services && saved.services.length > 0 ? saved.services : fallbackServices,
    phone: saved.phone || enquiry.phone,
    email: saved.email || enquiry.email,
    serviceArea: saved.serviceArea || enquiry.location,
    colour: saved.colour || "",
    location: saved.location || enquiry.location,
    tradeLabel: saved.tradeLabel || enquiry.trade,
  };
}

export function safeAccent(colour: string) {
  return /^#[0-9a-fA-F]{6}$/.test(colour) ? colour : "#111111";
}
