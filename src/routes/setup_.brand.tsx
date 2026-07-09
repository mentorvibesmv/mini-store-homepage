import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Store } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge } from "@/components/site";
import { templates } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  useOnboardingDraft,
  hasStoreDetails,
  hasBusinessProfile,
  hasContentDetails,
  type LogoStatus,
  type StylePreference,
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

const NOTES_MAX = 500;
const NOTES_COUNTER_AT = 400;
const HEX_RE = /^#([0-9a-fA-F]{6})$/;

const STYLE_OPTIONS: { id: StylePreference; label: string; helper: string }[] =
  [
    { id: "clean", label: "Clean & Minimal", helper: "Spacious, calm, focused" },
    { id: "bold", label: "Bold & Modern", helper: "Strong, confident, punchy" },
    { id: "elegant", label: "Elegant", helper: "Refined, premium, considered" },
    { id: "playful", label: "Playful", helper: "Friendly, warm, energetic" },
  ];

export const Route = createFileRoute("/setup_/brand")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: parsePlan(search.plan),
    billing: parseBilling(search.billing),
    design: parseDesign(search.design),
  }),
  head: () => ({
    meta: [
      { title: "Brand & Style — Mini Store" },
      {
        name: "description",
        content:
          "Share brand preferences so we can prepare a store that fits your business.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BrandSetupPage,
});

function BrandSetupPage() {
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
              to="/setup/content"
              search={{
                plan,
                billing,
                design: validDesignSlug,
              }}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Content Setup
            </Link>
          )}

          <div className="mt-6">
            <Badge>Brand & Style</Badge>
            <h1 className="mt-5 text-[32px] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Shape Your Store's Look
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Share your brand preferences so we can prepare a store that
              feels right for your business.
            </p>
          </div>

          {!plan ? (
            <ChoosePlanState />
          ) : !hasStoreDetails(draft) ? (
            <MissingState
              title="Complete Store Details First"
              body="Add your basic store details before choosing brand preferences."
              actionLabel="Go to Store Details"
              to="/setup"
              plan={plan}
              billing={billing}
              validDesignSlug={validDesignSlug}
            />
          ) : !hasBusinessProfile(draft) ? (
            <MissingState
              title="Complete Business Profile First"
              body="Add your business profile before choosing brand preferences."
              actionLabel="Go to Business Profile"
              to="/setup/profile"
              plan={plan}
              billing={billing}
              validDesignSlug={validDesignSlug}
            />
          ) : !hasContentDetails(draft) ? (
            <MissingState
              title="Complete Store Content First"
              body="Add your store content before choosing brand preferences."
              actionLabel="Go to Content Setup"
              to="/setup/content"
              plan={plan}
              billing={billing}
              validDesignSlug={validDesignSlug}
            />
          ) : (
            <BrandForm
              plan={plan}
              billing={billing}
              design={validDesign}
              validDesignSlug={validDesignSlug}
              businessName={draft.storeDetails!.businessName}
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
        <Link
          to="/pricing"
          search={{ design: undefined }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
        >
          View Plans
        </Link>
      </div>
    </div>
  );
}

function MissingState({
  title,
  body,
  actionLabel,
  to,
  plan,
  billing,
  validDesignSlug,
}: {
  title: string;
  body: string;
  actionLabel: string;
  to: "/setup" | "/setup/profile" | "/setup/content";
  plan: PlanId;
  billing: Billing;
  validDesignSlug: string | undefined;
}) {
  return (
    <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">
        {body}
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          to={to}
          search={{
            plan,
            billing,
            design: validDesignSlug,
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}

// -- Validation ----------------------------------------------------------

function normalizeHex(v: string): string {
  const t = v.trim();
  if (t === "") return "";
  return t.startsWith("#") ? "#" + t.slice(1).toUpperCase() : t.toUpperCase();
}
function isValidHexOrEmpty(v: string): boolean {
  const t = v.trim();
  if (t === "") return true;
  return HEX_RE.test(t);
}

function BrandForm({
  plan,
  billing,
  design,
  validDesignSlug,
  businessName,
}: {
  plan: PlanId;
  billing: Billing;
  design: (typeof templates)[number] | undefined;
  validDesignSlug: string | undefined;
  businessName: string;
}) {
  const { draft, setBrandDetails } = useOnboardingDraft();
  const existing = draft.brandDetails;
  const navigate = useNavigate();

  const [logoStatus, setLogoStatus] = useState<LogoStatus | "">(
    existing?.logoStatus ?? "",
  );
  const [brandColor, setBrandColor] = useState(existing?.brandColor ?? "");
  const [stylePreference, setStylePreference] = useState<
    StylePreference | ""
  >(existing?.stylePreference ?? "");
  const [notes, setNotes] = useState(existing?.specialDesignNotes ?? "");

  const [touched, setTouched] = useState({
    logo: false,
    color: false,
    notes: false,
  });
  const [attempted, setAttempted] = useState(false);

  const logoError = logoStatus === "" ? "required" : null;
  const colorError = !isValidHexOrEmpty(brandColor) ? "invalid" : null;
  const notesError = notes.length > NOTES_MAX ? "long" : null;

  const allValid = !logoError && !colorError && !notesError;

  const showLogoError = (touched.logo || attempted) && !!logoError;
  const showColorError = (touched.color || attempted) && !!colorError;
  const showNotesError = (touched.notes || attempted) && !!notesError;

  const notesLen = notes.length;

  const clearCheckpoint = () => {};

  const handleContinue = () => {
    if (!allValid) {
      setAttempted(true);
      return;
    }
    setBrandDetails({
      logoStatus: logoStatus as LogoStatus,
      brandColor: normalizeHex(brandColor),
      stylePreference: stylePreference,
      specialDesignNotes: notes.trim(),
    });
    navigate({
      to: "/setup/review",
      search: { plan, billing, design: validDesignSlug },
    });
  };


  const summaryItems = useMemo(
    () => [
      { label: "Business", value: businessName },
      ...(design
        ? [{ label: "Selected Design", value: design.title }]
        : []),
    ],
    [businessName, design],
  );

  return (
    <div className="mt-10 space-y-6">
      {/* Compact context summary */}
      <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-soft sm:p-5">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Store className="h-3.5 w-3.5 text-primary" />
          Context
        </div>
        <dl className="mt-2 grid gap-2 sm:grid-cols-2">
          {summaryItems.map((s) => (
            <div key={s.label} className="min-w-0">
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-0.5 truncate text-[13.5px] font-semibold text-foreground">
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
          Brand & Style
        </h2>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          These preferences help us prepare a store that fits your business.
        </p>

        <div className="mt-6 grid min-w-0 gap-6">
          {/* Logo status */}
          <fieldset
            className="min-w-0"
            aria-describedby={showLogoError ? "brand-logo-error" : undefined}
            aria-invalid={showLogoError || undefined}
            onBlur={() => setTouched((t) => ({ ...t, logo: true }))}
          >
            <legend className="mb-1.5 text-[13px] font-medium text-foreground">
              Do You Have a Logo?
              <span className="ml-0.5 text-primary">*</span>
            </legend>
            <div
              role="radiogroup"
              aria-label="Do you have a logo?"
              className="grid gap-3 sm:grid-cols-2"
            >
              {([
                { id: "have", label: "Yes, I have a logo" },
                { id: "none", label: "No, not yet" },
              ] as const).map((opt) => {
                const selected = logoStatus === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setLogoStatus(opt.id);
                      setTouched((t) => ({ ...t, logo: true }));
                      clearCheckpoint();
                    }}
                    className={cn(
                      "flex min-w-0 items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left shadow-soft transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                      selected
                        ? "border-primary bg-primary-soft/60 text-foreground"
                        : "border-border bg-background text-foreground hover:border-foreground/20",
                    )}
                  >
                    <span className="min-w-0 truncate text-[14px] font-medium">
                      {opt.label}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                        selected
                          ? "border-primary bg-primary"
                          : "border-border bg-background",
                      )}
                    >
                      {selected && (
                        <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            {showLogoError && (
              <p
                id="brand-logo-error"
                role="alert"
                className="mt-1.5 text-[12.5px] text-destructive"
              >
                Choose a logo option.
              </p>
            )}
          </fieldset>

          {/* Brand color */}
          <div className="min-w-0">
            <label
              htmlFor="brand-color-hex"
              className="mb-1.5 block text-[13px] font-medium text-foreground"
            >
              Brand Color
              <span className="ml-1.5 text-[11.5px] font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <p className="mb-2 text-[12.5px] text-muted-foreground">
              Choose a color that represents your business, or leave it blank.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="color"
                aria-label="Pick brand color"
                value={HEX_RE.test(brandColor) ? brandColor : "#7C3AED"}
                onChange={(e) => {
                  setBrandColor(e.target.value.toUpperCase());
                  clearCheckpoint();
                }}
                className="h-11 w-14 shrink-0 cursor-pointer rounded-xl border border-border bg-background p-1 shadow-soft"
              />
              <input
                id="brand-color-hex"
                type="text"
                inputMode="text"
                value={brandColor}
                onChange={(e) => {
                  setBrandColor(e.target.value);
                  clearCheckpoint();
                }}
                onBlur={() => {
                  setBrandColor((v) => normalizeHex(v));
                  setTouched((t) => ({ ...t, color: true }));
                }}
                placeholder="#7C3AED"
                maxLength={7}
                aria-invalid={showColorError || undefined}
                aria-describedby={
                  showColorError ? "brand-color-error" : undefined
                }
                className={cn(
                  "min-w-0 flex-1 rounded-xl border bg-background px-4 py-3 text-[14px] text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                  showColorError
                    ? "border-destructive/70 focus:border-destructive"
                    : "border-border focus:border-primary/60",
                )}
              />
            </div>
            {showColorError && (
              <p
                id="brand-color-error"
                role="alert"
                className="mt-1.5 text-[12.5px] text-destructive"
              >
                Enter a valid 6-digit hex color.
              </p>
            )}
          </div>

          {/* Style preference */}
          <div className="min-w-0">
            <div className="mb-1.5 text-[13px] font-medium text-foreground">
              Style Preference
              <span className="ml-1.5 text-[11.5px] font-normal text-muted-foreground">
                (optional)
              </span>
            </div>
            <p className="mb-2 text-[12.5px] text-muted-foreground">
              Optional — your selected design remains the main visual
              direction.
            </p>
            <div
              role="radiogroup"
              aria-label="Style preference"
              className="grid gap-2.5 sm:grid-cols-2"
            >
              {STYLE_OPTIONS.map((opt) => {
                const selected = stylePreference === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setStylePreference((prev) =>
                        prev === opt.id ? "" : opt.id,
                      );
                      clearCheckpoint();
                    }}
                    className={cn(
                      "flex min-w-0 flex-col items-start gap-0.5 rounded-2xl border px-4 py-3 text-left shadow-soft transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                      selected
                        ? "border-primary bg-primary-soft/60"
                        : "border-border bg-background hover:border-foreground/20",
                    )}
                  >
                    <span className="text-[13.5px] font-semibold text-foreground">
                      {opt.label}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      {opt.helper}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special design notes */}
          <div className="min-w-0">
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <label
                htmlFor="brand-notes"
                className="block text-[13px] font-medium text-foreground"
              >
                Special Design Notes
                <span className="ml-1.5 text-[11.5px] font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              {notesLen >= NOTES_COUNTER_AT && (
                <span
                  className={cn(
                    "text-[12px] tabular-nums",
                    notesLen > NOTES_MAX
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {notesLen}/{NOTES_MAX}
                </span>
              )}
            </div>
            <p className="mb-1.5 text-[12.5px] text-muted-foreground">
              Share any visual preferences or requests we should keep in mind.
            </p>
            <textarea
              id="brand-notes"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                clearCheckpoint();
              }}
              onBlur={() => setTouched((t) => ({ ...t, notes: true }))}
              rows={4}
              maxLength={800}
              placeholder="e.g. Warm tones, avoid busy patterns, keep it approachable."
              aria-invalid={showNotesError || undefined}
              aria-describedby={
                showNotesError ? "brand-notes-error" : undefined
              }
              className={cn(
                "w-full min-w-0 resize-y rounded-xl border bg-background px-4 py-3 text-[14px] leading-relaxed text-foreground shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
                showNotesError
                  ? "border-destructive/70 focus:border-destructive"
                  : "border-border focus:border-primary/60",
              )}
            />
            {showNotesError && (
              <p
                id="brand-notes-error"
                role="alert"
                className="mt-1.5 text-[12.5px] text-destructive"
              >
                Use {NOTES_MAX} characters or fewer.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            to="/setup/content"
            search={{
              plan,
              billing,
              design: validDesignSlug,
            }}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-foreground/20 sm:w-auto"
          >
            Back to Content Setup
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
                Brand preferences are ready. Review and confirmation is the
                next setup step.
              </p>
            ) : (
              <p className="text-[12.5px] text-muted-foreground sm:text-right">
                Review and confirmation is the next setup step.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
