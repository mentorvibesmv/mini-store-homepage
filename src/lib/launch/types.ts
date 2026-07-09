// Launch Engine typed contracts (V1). Pure data — no UI, no persistence.
//
// LaunchInput is the frozen, versioned snapshot of the completed onboarding
// draft plus the selected plan/billing/design. It is the sole input to the
// Launch Engine.
//
// StoreConfig is the normalized, renderer-ready shape derived from a
// LaunchInput. It contains only fields that current onboarding actually
// collects; the Launch Engine never fabricates missing content.

import type {
  StoreDetailsDraft,
  BusinessProfileDraft,
  ContentDetailsDraft,
  BrandDetailsDraft,
  StylePreference,
  LogoStatus,
} from "@/lib/onboarding-draft";

// Plan + Billing mirror the validated search-param unions used by
// /pricing, /pricing/start, /setup, /setup/profile, /setup/content,
// /setup/brand, and /setup/review. Kept local so the Launch Engine has
// no route-file dependency.
export type LaunchPlan = "starter" | "business";
export type LaunchBilling = "monthly" | "annual";

export type LaunchInput = {
  readonly version: 1;
  readonly createdAt: string; // ISO-8601
  readonly plan: LaunchPlan;
  readonly billing: LaunchBilling;
  readonly designSlug: string; // validated visible template slug
  readonly storeDetails: StoreDetailsDraft;
  readonly businessProfile: BusinessProfileDraft;
  readonly contentDetails: ContentDetailsDraft;
  readonly brandDetails: BrandDetailsDraft;
};

export type OfferingTitle = "Products" | "Services";

export type StoreConfig = {
  readonly version: 1;
  readonly template: {
    readonly slug: string;
    readonly title: string;
    readonly category: string;
  };
  readonly identity: {
    readonly businessName: string;
    readonly tagline: string;
    readonly category: string;
  };
  readonly contact: {
    readonly whatsappE164: string;
    readonly whatsappHref: string;
    readonly email: string | null;
    readonly instagramUrl: string | null;
    readonly cityOrServiceArea: string;
  };
  readonly hero: {
    readonly headline: string;
    readonly subhead: string;
  };
  readonly about: {
    readonly body: string;
  } | null;
  readonly offering: {
    readonly title: OfferingTitle;
    readonly body: string;
  };
  readonly brand: {
    readonly primaryColor: string;
    readonly hasCustomColor: boolean;
    readonly style: StylePreference;
    readonly logoStatus: LogoStatus;
    readonly notes: string | null;
  };
};

// Machine-readable failure reasons. No user-facing copy here.
export type LaunchFailureReason =
  | "invalid_plan"
  | "invalid_billing"
  | "missing_store_details"
  | "missing_business_profile"
  | "missing_content"
  | "missing_brand"
  | "missing_design"
  | "invalid_design"
  | "template_not_resolved";

export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: E };

export type BuildLaunchInputResult = Result<LaunchInput, LaunchFailureReason>;
export type ToStoreConfigResult = Result<StoreConfig, LaunchFailureReason>;
