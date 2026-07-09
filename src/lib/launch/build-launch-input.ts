// Pure builder: onboarding draft + selected plan/billing/design →
// versioned LaunchInput snapshot. Re-runs onboarding readiness guards and
// resolves the design slug against visible templates. Never mutates input.

import {
  hasStoreDetails,
  hasBusinessProfile,
  hasContentDetails,
  hasBrandDetails,
  type OnboardingDraft,
} from "@/lib/onboarding-draft";
import { templates } from "@/data/site";
import type {
  BuildLaunchInputResult,
  LaunchBilling,
  LaunchInput,
  LaunchPlan,
} from "./types";

export type BuildLaunchInputArgs = {
  plan: unknown;
  billing: unknown;
  designSlug: unknown;
  draft: OnboardingDraft;
  now?: () => string; // injectable for tests; defaults to ISO now
};

function isValidPlan(v: unknown): v is LaunchPlan {
  return v === "starter" || v === "business";
}

function isValidBilling(v: unknown): v is LaunchBilling {
  return v === "monthly" || v === "annual";
}

function isVisibleTemplateSlug(slug: string): boolean {
  return templates.some((t) => t.slug === slug && t.visible);
}

export function buildLaunchInput(
  args: BuildLaunchInputArgs,
): BuildLaunchInputResult {
  const { plan, billing, designSlug, draft, now } = args;

  if (!isValidPlan(plan)) return { ok: false, reason: "invalid_plan" };
  if (!isValidBilling(billing)) return { ok: false, reason: "invalid_billing" };

  if (!hasStoreDetails(draft)) {
    return { ok: false, reason: "missing_store_details" };
  }
  if (!hasBusinessProfile(draft)) {
    return { ok: false, reason: "missing_business_profile" };
  }
  if (!hasContentDetails(draft)) {
    return { ok: false, reason: "missing_content" };
  }
  if (!hasBrandDetails(draft)) {
    return { ok: false, reason: "missing_brand" };
  }

  if (typeof designSlug !== "string" || designSlug.length === 0) {
    return { ok: false, reason: "missing_design" };
  }
  if (!isVisibleTemplateSlug(designSlug)) {
    return { ok: false, reason: "invalid_design" };
  }

  // Deep-copy accepted onboarding data so later form edits cannot mutate
  // the frozen snapshot.
  const snapshot: LaunchInput = {
    version: 1,
    createdAt: (now ?? (() => new Date().toISOString()))(),
    plan,
    billing,
    designSlug,
    storeDetails: { ...draft.storeDetails },
    businessProfile: { ...draft.businessProfile },
    contentDetails: { ...draft.contentDetails },
    brandDetails: { ...draft.brandDetails },
  };

  return { ok: true, value: snapshot };
}
