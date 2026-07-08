import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ShoppingCart, Briefcase } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge, Button } from "@/components/site";
import { pricingPage, templates } from "@/data/site";
import { cn } from "@/lib/utils";

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

export const Route = createFileRoute("/pricing_/start")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: parsePlan(search.plan),
    billing: parseBilling(search.billing),
    design: parseDesign(search.design),
  }),
  head: () => ({
    meta: [
      { title: "Start Your Mini Store — Mini Store" },
      {
        name: "description",
        content:
          "Review your selected Mini Store plan and billing choice before continuing setup.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PricingStartPage,
});

function PricingStartPage() {
  const { plan, billing, design } = Route.useSearch();
  const validDesign = design
    ? templates.find((t) => t.slug === design && t.visible)?.slug
    : undefined;

  return (
    <SiteLayout>
      <Section className="bg-hero">
        <Container className="max-w-3xl">
          <Link
            to="/pricing"
            search={validDesign ? { design: validDesign } : {}}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pricing
          </Link>

          <div className="mt-6">
            <Badge>Plan Selected</Badge>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start Your Mini Store
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Review your selected plan and billing choice before continuing setup.
            </p>
          </div>

          {plan ? (
            <PlanSummary plan={plan} billing={billing} designSlug={design} />
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
      <h2 className="text-xl font-bold text-foreground">Choose a Plan</h2>
      <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">
        Pick a Mini Store plan to continue. You can compare options and pricing on the Pricing
        page.
      </p>
      <div className="mt-6 flex justify-center">
        <Button href="/pricing">View Plans</Button>
      </div>
    </div>
  );
}

function PlanSummary({
  plan,
  billing,
  designSlug,
}: {
  plan: PlanId;
  billing: Billing;
  designSlug?: string;
}) {
  const data = pricingPage.plans[plan];
  const Icon = plan === "starter" ? ShoppingCart : Briefcase;

  const price = billing === "annual" ? data.annualPrice : data.monthlyPrice;
  const cadenceLabel = billing === "annual" ? "per year" : "per month";
  const billingLabel = billing === "annual" ? "Annual billing" : "Monthly billing";

  const design =
    designSlug !== undefined
      ? templates.find((t) => t.slug === designSlug && t.visible)
      : undefined;
  const validDesignSlug = design?.slug;

  return (
    <div className="mt-10 space-y-6">
      <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
        <div className="flex items-start gap-4">
          <span
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
              plan === "starter" ? "bg-[color:var(--tone-green)]" : "bg-[color:var(--tone-blue)]",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                plan === "starter"
                  ? "text-[oklch(0.45_0.13_155)]"
                  : "text-[oklch(0.45_0.15_240)]",
              )}
            />
          </span>
          <div className="min-w-0">
            <div className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Selected Plan
            </div>
            <h2 className="mt-1 text-[20px] font-bold text-foreground">{data.name}</h2>
            <p className="mt-1 text-[13.5px] text-muted-foreground">{data.subtitle}</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <SummaryRow label="Billing" value={billingLabel} />
          <SummaryRow label="Subscription" value={`${price} ${cadenceLabel}`} />
          {plan === "business" && (
            <SummaryRow
              label="Setup fee"
              value={`${pricingPage.plans.business.setupPrice} one-time`}
            />
          )}
          {design && <SummaryRow label="Selected Design" value={design.title} />}
        </dl>

        {plan === "business" && (
          <p className="mt-4 text-[12.5px] text-muted-foreground">
            Domain registration cost is separate.
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
        <h3 className="text-[16px] font-bold text-foreground">What&apos;s included</h3>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {data.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-[13.5px] text-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/pricing"
          search={validDesignSlug ? { design: validDesignSlug } : {}}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20"
        >
          Change Plan
        </Link>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Link
            to="/setup"
            search={{
              plan,
              billing,
              ...(validDesignSlug ? { design: validDesignSlug } : {}),
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            Continue Setup
          </Link>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-primary-soft/50 px-4 py-3">
      <dt className="text-[11.5px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-[14px] font-semibold text-foreground">{value}</dd>
    </div>
  );
}
