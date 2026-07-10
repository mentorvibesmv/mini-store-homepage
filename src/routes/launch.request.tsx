// Fast Beta store request handoff route.
//
// Reads the completed onboarding draft + selected plan/billing/design,
// re-runs the Launch Engine (buildLaunchInput → toStoreConfig) to guarantee
// the request corresponds to a valid preview, collects a contact name /
// WhatsApp / optional email + consent, and hands the request off to the
// Mini Store team WhatsApp chat with a concise prefilled message. No
// backend, no persistence, no submission tracking.

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge } from "@/components/site";
import { cn } from "@/lib/utils";
import { useOnboardingDraft } from "@/lib/onboarding-draft";
import { buildLaunchInput } from "@/lib/launch/build-launch-input";
import { toStoreConfig } from "@/lib/launch/to-store-config";
import type { LaunchFailureReason } from "@/lib/launch/types";

type PlanId = "starter" | "business";
type Billing = "monthly" | "annual";

// Mini Store team WhatsApp — the ONLY destination for the handoff.
const TEAM_WHATSAPP_E164 = "919025800838";

// Session-scoped marker so a refresh / back-nav restores the truthful
// "WhatsApp opened" panel — but only when the current request context
// still matches the one that was opened. Any change to business name,
// plan, billing, design, or contact WhatsApp naturally returns idle.
const HANDOFF_STORAGE_KEY = "mini-store:handoff-opened";
const HANDOFF_STORAGE_VERSION = 1;

type HandoffMarker = { version: number; contextKey: string };

function buildContextKey(parts: {
  businessName: string;
  plan: PlanId;
  billing: Billing;
  designSlug: string;
  contactWhatsapp: string;
}): string {
  const normalizedName = parts.businessName.trim().toLowerCase();
  return encodeURIComponent(
    [
      normalizedName,
      parts.plan,
      parts.billing,
      parts.designSlug,
      parts.contactWhatsapp,
    ].join("|"),
  );
}

function readHandoffMarker(): HandoffMarker | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(HANDOFF_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      (parsed as HandoffMarker).version === HANDOFF_STORAGE_VERSION &&
      typeof (parsed as HandoffMarker).contextKey === "string" &&
      (parsed as HandoffMarker).contextKey.length > 0
    ) {
      return parsed as HandoffMarker;
    }
    return null;
  } catch {
    return null;
  }
}

function writeHandoffMarker(contextKey: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      HANDOFF_STORAGE_KEY,
      JSON.stringify({ version: HANDOFF_STORAGE_VERSION, contextKey }),
    );
  } catch {
    // storage unavailable — silently degrade to idle-only UX
  }
}

