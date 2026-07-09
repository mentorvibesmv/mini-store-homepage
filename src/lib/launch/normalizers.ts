// Pure normalizers for the Launch Engine. Deterministic, side-effect free.

import type { StylePreference } from "@/lib/onboarding-draft";
import type { OfferingTitle } from "./types";

// Mini Store-safe fallback color used when the user did not pick a brand
// color. Neutral slate so it never clashes with template accents.
export const FALLBACK_BRAND_COLOR = "#111827";

// WhatsApp: input MUST be an already validated 10-digit Indian number
// (regex /^[6-9]\d{9}$/ enforced by hasStoreDetails). Callers are
// responsible for validation; this function only formats.
export function normalizeWhatsapp(tenDigit: string): {
  e164: string;
  href: string;
} {
  if (!/^[6-9]\d{9}$/.test(tenDigit)) {
    // Defensive: buildLaunchInput will not call this with invalid input,
    // but we still refuse to interpolate untrusted values.
    throw new Error("normalizeWhatsapp: input must be a validated 10-digit IN mobile number");
  }
  return {
    e164: `+91${tenDigit}`,
    href: `https://wa.me/91${tenDigit}`,
  };
}

export function normalizeEmail(raw: string): string | null {
  const trimmed = raw.trim();
  return trimmed.length === 0 ? null : trimmed;
}

// Instagram: the onboarding profile step already stores either "" (empty)
// or a fully normalized "https://instagram.com/<handle>" URL. We accept
// that convention and only re-verify the shape to avoid trusting anything
// unexpected.
export function normalizeInstagramFromDraft(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;
  const m = /^https:\/\/instagram\.com\/([A-Za-z0-9._]{1,30})$/.exec(trimmed);
  if (!m) return null;
  const handle = m[1];
  if (handle.startsWith(".") || handle.endsWith(".") || handle.includes("..")) {
    return null;
  }
  return `https://instagram.com/${handle}`;
}

const HEX6 = /^#([0-9a-fA-F]{6})$/;

export function normalizeBrandColor(raw: string): {
  color: string;
  hasCustomColor: boolean;
} {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return { color: FALLBACK_BRAND_COLOR, hasCustomColor: false };
  }
  const m = HEX6.exec(trimmed);
  if (!m) {
    return { color: FALLBACK_BRAND_COLOR, hasCustomColor: false };
  }
  return { color: `#${m[1].toUpperCase()}`, hasCustomColor: true };
}

export function normalizeStyle(raw: StylePreference | ""): StylePreference {
  return raw === "" ? "clean" : raw;
}

export function normalizeOptionalText(raw: string): string | null {
  const trimmed = raw.trim();
  return trimmed.length === 0 ? null : trimmed;
}

// Offering title rule (deterministic, category-based, no keyword guessing):
//   "Restaurant" and "Fashion" are product-first businesses in the current
//   onboarding category list, so they map to "Products". Every other current
//   category (Real Estate, Medical, Fitness, Education, Portfolio, Other) is
//   service-first, so they map to the documented fallback "Services".
export function deriveOfferingTitle(category: string): OfferingTitle {
  const c = category.trim();
  if (c === "Restaurant" || c === "Fashion") return "Products";
  return "Services";
}
