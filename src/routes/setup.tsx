import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Store } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge, Button } from "@/components/site";
import { templates } from "@/data/site";

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
  return (
    <div className="mt-10 space-y-6">
      {/* Compact summary */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Store className="h-3.5 w-3.5 text-primary" />
          Your Selection
        </div>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryItem label="Selected Plan" value={PLAN_LABEL[plan]} />
          <SummaryItem
            label="Billing"
            value={billing === "annual" ? "Annual billing" : "Monthly billing"}
          />
          {design && (
            <SummaryItem label="Selected Design" value={design.title} />
          )}
        </dl>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
      >
        <h2 className="text-[18px] font-bold text-foreground">
          Store Details
        </h2>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          These details help us prepare your Mini Store.
        </p>

        <div className="mt-6 grid min-w-0 gap-5">
          <Field label="Business / Store Name" htmlFor="store-name" required>
            <input
              id="store-name"
              type="text"
              required
              placeholder="e.g. Bava Fashion"
              className="w-full min-w-0 rounded-xl border border-border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
            />
          </Field>

          <Field label="Business Category" htmlFor="business-category" required>
            <select
              id="business-category"
              required
              defaultValue=""
              className="w-full min-w-0 rounded-xl border border-border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
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

          <Field label="WhatsApp Number" htmlFor="whatsapp" required>
            <div className="flex min-w-0 items-stretch overflow-hidden rounded-xl border border-border bg-background shadow-soft focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-ring/40">
              <span className="inline-flex shrink-0 items-center gap-1 border-r border-border bg-primary-soft/60 px-3 text-[14px] font-medium text-foreground">
                +91
              </span>
              <input
                id="whatsapp"
                type="tel"
                inputMode="tel"
                required
                placeholder="98765 43210"
                className="w-full min-w-0 bg-transparent px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
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
              disabled
              aria-disabled="true"
              className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground opacity-60 shadow-soft sm:w-auto"
            >
              Continue
            </button>
            <p className="text-[12.5px] text-muted-foreground sm:text-right">
              Store details submission is the next step.
            </p>
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
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[13px] font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}
