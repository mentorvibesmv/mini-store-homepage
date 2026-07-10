// Generated Store Preview route.
//
// Consumes the current onboarding draft (via OnboardingDraftContext) plus the
// URL-driven plan/billing/design search params, runs the pure Launch Engine
// pipeline (buildLaunchInput → toStoreConfig → renderer registry), and
// renders the resulting Mini Store. This route never persists or mutates
// state; it only reads from the draft and the URL.
//
// Gating: all Launch Engine processing is gated on the OnboardingDraft
// hydration flag. Until sessionStorage restoration has completed we render a
// neutral "Preparing your preview…" state so no consumer can observe a false
// missing-draft state before hydration finishes.

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useOnboardingDraft } from "@/lib/onboarding-draft";
import { buildLaunchInput } from "@/lib/launch/build-launch-input";
import { toStoreConfig } from "@/lib/launch/to-store-config";
import { getRendererForTemplate } from "@/lib/launch/renderer-registry";
import type { LaunchFailureReason } from "@/lib/launch/types";

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

export const Route = createFileRoute("/store/preview")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: parsePlan(search.plan),
    billing: parseBilling(search.billing),
    design: parseDesign(search.design),
  }),
  head: () => ({
    meta: [
      { title: "Your Mini Store Preview" },
      {
        name: "description",
        content: "Preview of your generated Mini Store.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StorePreviewPage,
});

function StorePreviewPage() {
  const { plan, billing, design } = Route.useSearch();
  const { draft, hydrated } = useOnboardingDraft();

  // Gate: do not run any Launch Engine logic before hydration completes.
  if (!hydrated) {
    return <PreparingState />;
  }

  return (
    <PreviewContent
      plan={plan}
      billing={billing}
      designSlug={design}
      draft={draft}
    />
  );
}

function PreviewContent({
  plan,
  billing,
  designSlug,
  draft,
}: {
  plan: PlanId | undefined;
  billing: Billing;
  designSlug: string | undefined;
  draft: ReturnType<typeof useOnboardingDraft>["draft"];
}) {
  // Memoize so a re-render (e.g. from user focus events) does not rebuild
  // an identical snapshot each time.
  const built = useMemo(
    () =>
      buildLaunchInput({
        plan,
        billing,
        designSlug,
        draft,
      }),
    [plan, billing, designSlug, draft],
  );

  if (!built.ok) {
    return <FailureState reason={built.reason} plan={plan} billing={billing} />;
  }

  const configResult = toStoreConfig(built.value);
  if (!configResult.ok) {
    return (
      <FailureState reason={configResult.reason} plan={plan} billing={billing} />
    );
  }

  const config = configResult.value;
  const Renderer = getRendererForTemplate(config.template.slug);

  if (!Renderer) {
    return (
      <NotLaunchableState
        templateTitle={config.template.title}
        plan={plan}
        billing={billing}
        designSlug={config.template.slug}
      />
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      <Renderer config={config} />
    </div>
  );
}

function PreparingState() {
  return (
    <main
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-background px-6 py-16"
    >
      <div className="max-w-md text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Just a moment
        </p>
        <h1 className="mt-3 text-2xl font-bold text-foreground">
          Preparing your preview…
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Loading your store details.
        </p>
      </div>
    </main>
  );
}

type FailureCopy = {
  title: string;
  body: string;
  actionLabel: string;
  to: "/pricing" | "/setup" | "/setup/profile" | "/setup/content" | "/setup/brand" | "/setup/review";
};

function copyForReason(reason: LaunchFailureReason): FailureCopy {
  switch (reason) {
    case "invalid_plan":
    case "invalid_billing":
      return {
        title: "Choose a Plan First",
        body: "Pick a Mini Store plan to preview your store.",
        actionLabel: "View Plans",
        to: "/pricing",
      };
    case "missing_store_details":
      return {
        title: "Complete Store Details First",
        body: "Add your basic store details before previewing.",
        actionLabel: "Go to Store Details",
        to: "/setup",
      };
    case "missing_business_profile":
      return {
        title: "Complete Business Profile First",
        body: "Add your business profile before previewing.",
        actionLabel: "Go to Business Profile",
        to: "/setup/profile",
      };
    case "missing_content":
      return {
        title: "Complete Store Content First",
        body: "Add your store content before previewing.",
        actionLabel: "Go to Content Setup",
        to: "/setup/content",
      };
    case "missing_brand":
      return {
        title: "Complete Brand & Style First",
        body: "Add your brand preferences before previewing.",
        actionLabel: "Go to Brand & Style",
        to: "/setup/brand",
      };
    case "missing_design":
    case "invalid_design":
      return {
        title: "Choose a Design First",
        body: "Pick a design to preview your Mini Store.",
        actionLabel: "Browse Designs",
        to: "/pricing",
      };
    case "template_not_resolved":
      return {
        title: "Design Unavailable",
        body: "The selected design could not be loaded. Please pick another.",
        actionLabel: "Browse Designs",
        to: "/pricing",
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
  billing: Billing;
}) {
  const copy = copyForReason(reason);

  // Preserve plan/billing where they are already valid; the target route will
  // ignore anything that no longer applies.
  const search: Record<string, unknown> = { design: undefined };
  if (plan) {
    search.plan = plan;
    search.billing = billing;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
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
    </main>
  );
}

function NotLaunchableState({
  templateTitle,
  plan,
  billing,
  designSlug,
}: {
  templateTitle: string;
  plan: PlanId | undefined;
  billing: Billing;
  designSlug: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Preview unavailable
        </p>
        <h1 className="mt-3 text-xl font-bold text-foreground">
          {templateTitle} isn't launch-ready yet
        </h1>
        <p className="mx-auto mt-2 text-[14px] text-muted-foreground">
          A live preview for this design is coming soon. You can pick a
          different design to preview now.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/pricing"
            search={{ design: designSlug }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20"
          >
            Browse Designs
          </Link>
          {plan && (
            <Link
              to="/setup/review"
              search={{ plan, billing, design: designSlug }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              Back to Review
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
