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

export type OnboardingDraft = {
  storeDetails?: StoreDetailsDraft;
  businessProfile?: BusinessProfileDraft;
  contentDetails?: ContentDetailsDraft;
};

type OnboardingDraftContextValue = {
  draft: OnboardingDraft;
  setStoreDetails: (v: StoreDetailsDraft) => void;
  setBusinessProfile: (v: BusinessProfileDraft) => void;
  setContentDetails: (v: ContentDetailsDraft) => void;
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
