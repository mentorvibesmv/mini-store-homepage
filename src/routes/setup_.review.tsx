import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Store } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge } from "@/components/site";
import { templates } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  useOnboardingDraft,
  hasStoreDetails,
  hasBusinessProfile,
  hasContentDetails,
  hasBrandDetails,
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

const BILLING_LABEL: Record<Billing, string> = {
  monthly: "Monthly",
  annual: "Annual",
};

const STYLE_LABEL: Record<string, string> = {
  clean: "Clean & Minimal",
  bold: "Bold & Modern",
  elegant: "Elegant",
  playful: "Playful",
};

export const Route = createFileRoute("/setup_/review")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: parsePlan(search.plan),
    billing: parseBilling(search.billing),
    design: parseDesign(search.design),
  }),
  head: () => ({
    meta: [
      { title: "Review Your Mini Store — Mini Store" },
      {
        name: "description",
        content:
          "Check the details you've shared before we prepare your Mini Store.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReviewPage,
});

function ReviewPage() {
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
              to="/setup/brand"
              search={{ plan, billing, design: validDesignSlug }}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Brand & Style
            </Link>
          )}

          <div className="mt-6">
            <Badge>Review & Confirm</Badge>
            <h1 className="mt-5 text-[32px] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Review Your Mini Store
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Check your details before we prepare your store.
            </p>
          </div>

          {!plan ? (
            <Fallback
              title="Choose a Plan First"
              body="Pick a Mini Store plan to continue."
              actionLabel="View Plans"
              to="/pricing"
              search={{ design: undefined }}
            />
          ) : !hasStoreDetails(draft) ? (
            <Fallback
              title="Complete Store Details First"
              body="Add your basic store details before reviewing."
              actionLabel="Go to Store Details"
              to="/setup"
              search={{ plan, billing, design: validDesignSlug }}
            />
          ) : !hasBusinessProfile(draft) ? (
            <Fallback
              title="Complete Business Profile First"
              body="Add your business profile before reviewing."
              actionLabel="Go to Business Profile"
              to="/setup/profile"
              search={{ plan, billing, design: validDesignSlug }}
            />
          ) : !hasContentDetails(draft) ? (
            <Fallback
              title="Complete Store Content First"
              body="Add your store content before reviewing."
              actionLabel="Go to Content Setup"
              to="/setup/content"
              search={{ plan, billing, design: validDesignSlug }}
            />
          ) : !hasBrandDetails(draft) ? (
            <Fallback
              title="Complete Brand & Style First"
              body="Add your brand preferences before reviewing."
              actionLabel="Go to Brand & Style"
              to="/setup/brand"
              search={{ plan, billing, design: validDesignSlug }}
            />
          ) : (
            <ReviewBody
              plan={plan}
              billing={billing}
              validDesignSlug={validDesignSlug}
              designTitle={validDesign?.title}
            />
          )}
        </Container>
      </Section>
    </SiteLayout>
  );
}

