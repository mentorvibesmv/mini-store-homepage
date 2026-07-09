import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Store } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge, Button } from "@/components/site";
import { templates } from "@/data/site";
import { cn } from "@/lib/utils";
import { useOnboardingDraft, hasStoreDetails } from "@/lib/onboarding-draft";

type PlanId = "starter" | "business";
type Billing = "monthly" | "annual";

function parsePlan(v: unknown): PlanId | undefined {
  return v === "starter" || v === "business" ? v : undefined;
}
function parseBilling(v: unknown): Billing {
  return v === "annual" ? "annual" : "monthly";
}
function parseDesign(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

const DESC_MIN = 20;
const DESC_MAX = 300;
const CITY_MIN = 2;
const CITY_MAX = 80;
const EMAIL_MAX = 120;

export const Route = createFileRoute("/setup_/profile")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: parsePlan(search.plan),
    billing: parseBilling(search.billing),
    design: parseDesign(search.design),
  }),
  head: () => ({
    meta: [
      { title: "Business Profile — Mini Store" },
      {
        name: "description",
        content:
          "Add business details to help us prepare the content for your Mini Store.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BusinessProfilePage,
});

function BusinessProfilePage() {
  const { plan, billing, design } = Route.useSearch();
  const validDesign = design
    ? templates.find((t) => t.slug === design && t.visible)
    : undefined;
  const validDesignSlug = validDesign?.slug;
  const { draft } = useOnboardingDraft();

  return (
    <SiteLayout>
      <Section className="bg-hero">
        <Container className="max-w-3xl">
          {plan && (
            <Link
              to="/setup"
              search={{
                plan,
                billing,
                ...(validDesignSlug ? { design: validDesignSlug } : {}),
              }}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Store Details
            </Link>
          )}

          <div className="mt-6">
            <Badge>Business Profile</Badge>
            <h1 className="mt-5 text-[32px] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Tell Us About Your Business
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Add a few details that will help us prepare the content for your
              Mini Store.
            </p>
          </div>

          {!plan ? (
            <ChoosePlanState />
          ) : !hasStoreDetails(draft) ? (
            <MissingDraftState
              plan={plan}
              billing={billing}
              validDesignSlug={validDesignSlug}
            />
          ) : (
            <ProfileForm
              plan={plan}
              billing={billing}
              validDesignSlug={validDesignSlug}
            />
          )}
        </Container>
      </Section>
    </SiteLayout>
  );
}

function ChoosePlanState() {
  return (
    <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
      <h2 className="text-xl font-bold text-foreground">Choose a Plan First</h2>
      <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">
        Pick a Mini Store plan to continue setting up your store.
      </p>
      <div className="mt-6 flex justify-center">
        <Button href="/pricing">View Plans</Button>
      </div>
    </div>
  );
}

function MissingDraftState({
  plan,
  billing,
  validDesignSlug,
}: {
  plan: PlanId;
  billing: Billing;
  validDesignSlug: string | undefined;
}) {
  return (
    <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
      <h2 className="text-xl font-bold text-foreground">
        Complete Store Details First
      </h2>
      <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">
        Add your basic store details before continuing to your business
        profile.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          to="/setup"
          search={{
            plan,
            billing,
            ...(validDesignSlug ? { design: validDesignSlug } : {}),
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
        >
          Go to Store Details
        </Link>
      </div>
    </div>
  );
}

// -- Validation ----------------------------------------------------------

type DescError = "required" | "short" | "long" | null;
type CityError = "required" | "short" | "long" | null;
type EmailError = "invalid" | "long" | null;
type IgError = "invalid" | null;

function validateDesc(v: string): DescError {
  const t = v.trim();
  if (t.length === 0) return "required";
  if (t.length < DESC_MIN) return "short";
  if (t.length > DESC_MAX) return "long";
  return null;
}
function validateCity(v: string): CityError {
  const t = v.trim();
  if (t.length === 0) return "required";
  if (t.length < CITY_MIN) return "short";
  if (t.length > CITY_MAX) return "long";
  return null;
}
function validateEmail(v: string): EmailError {
  const t = v.trim();
  if (t.length === 0) return null; // optional
  if (t.length > EMAIL_MAX) return "long";
  // Practical email: local@domain.tld, no whitespace.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return "invalid";
  return null;
}

const DESC_MSG: Record<Exclude<DescError, null>, string> = {
  required: "Tell us a little about your business.",
  short: `Enter at least ${DESC_MIN} characters.`,
  long: `Use ${DESC_MAX} characters or fewer.`,
};
const CITY_MSG: Record<Exclude<CityError, null>, string> = {
  required: "Enter your city or service area.",
  short: `Enter at least ${CITY_MIN} characters.`,
  long: `Use ${CITY_MAX} characters or fewer.`,
};
const EMAIL_MSG: Record<Exclude<EmailError, null>, string> = {
  invalid: "Enter a valid business email.",
  long: `Use ${EMAIL_MAX} characters or fewer.`,
};

// Instagram normalization: returns normalized URL, or null if invalid.
// Accepts empty (returns "" as optional).
export function normalizeInstagram(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return "";
  let handle = trimmed;

  // Strip protocol
  handle = handle.replace(/^https?:\/\//i, "");
  // Strip www.
  handle = handle.replace(/^www\./i, "");
  // Strip instagram.com/
  handle = handle.replace(/^instagram\.com\//i, "");
  // Strip @
  handle = handle.replace(/^@/, "");
  // Strip trailing slash and any query/hash
  handle = handle.split(/[/?#]/)[0];

  // Instagram usernames: letters, digits, underscore, period; 1-30 chars.
  if (!/^[A-Za-z0-9._]{1,30}$/.test(handle)) return null;
  // Cannot start or end with period, and no consecutive periods.
  if (handle.startsWith(".") || handle.endsWith(".")) return null;
  if (handle.includes("..")) return null;

  return `https://instagram.com/${handle}`;
}

function validateInstagram(v: string): IgError {
  if (v.trim().length === 0) return null;
  return normalizeInstagram(v) === null ? "invalid" : null;
}

function ProfileForm({
  plan,
  billing,
  validDesignSlug,
}: {
  plan: PlanId;
  billing: Billing;
  validDesignSlug: string | undefined;
}) {
  const { draft, setBusinessProfile } = useOnboardingDraft();
  const store = draft.storeDetails!;
  const existing = draft.businessProfile;

  const [desc, setDesc] = useState(existing?.businessDescription ?? "");
  const [city, setCity] = useState(existing?.cityOrServiceArea ?? "");
  const [email, setEmail] = useState(existing?.businessEmail ?? "");
  const [ig, setIg] = useState(existing?.instagramUrl ?? "");

  const [touched, setTouched] = useState({
    desc: false,
    city: false,
    email: false,
    ig: false,
  });
  const [attempted, setAttempted] = useState(false);
  const [checkpointShown, setCheckpointShown] = useState(false);

  const descError = validateDesc(desc);
  const cityError = validateCity(city);
  const emailError = validateEmail(email);
  const igError = validateInstagram(ig);
  const allValid = !descError && !cityError && !emailError && !igError;

  const showDescError = (touched.desc || attempted) && !!descError;
  const showCityError = (touched.city || attempted) && !!cityError;
  const showEmailError = (touched.email || attempted) && !!emailError;
  const showIgError = (touched.ig || attempted) && !!igError;

  const descLen = desc.trim().length;

  const summaryItems = useMemo(
    () => [
      { label: "Business Name", value: store.businessName },
      { label: "Category", value: store.category },
    ],
    [store],
  );

  const handleContinue = () => {
    if (!allValid) {
      setAttempted(true);
      return;
    }
    setBusinessProfile({
      businessDescription: desc.trim(),
      cityOrServiceArea: city.trim(),
      businessEmail: email.trim(),
      instagramUrl: normalizeInstagram(ig) ?? "",
    });
    setCheckpointShown(true);
  };

  const clearCheckpoint = () => {
    if (checkpointShown) setCheckpointShown(false);
  };

  return (
    <div className="mt-10 space-y-6">
      {/* Compact business context summary */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Store className="h-3.5 w-3.5 text-primary" />
          Your Business
        </div>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          {summaryItems.map((s) => (
            <div
              key={s.label}
              className="min-w-0 rounded-xl bg-primary-soft/50 px-4 py-3"
            >
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-1 truncate text-[14px] font-semibold text-foreground">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
        noValidate
        className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
      >
        <h2 className="text-[18px] font-bold text-foreground">
          Business Profile
        </h2>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          These details help us prepare the content for your Mini Store.
        </p>

        <div className="mt-6 grid min-w-0 gap-5">
          {/* Description */}
          <Field
            label="Short Business Description"
            htmlFor="biz-desc"
            required
            error={showDescError ? DESC_MSG[descError!] : undefined}
            errorId="biz-desc-error"
            helper="Describe what your business offers in a few sentences."
            hint={
              <span
                className={cn(
                  "text-[12px] tabular-nums",
                  descLen > DESC_MAX
                    ? "text-destructive"
                    : "text-muted-foreground",
                )}
              >
                {descLen}/{DESC_MAX}
              </span>
            }
          >
            <textarea
              id="biz-desc"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                clearCheckpoint();
              }}
              onBlur={() => setTouched((t) => ({ ...t, desc: true }))}
              rows={4}
              maxLength={600}
              placeholder="We offer stylish and affordable fashion for everyday wear."
              aria-invalid={showDescError || undefined}
              aria-describedby={showDescError ? "biz-desc-error" : undefined}
              className={cn(
                "w-full min-w-0 resize-y rounded-xl border bg-background px-4 py-3 text-[14px] leading-relaxed text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showDescError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
          </Field>

          {/* City */}
          <Field
            label="City / Service Area"
            htmlFor="biz-city"
            required
            error={showCityError ? CITY_MSG[cityError!] : undefined}
            errorId="biz-city-error"
          >
            <input
              id="biz-city"
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                clearCheckpoint();
              }}
              onBlur={() => setTouched((t) => ({ ...t, city: true }))}
              maxLength={160}
              autoComplete="address-level2"
              placeholder="e.g. Madurai"
              aria-invalid={showCityError || undefined}
              aria-describedby={showCityError ? "biz-city-error" : undefined}
              className={cn(
                "w-full min-w-0 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showCityError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
          </Field>

          {/* Email (optional) */}
          <Field
            label="Business Email"
            htmlFor="biz-email"
            optional
            error={showEmailError ? EMAIL_MSG[emailError!] : undefined}
            errorId="biz-email-error"
          >
            <input
              id="biz-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearCheckpoint();
              }}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              maxLength={EMAIL_MAX}
              autoComplete="email"
              placeholder="e.g. hello@yourbusiness.com"
              aria-invalid={showEmailError || undefined}
              aria-describedby={showEmailError ? "biz-email-error" : undefined}
              className={cn(
                "w-full min-w-0 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showEmailError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
          </Field>

          {/* Instagram (optional) */}
          <Field
            label="Instagram Profile"
            htmlFor="biz-ig"
            optional
            error={showIgError ? "Enter a valid Instagram profile." : undefined}
            errorId="biz-ig-error"
          >
            <input
              id="biz-ig"
              type="text"
              value={ig}
              onChange={(e) => {
                setIg(e.target.value);
                clearCheckpoint();
              }}
              onBlur={() => setTouched((t) => ({ ...t, ig: true }))}
              maxLength={160}
              autoComplete="off"
              placeholder="e.g. instagram.com/yourbusiness or @yourbusiness"
              aria-invalid={showIgError || undefined}
              aria-describedby={showIgError ? "biz-ig-error" : undefined}
              className={cn(
                "w-full min-w-0 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showIgError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
          </Field>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/setup"
            search={{
              plan,
              billing,
              ...(validDesignSlug ? { design: validDesignSlug } : {}),
            }}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20 sm:w-auto"
          >
            Back to Store Details
          </Link>
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!allValid}
              aria-disabled={!allValid}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all sm:w-auto",
                allValid
                  ? "hover:-translate-y-0.5 hover:shadow-glow"
                  : "cursor-not-allowed opacity-60",
              )}
            >
              Continue
            </button>
            {checkpointShown && allValid ? (
              <p
                role="status"
                aria-live="polite"
                className="text-[12.5px] text-foreground sm:text-right"
              >
                Business profile is ready. Your store content is the next
                setup step.
              </p>
            ) : (
              <p className="text-[12.5px] text-muted-foreground sm:text-right">
                Your store content is the next setup step.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  errorId,
  helper,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  errorId?: string;
  helper?: string;
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
          {optional && (
            <span className="ml-1.5 text-[11.5px] font-normal text-muted-foreground">
              (optional)
            </span>
          )}
        </label>
        {hint}
      </div>
      {helper && (
        <p className="mb-1.5 text-[12.5px] text-muted-foreground">{helper}</p>
      )}
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
