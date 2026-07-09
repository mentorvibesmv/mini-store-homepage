import { createContext, useContext, useState, type ReactNode } from "react";

export type StoreDetailsDraft = {
  businessName: string;
  category: string;
  whatsappNumber: string;
};

export type BusinessProfileDraft = {
  businessDescription: string;
  cityOrServiceArea: string;
  businessEmail: string;
  instagramUrl: string;
};

export type ContentDetailsDraft = {
  tagline: string;
  productsOrServices: string;
  aboutBusiness: string;
};

export type LogoStatus = "have" | "none";
export type StylePreference = "clean" | "bold" | "elegant" | "playful";

export type BrandDetailsDraft = {
  logoStatus: LogoStatus;
  brandColor: string; // "" or normalized "#RRGGBB" uppercase
  stylePreference: StylePreference | "";
  specialDesignNotes: string;
};

export type OnboardingDraft = {
  storeDetails?: StoreDetailsDraft;
  businessProfile?: BusinessProfileDraft;
  contentDetails?: ContentDetailsDraft;
  brandDetails?: BrandDetailsDraft;
};

type OnboardingDraftContextValue = {
  draft: OnboardingDraft;
  setStoreDetails: (v: StoreDetailsDraft) => void;
  setBusinessProfile: (v: BusinessProfileDraft) => void;
  setContentDetails: (v: ContentDetailsDraft) => void;
  setBrandDetails: (v: BrandDetailsDraft) => void;
};

const OnboardingDraftContext = createContext<OnboardingDraftContextValue | null>(
  null,
);

export function OnboardingDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>({});

  const value: OnboardingDraftContextValue = {
    draft,
    setStoreDetails: (v) => setDraft((d) => ({ ...d, storeDetails: v })),
    setBusinessProfile: (v) => setDraft((d) => ({ ...d, businessProfile: v })),
    setContentDetails: (v) => setDraft((d) => ({ ...d, contentDetails: v })),
    setBrandDetails: (v) => setDraft((d) => ({ ...d, brandDetails: v })),
  };

  return (
    <OnboardingDraftContext.Provider value={value}>
      {children}
    </OnboardingDraftContext.Provider>
  );
}

export function useOnboardingDraft(): OnboardingDraftContextValue {
  const ctx = useContext(OnboardingDraftContext);
  if (!ctx) {
    throw new Error(
      "useOnboardingDraft must be used within OnboardingDraftProvider",
    );
  }
  return ctx;
}

// Store Details is considered "present" only if all three required fields are
// present as non-empty strings after normalization.
export function hasStoreDetails(
  d: OnboardingDraft,
): d is OnboardingDraft & { storeDetails: StoreDetailsDraft } {
  const s = d.storeDetails;
  return (
    !!s &&
    s.businessName.trim().length >= 2 &&
    s.category.length > 0 &&
    /^[6-9]\d{9}$/.test(s.whatsappNumber)
  );
}

// Business Profile is "present" only if the two required fields (description
// and city/service area) meet their minimum length constraints.
export function hasBusinessProfile(
  d: OnboardingDraft,
): d is OnboardingDraft & { businessProfile: BusinessProfileDraft } {
  const b = d.businessProfile;
  return (
    !!b &&
    b.businessDescription.trim().length >= 20 &&
    b.cityOrServiceArea.trim().length >= 2
  );
}

// Content Setup is "present" only if the two required fields meet minimum
// length constraints matching the Content Setup validation.
export function hasContentDetails(
  d: OnboardingDraft,
): d is OnboardingDraft & { contentDetails: ContentDetailsDraft } {
  const c = d.contentDetails;
  return (
    !!c &&
    c.tagline.trim().length >= 3 &&
    c.productsOrServices.trim().length >= 10
  );
}

// Brand & Style is "present" only if the required logoStatus field has a value.
export function hasBrandDetails(
  d: OnboardingDraft,
): d is OnboardingDraft & { brandDetails: BrandDetailsDraft } {
  const b = d.brandDetails;
  return !!b && (b.logoStatus === "have" || b.logoStatus === "none");
}

