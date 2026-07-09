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

export type OnboardingDraft = {
  storeDetails?: StoreDetailsDraft;
  businessProfile?: BusinessProfileDraft;
};

type OnboardingDraftContextValue = {
  draft: OnboardingDraft;
  setStoreDetails: (v: StoreDetailsDraft) => void;
  setBusinessProfile: (v: BusinessProfileDraft) => void;
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
