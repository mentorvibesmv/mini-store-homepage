import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Store } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge, Button } from "@/components/site";
import { templates } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  useOnboardingDraft,
  hasStoreDetails,
  hasBusinessProfile,
} from "@/lib/onboarding-draft";

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

const TAGLINE_MIN = 3;
const TAGLINE_MAX = 80;
const TAGLINE_COUNTER_AT = 60;
const PRODUCTS_MIN = 10;
const PRODUCTS_MAX = 500;
const PRODUCTS_COUNTER_AT = 400;
const ABOUT_MAX = 800;
const ABOUT_COUNTER_AT = 640;

export const Route = createFileRoute("/setup_/content")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: parsePlan(search.plan),
    billing: parseBilling(search.billing),
    design: parseDesign(search.design),
  }),
  head: () => ({
    meta: [
      { title: "Store Content — Mini Store" },
      {
        name: "description",
        content:
          "Add the key content we need to prepare your Mini Store.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ContentSetupPage,
});

function ContentSetupPage() {
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
              to="/setup/profile"
              search={{
                plan,
                billing,
                ...(validDesignSlug ? { design: validDesignSlug } : {}),
              }}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Business Profile
            </Link>
          )}

          <div className="mt-6">
            <Badge>Content Setup</Badge>
            <h1 className="mt-5 text-[32px] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Prepare Your Store Content
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Add the key content we need to prepare your Mini Store.
            </p>
          </div>

          {!plan ? (
            <ChoosePlanState />
          ) : !hasStoreDetails(draft) ? (
            <MissingStoreState
              plan={plan}
              billing={billing}
              validDesignSlug={validDesignSlug}
            />
          ) : !hasBusinessProfile(draft) ? (
            <MissingProfileState
              plan={plan}
              billing={billing}
              validDesignSlug={validDesignSlug}
            />
          ) : (
            <ContentForm
              plan={plan}
              billing={billing}
              design={validDesign}
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

function MissingStoreState({
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
        Add your basic store details before preparing your store content.
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

function MissingProfileState({
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
        Complete Business Profile First
      </h2>
      <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">
        Add your business profile before preparing your store content.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          to="/setup/profile"
          search={{
            plan,
            billing,
            ...(validDesignSlug ? { design: validDesignSlug } : {}),
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
        >
          Go to Business Profile
        </Link>
      </div>
    </div>
  );
}

// -- Validation ----------------------------------------------------------

type TaglineError = "required" | "short" | "long" | null;
type ProductsError = "required" | "short" | "long" | null;
type AboutError = "long" | null;

function validateTagline(v: string): TaglineError {
  const t = v.trim();
  if (t.length === 0) return "required";
  if (t.length < TAGLINE_MIN) return "short";
  if (t.length > TAGLINE_MAX) return "long";
  return null;
}
function validateProducts(v: string): ProductsError {
  const t = v.trim();
  if (t.length === 0) return "required";
  if (t.length < PRODUCTS_MIN) return "short";
  if (t.length > PRODUCTS_MAX) return "long";
  return null;
}
function validateAbout(v: string): AboutError {
  if (v.trim().length > ABOUT_MAX) return "long";
  return null;
}

const TAGLINE_MSG: Record<Exclude<TaglineError, null>, string> = {
  required: "Add a short tagline for your store.",
  short: `Enter at least ${TAGLINE_MIN} characters.`,
  long: `Use ${TAGLINE_MAX} characters or fewer.`,
};
const PRODUCTS_MSG: Record<Exclude<ProductsError, null>, string> = {
  required: "List your main products or services.",
  short: `Enter at least ${PRODUCTS_MIN} characters.`,
  long: `Use ${PRODUCTS_MAX} characters or fewer.`,
};
const ABOUT_MSG: Record<Exclude<AboutError, null>, string> = {
  long: `Use ${ABOUT_MAX} characters or fewer.`,
};

function ContentForm({
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
  const { draft, setContentDetails } = useOnboardingDraft();
  const existing = draft.contentDetails;

  const [tagline, setTagline] = useState(existing?.tagline ?? "");
  const [products, setProducts] = useState(existing?.productsOrServices ?? "");
  const [about, setAbout] = useState(existing?.aboutBusiness ?? "");

  const [touched, setTouched] = useState({
    tagline: false,
    products: false,
    about: false,
  });
  const [attempted, setAttempted] = useState(false);
  const [checkpointShown, setCheckpointShown] = useState(false);

  const taglineError = validateTagline(tagline);
  const productsError = validateProducts(products);
  const aboutError = validateAbout(about);
  const allValid = !taglineError && !productsError && !aboutError;

  const showTaglineError = (touched.tagline || attempted) && !!taglineError;
  const showProductsError = (touched.products || attempted) && !!productsError;
  const showAboutError = (touched.about || attempted) && !!aboutError;

  const taglineLen = tagline.trim().length;
  const productsLen = products.trim().length;
  const aboutLen = about.trim().length;

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

  const clearCheckpoint = () => {
    if (checkpointShown) setCheckpointShown(false);
  };

  const handleContinue = () => {
    if (!allValid) {
      setAttempted(true);
      return;
    }
    setContentDetails({
      tagline: tagline.trim(),
      productsOrServices: products.trim(),
      aboutBusiness: about.trim(),
    });
    setCheckpointShown(true);
  };

  return (
    <div className="mt-10 space-y-6">
      {/* Selection summary */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Store className="h-3.5 w-3.5 text-primary" />
          Your Selection
        </div>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
          Store Content
        </h2>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          Share the core content that will appear across your Mini Store.
        </p>

        <div className="mt-6 grid min-w-0 gap-5">
          {/* Tagline */}
          <Field
            label="Business Tagline"
            htmlFor="content-tagline"
            required
            error={showTaglineError ? TAGLINE_MSG[taglineError!] : undefined}
            errorId="content-tagline-error"
            helper="A short line that describes your business at a glance."
            hint={
              taglineLen >= TAGLINE_COUNTER_AT ? (
                <span
                  className={cn(
                    "text-[12px] tabular-nums",
                    taglineLen > TAGLINE_MAX
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {taglineLen}/{TAGLINE_MAX}
                </span>
              ) : null
            }
          >
            <input
              id="content-tagline"
              type="text"
              value={tagline}
              onChange={(e) => {
                setTagline(e.target.value);
                clearCheckpoint();
              }}
              onBlur={() => setTouched((t) => ({ ...t, tagline: true }))}
              maxLength={160}
              placeholder="e.g. Fresh, handmade sweets from our family to yours"
              aria-invalid={showTaglineError || undefined}
              aria-describedby={
                showTaglineError ? "content-tagline-error" : undefined
              }
              className={cn(
                "w-full min-w-0 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showTaglineError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
          </Field>

          {/* Main Products / Services */}
          <Field
            label="Main Products / Services"
            htmlFor="content-products"
            required
            error={showProductsError ? PRODUCTS_MSG[productsError!] : undefined}
            errorId="content-products-error"
            helper="Briefly list the main products or services you offer."
            hint={
              productsLen >= PRODUCTS_COUNTER_AT ? (
                <span
                  className={cn(
                    "text-[12px] tabular-nums",
                    productsLen > PRODUCTS_MAX
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {productsLen}/{PRODUCTS_MAX}
                </span>
              ) : null
            }
          >
            <textarea
              id="content-products"
              value={products}
              onChange={(e) => {
                setProducts(e.target.value);
                clearCheckpoint();
              }}
              onBlur={() => setTouched((t) => ({ ...t, products: true }))}
              rows={4}
              maxLength={800}
              placeholder="e.g. Custom birthday cakes, cupcakes, cookies, and event catering across Chennai."
              aria-invalid={showProductsError || undefined}
              aria-describedby={
                showProductsError ? "content-products-error" : undefined
              }
              className={cn(
                "w-full min-w-0 resize-y rounded-xl border bg-background px-4 py-3 text-[14px] leading-relaxed text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showProductsError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
          </Field>

          {/* About (optional) */}
          <Field
            label="About the Business"
            htmlFor="content-about"
            optional
            error={showAboutError ? ABOUT_MSG[aboutError!] : undefined}
            errorId="content-about-error"
            helper="Tell us anything else that will help us understand your business."
            hint={
              aboutLen >= ABOUT_COUNTER_AT ? (
                <span
                  className={cn(
                    "text-[12px] tabular-nums",
                    aboutLen > ABOUT_MAX
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {aboutLen}/{ABOUT_MAX}
                </span>
              ) : null
            }
          >
            <textarea
              id="content-about"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
                clearCheckpoint();
              }}
              onBlur={() => setTouched((t) => ({ ...t, about: true }))}
              rows={4}
              maxLength={1200}
              placeholder="Story, values, milestones, or anything that makes your business unique."
              aria-invalid={showAboutError || undefined}
              aria-describedby={
                showAboutError ? "content-about-error" : undefined
              }
              className={cn(
                "w-full min-w-0 resize-y rounded-xl border bg-background px-4 py-3 text-[14px] leading-relaxed text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showAboutError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
          </Field>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/setup/profile"
            search={{
              plan,
              billing,
              ...(validDesignSlug ? { design: validDesignSlug } : {}),
            }}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20 sm:w-auto"
          >
            Back to Business Profile
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
                Store content is ready. The next setup step will be added
                next.
              </p>
            ) : (
              <p className="text-[12.5px] text-muted-foreground sm:text-right">
                The next setup step will be added next.
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