function parsePlan(v: unknown): PlanId | undefined {
  return v === "starter" || v === "business" ? v : undefined;
}
function parseBilling(v: unknown): Billing | undefined {
  return v === "monthly" || v === "annual" ? v : undefined;
}
function parseDesign(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

const PLAN_LABEL: Record<PlanId, string> = {
  starter: "Mini Store Basic",
  business: "Mini Store Commerce Managed",
};

const BILLING_LABEL: Record<Billing, string> = {
  monthly: "Monthly",
  annual: "Annual",
};

// Commercial values (mirror src/data/site.ts pricing.plans). Kept local so
// the request page does not import route/UI-only presentation data.
const PLAN_PRICING = {
  starter: {
    setup: null as string | null,
    monthly: "₹299/month",
    annual: "₹2,999/year",
  },
  business: {
    setup: "₹4,999 one-time setup fee",
    monthly: "₹599/month",
    annual: "₹5,999/year",
  },
} as const;

export const Route = createFileRoute("/launch/request")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: parsePlan(search.plan),
    billing: parseBilling(search.billing),
    design: parseDesign(search.design),
  }),
  head: () => ({
    meta: [
      { title: "Request Your Mini Store — Mini Store" },
      {
        name: "description",
        content: "Confirm your contact details to request your Mini Store.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RequestPage,
});

function RequestPage() {
  const { plan, billing, design } = Route.useSearch();
  const { draft, hydrated } = useOnboardingDraft();

  if (!hydrated) {
    return <PreparingState />;
  }

  const built = buildLaunchInput({ plan, billing, designSlug: design, draft });
  if (!built.ok) {
    return <FailureState reason={built.reason} plan={plan} billing={billing} />;
  }
  const configResult = toStoreConfig(built.value);
  if (!configResult.ok) {
    return (
      <FailureState reason={configResult.reason} plan={plan} billing={billing} />
    );
  }

  return (
    <RequestContent
      plan={built.value.plan}
      billing={built.value.billing}
      designSlug={built.value.designSlug}
      businessName={configResult.value.identity.businessName}
      templateTitle={configResult.value.template.title}
      prefillWhatsapp={built.value.storeDetails.whatsappNumber}
    />
  );
}

function PreparingState() {
  return (
    <SiteLayout>
      <Section>
        <Container className="max-w-2xl">
          <div
            role="status"
            aria-live="polite"
            className="mx-auto max-w-md py-16 text-center"
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Just a moment
            </p>
            <h1 className="mt-3 text-2xl font-bold text-foreground">
              Preparing your request…
            </h1>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}

// ---------- Content ----------

function RequestContent({
  plan,
  billing,
  designSlug,
  businessName,
  templateTitle,
  prefillWhatsapp,
}: {
  plan: PlanId;
  billing: Billing;
  designSlug: string;
  businessName: string;
  templateTitle: string;
  prefillWhatsapp: string;
}) {
  const [contactName, setContactName] = useState("");
  const [contactWhatsapp, setContactWhatsapp] = useState(prefillWhatsapp);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    whatsapp: false,
    email: false,
  });
  const [attempted, setAttempted] = useState(false);

  // Handoff marker — tracks whether WhatsApp was opened for the EXACT
  // current request context. A mismatch (business/plan/billing/design or
  // contact WhatsApp changed) naturally returns to idle without any
  // manual clearing.
  const [openedContextKey, setOpenedContextKey] = useState<string | null>(null);
  const openedHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const shouldFocusOpenedRef = useRef(false);

  useEffect(() => {
    const marker = readHandoffMarker();
    if (marker) setOpenedContextKey(marker.contextKey);
  }, []);

  const trimmedName = contactName.trim();
  const nameError: string | null = !trimmedName
    ? "Enter your contact name."
    : trimmedName.length < 2 || trimmedName.length > 60
      ? "Enter your contact name."
      : null;

  const whatsappError: string | null = !contactWhatsapp
    ? "Enter your WhatsApp number."
    : contactWhatsapp.length !== 10
      ? "Enter a valid 10-digit mobile number."
      : !/^[6-9]/.test(contactWhatsapp)
        ? "Enter a valid Indian mobile number."
        : null;

  const trimmedEmail = email.trim();
  const emailError: string | null =
    trimmedEmail.length === 0
      ? null
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
        ? null
        : "Enter a valid email address.";

  const allValid = !nameError && !whatsappError && !emailError && consent;

  const showNameError = (touched.name || attempted) && !!nameError;
  const showWhatsappError = (touched.whatsapp || attempted) && !!whatsappError;
  const showEmailError = (touched.email || attempted) && !!emailError;

  const sanitizePhone = (raw: string) =>
    raw.replace(/\D+/g, "").slice(-10).slice(0, 10);

  const pricing = PLAN_PRICING[plan];
  const priceLine = billing === "annual" ? pricing.annual : pricing.monthly;

  const waHref = useMemo(() => {
    if (!allValid) return "#";
    const lines = [
      `Hi, I'd like to request my Mini Store.`,
      ``,
      `Business: ${businessName}`,
      `Contact Name: ${trimmedName}`,
      `Contact WhatsApp: +91${contactWhatsapp}`,
      `Plan: ${PLAN_LABEL[plan]}`,
      `Billing: ${BILLING_LABEL[billing]}`,
      `Design: ${templateTitle}`,
    ];
    if (trimmedEmail) {
      lines.push(`Email: ${trimmedEmail}`);
    }
    lines.push(``, `Please review my request and share the next steps.`);
    const text = lines.join("\n");
    return `https://wa.me/${TEAM_WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
  }, [
    allValid,
    businessName,
    trimmedName,
    contactWhatsapp,
    plan,
    billing,
    templateTitle,
    trimmedEmail,
  ]);

  const handleContinueClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!allValid) {
      e.preventDefault();
      setAttempted(true);
    }
    // Otherwise the anchor's target="_blank" href opens the WhatsApp chat.
  };

  return (
    <SiteLayout>
      <Section>
        <Container className="max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge>Store Request</Badge>
          </div>
          <h1 className="mt-4 text-[26px] font-bold text-foreground sm:text-[32px]">
            Request Your Mini Store
          </h1>
          <p className="mt-2 max-w-2xl text-[14.5px] text-muted-foreground">
            Confirm your contact details. We'll review your request and contact
            you with the next steps.
          </p>

          {/* Commercial summary */}
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
            <div className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Your Selection
            </div>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              <SummaryItem label="Selected Plan" value={PLAN_LABEL[plan]} />
              <SummaryItem label="Billing" value={BILLING_LABEL[billing]} />
              <SummaryItem label="Selected Design" value={templateTitle} />
              <SummaryItem label="Business Name" value={businessName} />
            </dl>
            <div className="mt-5 rounded-2xl bg-primary-soft/40 p-4">
              <div className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Pricing
              </div>
              {pricing.setup ? (
                <div className="mt-1.5 text-[14px] font-semibold text-foreground">
                  {pricing.setup}
                  <span className="mx-2 text-muted-foreground">+</span>
                  {priceLine}
                </div>
              ) : (
                <div className="mt-1.5 text-[14px] font-semibold text-foreground">
                  {priceLine}
                </div>
              )}
              <p className="mt-2 text-[12.5px] text-muted-foreground">
                No payment is collected on this page. We'll review your request
                and contact you with the next steps.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <form
            noValidate
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            <h2 className="text-[18px] font-bold text-foreground">
              Contact Details
            </h2>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              We'll use these to reach you about this request.
            </p>

            <div className="mt-6 grid min-w-0 gap-5">
              <Field
                label="Contact Name"
                htmlFor="req-name"
                required
                error={showNameError ? (nameError ?? undefined) : undefined}
                errorId="req-name-error"
              >
                <input
                  id="req-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={showNameError || undefined}
                  aria-describedby={
                    showNameError ? "req-name-error" : undefined
                  }
                  className={cn(
                    "w-full min-w-0 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                    showNameError
                      ? "border-destructive/70 focus:border-destructive"
                      : "border-border focus:border-primary/60",
                  )}
                />
              </Field>

              <Field
                label="Contact WhatsApp"
                htmlFor="req-whatsapp"
                required
                error={
                  showWhatsappError ? (whatsappError ?? undefined) : undefined
                }
                errorId="req-whatsapp-error"
              >
                <div
                  className={cn(
                    "flex items-stretch overflow-hidden rounded-xl border bg-background shadow-soft",
                    showWhatsappError
                      ? "border-destructive/70 focus-within:border-destructive"
                      : "border-border focus-within:border-primary/60",
                  )}
                >
                  <span className="flex select-none items-center border-r border-border bg-primary-soft/40 px-3 text-[13px] font-medium text-muted-foreground">
                    +91
                  </span>
                  <input
                    id="req-whatsapp"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    value={contactWhatsapp}
                    onChange={(e) =>
                      setContactWhatsapp(sanitizePhone(e.target.value))
                    }
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData("text");
                      setContactWhatsapp(sanitizePhone(pasted));
                    }}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, whatsapp: true }))
                    }
                    placeholder="98765 43210"
                    aria-invalid={showWhatsappError || undefined}
                    aria-describedby={
                      showWhatsappError ? "req-whatsapp-error" : undefined
                    }
                    className="w-full min-w-0 bg-transparent px-4 py-3 text-[14px] tabular-nums text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </Field>

              <Field
                label="Email"
                htmlFor="req-email"
                error={showEmailError ? (emailError ?? undefined) : undefined}
                errorId="req-email-error"
                hint={
                  <span className="text-[12px] text-muted-foreground">
                    Optional
                  </span>
                }
              >
                <input
                  id="req-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  maxLength={120}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={showEmailError || undefined}
                  aria-describedby={
                    showEmailError ? "req-email-error" : undefined
                  }
                  className={cn(
                    "w-full min-w-0 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                    showEmailError
                      ? "border-destructive/70 focus:border-destructive"
                      : "border-border focus:border-primary/60",
                  )}
                />
              </Field>

              <label className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4 text-[13.5px] text-foreground">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-ring/40"
                />
                <span>
                  I confirm these details are correct and agree to be contacted
                  about this store request.
                </span>
              </label>
            </div>

            <div className="mt-8 text-center sm:text-left">
              <Link
                to="/setup/review"
                search={{ plan, billing, design: designSlug }}
                className="text-[13px] font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Edit Store Details
              </Link>
            </div>

            <div className="mt-4 flex flex-col-reverse gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/store/preview"
                search={{ plan, billing, design: designSlug }}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20 sm:w-auto"
              >
                Back to Preview
              </Link>
              <div className="flex flex-col items-stretch gap-2 sm:items-end">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleContinueClick}
                  aria-disabled={!allValid}
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all sm:w-auto",
                    allValid
                      ? "hover:-translate-y-0.5 hover:shadow-glow"
                      : "pointer-events-auto cursor-not-allowed opacity-60",
                  )}
                >
                  Continue on WhatsApp
                </a>
                <p className="text-[12.5px] text-muted-foreground sm:text-right">
                  Opens a chat with the Mini Store team.
                </p>
              </div>
            </div>
          </form>

        </Container>
      </Section>
    </SiteLayout>
  );
}

// ---------- Failure ----------

type FailureCopy = {
  title: string;
  body: string;
  actionLabel: string;
  to:
    | "/pricing"
    | "/templates"
    | "/setup"
    | "/setup/profile"
    | "/setup/content"
    | "/setup/brand";
};

function copyForReason(reason: LaunchFailureReason): FailureCopy {
  switch (reason) {
    case "invalid_plan":
    case "invalid_billing":
      return {
        title: "Choose a Plan First",
        body: "Pick a Mini Store plan to request your store.",
        actionLabel: "View Plans",
        to: "/pricing",
      };
    case "missing_store_details":
      return {
        title: "Complete Store Details First",
        body: "Add your basic store details before requesting.",
        actionLabel: "Go to Store Details",
        to: "/setup",
      };
    case "missing_business_profile":
      return {
        title: "Complete Business Profile First",
        body: "Add your business profile before requesting.",
        actionLabel: "Go to Business Profile",
        to: "/setup/profile",
      };
    case "missing_content":
      return {
        title: "Complete Store Content First",
        body: "Add your store content before requesting.",
        actionLabel: "Go to Content Setup",
        to: "/setup/content",
      };
    case "missing_brand":
      return {
        title: "Complete Brand & Style First",
        body: "Add your brand preferences before requesting.",
        actionLabel: "Go to Brand & Style",
        to: "/setup/brand",
      };
    case "missing_design":
      return {
        title: "Choose a Design First",
        body: "Select a design before requesting your store.",
        actionLabel: "Browse Templates",
        to: "/templates",
      };
    case "invalid_design":
    case "template_not_resolved":
      return {
        title: "Design Not Available",
        body: "The selected design is no longer available.",
        actionLabel: "Browse Templates",
        to: "/templates",
      };
  }
}

function FailureState({
  reason,
  plan,
  billing,
}: {
  reason: LaunchFailureReason;
  plan: PlanId | undefined;
  billing: Billing | undefined;
}) {
  const copy = copyForReason(reason);
  const isTemplatesTarget = copy.to === "/templates";
  const search: Record<string, unknown> = isTemplatesTarget
    ? {}
    : { design: undefined };
  if (!isTemplatesTarget && plan && billing) {
    search.plan = plan;
    search.billing = billing;
  }

  return (
    <SiteLayout>
      <Section>
        <Container className="max-w-md">
          <div className="mx-auto rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <h1 className="text-xl font-bold text-foreground">{copy.title}</h1>
            <p className="mx-auto mt-2 text-[14px] text-muted-foreground">
              {copy.body}
            </p>
            <div className="mt-6">
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={copy.to as any}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                search={search as any}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
              >
                {copy.actionLabel}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-primary-soft/50 px-4 py-3">
      <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 truncate text-[14px] font-semibold text-foreground">
        {value}
      </dd>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  errorId,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  errorId?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="block text-[13px] font-medium text-foreground"
        >
          {label}
          {required && <span className="ml-0.5 text-primary">*</span>}
        </label>
        {hint}
      </div>
      {children}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-[12.5px] text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
