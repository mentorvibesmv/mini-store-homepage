import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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

// -------- sessionStorage persistence (versioned, tab-scoped) --------

const STORAGE_KEY = "mini-store:onboarding-draft";
const STORAGE_VERSION = 1;

type PersistedEnvelope = {
  version: 1;
  storeDetails: StoreDetailsDraft | null;
  businessProfile: BusinessProfileDraft | null;
  contentDetails: ContentDetailsDraft | null;
  brandDetails: BrandDetailsDraft | null;
};

function safeGetSession(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function hydrateFromStorage(): OnboardingDraft {
  const storage = safeGetSession();
  if (!storage) return {};
  let raw: string | null;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return {};
  }
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!isPlainObject(parsed)) return {};
  if (parsed.version !== STORAGE_VERSION) return {};

  const candidate: OnboardingDraft = {};

  // Validate section-by-section using the same guards the app uses.
  // Sequence-integrity: dropping a section drops everything downstream.
  if (isPlainObject(parsed.storeDetails)) {
    const trial: OnboardingDraft = {
      storeDetails: parsed.storeDetails as StoreDetailsDraft,
    };
    if (hasStoreDetails(trial)) {
      candidate.storeDetails = trial.storeDetails;
    }
  }
  if (!candidate.storeDetails) return {};

  if (isPlainObject(parsed.businessProfile)) {
    const trial: OnboardingDraft = {
      ...candidate,
      businessProfile: parsed.businessProfile as BusinessProfileDraft,
    };
    if (hasBusinessProfile(trial)) {
      candidate.businessProfile = trial.businessProfile;
    }
  }
  if (!candidate.businessProfile) return candidate;

  if (isPlainObject(parsed.contentDetails)) {
    const trial: OnboardingDraft = {
      ...candidate,
      contentDetails: parsed.contentDetails as ContentDetailsDraft,
    };
    if (hasContentDetails(trial)) {
      candidate.contentDetails = trial.contentDetails;
    }
  }
  if (!candidate.contentDetails) return candidate;

  if (isPlainObject(parsed.brandDetails)) {
    const trial: OnboardingDraft = {
      ...candidate,
      brandDetails: parsed.brandDetails as BrandDetailsDraft,
    };
    if (hasBrandDetails(trial)) {
      candidate.brandDetails = trial.brandDetails;
    }
  }

  return candidate;
}

function persistToStorage(draft: OnboardingDraft): void {
  const storage = safeGetSession();
  if (!storage) return;
  const envelope: PersistedEnvelope = {
    version: STORAGE_VERSION,
    storeDetails: draft.storeDetails ?? null,
    businessProfile: draft.businessProfile ?? null,
    contentDetails: draft.contentDetails ?? null,
    brandDetails: draft.brandDetails ?? null,
  };
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(envelope));
  } catch {
    // Silently ignore — in-memory state remains authoritative.
  }
}

export function OnboardingDraftProvider({ children }: { children: ReactNode }) {
  // Start empty for SSR; hydrate from sessionStorage after mount to avoid
  // any hydration mismatch (sessionStorage is browser-only).
  const [draft, setDraft] = useState<OnboardingDraft>({});
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const restored = hydrateFromStorage();
    if (
      restored.storeDetails ||
      restored.businessProfile ||
      restored.contentDetails ||
      restored.brandDetails
    ) {
      setDraft(restored);
    }
  }, []);

  // Persist after every state change (skip the initial empty state before
  // hydration to avoid overwriting stored data on first mount).
  useEffect(() => {
    if (!hydratedRef.current) return;
    persistToStorage(draft);
  }, [draft]);

  const value: OnboardingDraftContextValue = {
    draft,
    // Editing an earlier section invalidates everything downstream — the
    // user must reconfirm the flow before a LaunchInput is built.
    setStoreDetails: (v) => setDraft(() => ({ storeDetails: v })),
    setBusinessProfile: (v) =>
      setDraft((d) => ({
        storeDetails: d.storeDetails,
        businessProfile: v,
      })),
    setContentDetails: (v) =>
      setDraft((d) => ({
        storeDetails: d.storeDetails,
        businessProfile: d.businessProfile,
        contentDetails: v,
      })),
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
    typeof s.businessName === "string" &&
    typeof s.category === "string" &&
    typeof s.whatsappNumber === "string" &&
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
    typeof b.businessDescription === "string" &&
    typeof b.cityOrServiceArea === "string" &&
    typeof b.businessEmail === "string" &&
    typeof b.instagramUrl === "string" &&
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
    typeof c.tagline === "string" &&
    typeof c.productsOrServices === "string" &&
    typeof c.aboutBusiness === "string" &&
    c.tagline.trim().length >= 3 &&
    c.productsOrServices.trim().length >= 10
  );
}

// Brand & Style is "present" only if the required logoStatus field has a value.
export function hasBrandDetails(
  d: OnboardingDraft,
): d is OnboardingDraft & { brandDetails: BrandDetailsDraft } {
  const b = d.brandDetails;
  return (
    !!b &&
    typeof b.brandColor === "string" &&
    typeof b.specialDesignNotes === "string" &&
    (b.logoStatus === "have" || b.logoStatus === "none")
  );
}
