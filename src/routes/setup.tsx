import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Store } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge, Button } from "@/components/site";
import { templates } from "@/data/site";
import { cn } from "@/lib/utils";
import { useOnboardingDraft } from "@/lib/onboarding-draft";

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

const PLAN_LABEL: Record<PlanId, string> = {
  starter: "Mini Store Basic",
  business: "Mini Store Commerce Managed",
};

const CATEGORIES = [
  "Restaurant",
  "Fashion",
  "Real Estate",
  "Medical",
  "Fitness",
  "Education",
  "Portfolio",
  "Other",
];

const NAME_MAX = 60;
const NAME_COUNTER_THRESHOLD = 50;

export const Route = createFileRoute("/setup")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: parsePlan(search.plan),
    billing: parseBilling(search.billing),
    design: parseDesign(search.design),
  }),
  head: () => ({
    meta: [
      { title: "Set Up Your Mini Store — Mini Store" },
      {
        name: "description",
        content:
          "Tell us a few details about your business to prepare your Mini Store.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SetupPage,
});

function SetupPage() {
  const { plan, billing, design } = Route.useSearch();
  const validDesign = design
    ? templates.find((t) => t.slug === design && t.visible)
    : undefined;
  const validDesignSlug = validDesign?.slug;

  return (
    <SiteLayout>
      <Section className="bg-hero">
        <Container className="max-w-3xl">
          {plan && (
            <Link
              to="/pricing/start"
              search={{
                plan,
                billing,
                ...(validDesignSlug ? { design: validDesignSlug } : {}),
              }}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Plan
            </Link>
          )}

          <div className="mt-6">
            <Badge>Store Details</Badge>
            <h1 className="mt-5 text-[32px] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Set Up Your Mini Store
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Tell us a few details about your business to prepare your store.
            </p>
          </div>

          {plan ? (
            <SetupContent
              plan={plan}
              billing={billing}
              design={validDesign}
              validDesignSlug={validDesignSlug}
            />
          ) : (
            <ChoosePlanState />
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

// -- Validation helpers ---------------------------------------------------

type NameError = "required" | "short" | "long" | null;
type CategoryError = "required" | null;
type PhoneError = "required" | "length" | "prefix" | null;

function validateName(raw: string): NameError {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return "required";
  if (trimmed.length < 2) return "short";
  if (trimmed.length > NAME_MAX) return "long";
  return null;
}

function validateCategory(v: string): CategoryError {
  return v === "" ? "required" : null;
}

function validatePhone(v: string): PhoneError {
  if (v.length === 0) return "required";
  if (v.length !== 10) return "length";
  if (!/^[6-9]/.test(v)) return "prefix";
  return null;
}

const NAME_MESSAGES: Record<Exclude<NameError, null>, string> = {
  required: "Enter your business or store name.",
  short: "Enter at least 2 characters.",
  long: "Use 60 characters or fewer.",
};
const CATEGORY_MESSAGES: Record<Exclude<CategoryError, null>, string> = {
  required: "Select a business category.",
};
const PHONE_MESSAGES: Record<Exclude<PhoneError, null>, string> = {
  required: "Enter your WhatsApp number.",
  length: "Enter a valid 10-digit mobile number.",
  prefix: "Enter a valid Indian mobile number.",
};

function SetupContent({
  plan,
  billing,
  design,
  validDesignSlug,
}: {
  plan: PlanId;
  billing: Billing;
  design: (typeof templates)[number] | undefined;
  validDesignSlug: string | undefined;
}) {
  const navigate = useNavigate();
  const { draft, setStoreDetails } = useOnboardingDraft();
  const existing = draft.storeDetails;

  const [name, setName] = useState(existing?.businessName ?? "");
  const [category, setCategory] = useState(existing?.category ?? "");
  const [phone, setPhone] = useState(existing?.whatsappNumber ?? "");

  const [touched, setTouched] = useState({
    name: false,
    category: false,
    phone: false,
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const nameError = validateName(name);
  const categoryError = validateCategory(category);
  const phoneError = validatePhone(phone);
  const allValid = !nameError && !categoryError && !phoneError;

  const showNameError = (touched.name || attemptedSubmit) && !!nameError;
  const showCategoryError =
    (touched.category || attemptedSubmit) && !!categoryError;
  const showPhoneError = (touched.phone || attemptedSubmit) && !!phoneError;

  const nameTrimmedLen = name.trim().length;
  const showNameCounter = name.length >= NAME_COUNTER_THRESHOLD;

  const sanitizePhone = (raw: string) =>
    raw.replace(/\D+/g, "").slice(-10).slice(0, 10);

  const handlePhoneChange = (v: string) => {
    setPhone(sanitizePhone(v));
  };

  const handleContinue = () => {
    if (!allValid) {
      setAttemptedSubmit(true);
      return;
    }
    setStoreDetails({
      businessName: name.trim(),
      category,
      whatsappNumber: phone,
    });
    navigate({
      to: "/setup/profile",
      search: {
        plan,
        billing,
        ...(validDesignSlug ? { design: validDesignSlug } : {}),
      },
    });
  };

  const summaryItems = useMemo(
    () =>
      [
        { label: "Selected Plan", value: PLAN_LABEL[plan] },
        {
          label: "Billing",
          value: billing === "annual" ? "Annual billing" : "Monthly billing",
        },
        ...(design ? [{ label: "Selected Design", value: design.title }] : []),
      ],
    [plan, billing, design],
  );

  return (
    <div className="mt-10 space-y-6">
      {/* Compact summary */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Store className="h-3.5 w-3.5 text-primary" />
          Your Selection
        </div>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {summaryItems.map((s) => (
            <SummaryItem key={s.label} label={s.label} value={s.value} />
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
          Store Details
        </h2>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          These details help us prepare your Mini Store.
        </p>

        <div className="mt-6 grid min-w-0 gap-5">
          {/* Name */}
          <Field
            label="Business / Store Name"
            htmlFor="store-name"
            required
            error={showNameError ? NAME_MESSAGES[nameError!] : undefined}
            errorId="store-name-error"
            hint={
              showNameCounter ? (
                <span
                  className={cn(
                    "text-[12px] tabular-nums",
                    nameTrimmedLen > NAME_MAX
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {nameTrimmedLen}/{NAME_MAX}
                </span>
              ) : null
            }
          >
            <input
              id="store-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (checkpointShown) setCheckpointShown(false);
              }}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              maxLength={120}
              autoComplete="organization"
              placeholder="e.g. Bava Fashion"
              aria-invalid={showNameError || undefined}
              aria-describedby={showNameError ? "store-name-error" : undefined}
              className={cn(
                "w-full min-w-0 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showNameError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
          </Field>

          {/* Category */}
          <Field
            label="Business Category"
            htmlFor="business-category"
            required
            error={
              showCategoryError
                ? CATEGORY_MESSAGES[categoryError!]
                : undefined
            }
            errorId="business-category-error"
          >
            <select
              id="business-category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setTouched((t) => ({ ...t, category: true }));
                if (checkpointShown) setCheckpointShown(false);
              }}
              onBlur={() => setTouched((t) => ({ ...t, category: true }))}
              aria-invalid={showCategoryError || undefined}
              aria-describedby={
                showCategoryError ? "business-category-error" : undefined
              }
              className={cn(
                "w-full min-w-0 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none focus:ring-2 focus:ring-ring/40",
                showCategoryError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          {/* WhatsApp */}
          <Field
            label="WhatsApp Number"
            htmlFor="whatsapp"
            required
            error={showPhoneError ? PHONE_MESSAGES[phoneError!] : undefined}
            errorId="whatsapp-error"
          >
            <div
              className={cn(
                "flex min-w-0 items-stretch overflow-hidden rounded-xl border bg-background shadow-soft focus-within:ring-2 focus-within:ring-ring/40",
                showPhoneError
                  ? "border-destructive/70 focus-within:border-destructive"
                  : "border-border focus-within:border-primary/60",
              )}
            >
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center gap-1 border-r border-border bg-primary-soft/60 px-3 text-[14px] font-medium text-foreground"
              >
                +91
              </span>
              <input
                id="whatsapp"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onPaste={(e) => {
                  e.preventDefault();
                  const pasted = e.clipboardData.getData("text");
                  handlePhoneChange(pasted);
                }}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                maxLength={10}
                placeholder="98765 43210"
                aria-invalid={showPhoneError || undefined}
                aria-describedby={showPhoneError ? "whatsapp-error" : undefined}
                className="w-full min-w-0 bg-transparent px-4 py-3 text-[14px] tabular-nums text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </Field>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/pricing/start"
            search={{
              plan,
              billing,
              ...(validDesignSlug ? { design: validDesignSlug } : {}),
            }}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20 sm:w-auto"
          >
            Back to Plan
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
                Store details are ready. The next setup step will be added
                next.
              </p>
            ) : (
              <p className="text-[12.5px] text-muted-foreground sm:text-right">
                Store details submission is the next step.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
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