function Fallback({
  title,
  body,
  actionLabel,
  to,
  search,
}: {
  title: string;
  body: string;
  actionLabel: string;
  to: "/pricing" | "/setup" | "/setup/profile" | "/setup/content" | "/setup/brand";
  search: Record<string, unknown>;
}) {
  return (
    <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">
        {body}
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={to as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          search={search as any}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}

function ReviewBody({
  plan,
  billing,
  validDesignSlug,
  designTitle,
}: {
  plan: PlanId;
  billing: Billing;
  validDesignSlug: string | undefined;
  designTitle: string | undefined;
}) {
  const { draft } = useOnboardingDraft();
  const store = draft.storeDetails!;
  const profile = draft.businessProfile!;
  const content = draft.contentDetails!;
  const brand = draft.brandDetails!;


  const editSearch = { plan, billing, design: validDesignSlug };

  return (
    <div className="mt-10 space-y-6">
      {/* Summary */}
      <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-soft sm:p-5">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Store className="h-3.5 w-3.5 text-primary" />
          Summary
        </div>
        <dl className="mt-2 grid gap-2 sm:grid-cols-3">
          <SummaryItem label="Selected Plan" value={PLAN_LABEL[plan]} />
          <SummaryItem label="Billing" value={BILLING_LABEL[billing]} />
          {designTitle && (
            <SummaryItem label="Selected Design" value={designTitle} />
          )}
        </dl>
      </div>

      {/* Store Details */}
      <ReviewCard
        title="Store Details"
        editTo="/setup"
        editSearch={editSearch}
      >
        <Field label="Business Name" value={store.businessName} />
        <Field label="Business Category" value={store.category} />
        <Field
          label="WhatsApp Number"
          value={`+91 ${store.whatsappNumber}`}
        />
      </ReviewCard>

      {/* Business Profile */}
      <ReviewCard
        title="Business Profile"
        editTo="/setup/profile"
        editSearch={editSearch}
      >
        <Field
          label="Business Description"
          value={profile.businessDescription}
          multiline
        />
        <Field label="City / Service Area" value={profile.cityOrServiceArea} />
        {profile.businessEmail.trim().length > 0 && (
          <Field label="Business Email" value={profile.businessEmail} />
        )}
        {profile.instagramUrl.trim().length > 0 && (
          <Field label="Instagram" value={profile.instagramUrl} />
        )}
      </ReviewCard>

      {/* Store Content */}
      <ReviewCard
        title="Store Content"
        editTo="/setup/content"
        editSearch={editSearch}
      >
        <Field label="Business Tagline" value={content.tagline} multiline />
        <Field
          label="Main Products / Services"
          value={content.productsOrServices}
          multiline
        />
        {content.aboutBusiness.trim().length > 0 && (
          <Field
            label="About the Business"
            value={content.aboutBusiness}
            multiline
          />
        )}
      </ReviewCard>

      {/* Brand & Style */}
      <ReviewCard
        title="Brand & Style"
        editTo="/setup/brand"
        editSearch={editSearch}
      >
        <Field
          label="Logo Status"
          value={brand.logoStatus === "have" ? "I have a logo" : "No logo yet"}
        />
        {brand.brandColor.length > 0 && (
          <div className="min-w-0">
            <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Brand Color
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span
                aria-hidden
                className="h-5 w-5 shrink-0 rounded-md border border-border shadow-soft"
                style={{ backgroundColor: brand.brandColor }}
              />
              <span className="text-[14px] font-semibold tabular-nums text-foreground">
                {brand.brandColor}
              </span>
            </div>
          </div>
        )}
        {brand.stylePreference && (
          <Field
            label="Style Preference"
            value={STYLE_LABEL[brand.stylePreference] ?? brand.stylePreference}
          />
        )}
        {brand.specialDesignNotes.trim().length > 0 && (
          <Field
            label="Special Design Notes"
            value={brand.specialDesignNotes}
            multiline
          />
        )}
      </ReviewCard>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Link
          to="/setup/brand"
          search={editSearch}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20 sm:w-auto"
        >
          Back to Brand & Style
        </Link>
        <Link
          to="/store/preview"
          search={{ plan, billing, design: validDesignSlug }}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow sm:w-auto",
          )}
        >
          Confirm & Prepare My Store
        </Link>

      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 truncate text-[13.5px] font-semibold text-foreground">
        {value}
      </dd>
    </div>
  );
}

function ReviewCard({
  title,
  editTo,
  editSearch,
  children,
}: {
  title: string;
  editTo: "/setup" | "/setup/profile" | "/setup/content" | "/setup/brand";
  editSearch: { plan: PlanId; billing: Billing; design: string | undefined };
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[18px] font-bold text-foreground">{title}</h2>
        <Link
          to={editTo}
          search={editSearch}
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-background px-3.5 py-1.5 text-[12.5px] font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20"
        >
          Edit
        </Link>
      </div>
      <dl className="mt-4 grid min-w-0 gap-4">{children}</dl>
    </section>
  );
}

function Field({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1 text-[14px] text-foreground",
          multiline
            ? "whitespace-pre-wrap break-words leading-relaxed"
            : "break-words",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
