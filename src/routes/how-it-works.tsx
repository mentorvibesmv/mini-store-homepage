import { createFileRoute } from "@tanstack/react-router";
import {
  Check, ShieldCheck, Headphones, GitFork, LayoutTemplate, FileEdit,
  Code2, ClipboardCheck, Rocket, Target, Zap, BarChart3, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Button } from "@/components/site";
import { howItWorksPage } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Mini Store" },
      { name: "description", content: "See how Mini Store works from choosing a template or custom website to going live — a simple, transparent 7-step process." },
      { property: "og:title", content: "How It Works — Mini Store" },
      { property: "og:description", content: "A simple, transparent process for launching your business website — from choosing your path to ongoing support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

const heroIcon: Record<string, LucideIcon> = {
  check: Check, shield: ShieldCheck, headset: Headphones,
};
const stepIcon: Record<string, LucideIcon> = {
  path: GitFork, browser: LayoutTemplate, form: FileEdit, code: Code2,
  review: ClipboardCheck, rocket: Rocket, headset: Headphones,
};
const valueIcon: Record<string, LucideIcon> = {
  target: Target, shield: ShieldCheck, bolt: Zap, chart: BarChart3,
};

const toneSoft: Record<string, string> = {
  violet: "bg-[color:var(--tone-violet)] text-[oklch(0.45_0.18_290)]",
  green: "bg-[color:var(--tone-green)] text-[oklch(0.45_0.13_155)]",
  orange: "bg-[color:var(--tone-orange)] text-[oklch(0.5_0.15_55)]",
  blue: "bg-[color:var(--tone-blue)] text-[oklch(0.45_0.15_240)]",
};
const toneBadge: Record<string, string> = {
  violet: "bg-[oklch(0.62_0.19_290)] text-white",
  green: "bg-[oklch(0.6_0.15_155)] text-white",
  orange: "bg-[oklch(0.68_0.17_55)] text-white",
  blue: "bg-[oklch(0.62_0.17_240)] text-white",
};

function HowItWorksPage() {
  return (
    <SiteLayout>
      <HowHero />
      <ProcessJourney />
      <BuiltAroundYou />
      <ProcessCTA />
    </SiteLayout>
  );
}

// ---------- Hero ----------
function HowHero() {
  const h = howItWorksPage.hero;
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-medium text-accent-foreground">
              {h.badge}
            </span>
            <h1 className="mt-5 whitespace-pre-line text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
              {h.headingPre}
              <span
                className="bg-gradient-to-r from-[oklch(0.55_0.22_290)] to-[oklch(0.55_0.2_240)] bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {h.headingGradient}
              </span>
              {h.headingPost}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {h.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {h.trustPoints.map((t) => {
                const Icon = heroIcon[t.icon] ?? Check;
                return (
                  <li key={t.id} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-soft text-primary">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {t.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary-soft/60 blur-2xl" />
            <img
              src={h.image.src}
              alt={h.image.alt}
              width={h.image.width}
              height={h.image.height}
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ---------- Section header ----------
function EyebrowHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// ---------- Process Journey (7 steps) ----------
function ProcessJourney() {
  const p = howItWorksPage.process;
  return (
    <Section>
      <Container>
        <EyebrowHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />

        {/* Icons row + connectors (desktop) */}
        <div className="mt-12 hidden lg:block">
          <div className="relative grid grid-cols-7 gap-3">
            {p.steps.map((s, i) => {
              const Icon = stepIcon[s.icon] ?? Rocket;
              return (
                <div key={s.id} className="relative flex items-center justify-center">
                  <div className={cn("grid h-20 w-20 place-items-center rounded-full", toneSoft[s.tone])}>
                    <Icon className="h-8 w-8" />
                  </div>
                  {i < p.steps.length - 1 && (
                    <div className="pointer-events-none absolute left-[calc(50%+2.75rem)] right-[-1.25rem] top-1/2 flex -translate-y-1/2 items-center">
                      <div className="h-px flex-1 border-t border-dashed border-border" />
                      <ArrowRight className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cards */}
          <div className="mt-5 grid grid-cols-7 gap-3">
            {p.steps.map((s) => (
              <StepCard key={s.id} step={s} />
            ))}
          </div>
        </div>

        {/* Tablet: 2 rows */}
        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:hidden">
          {p.steps.map((s) => (
            <div key={s.id}>
              <StepIconLg step={s} />
              <div className="mt-4">
                <StepCard step={s} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single column vertical */}
        <ol className="mt-10 grid gap-5 sm:hidden">
          {p.steps.map((s, i) => (
            <li key={s.id} className="relative">
              <div className="flex items-start gap-4">
                <StepIconLg step={s} />
                <div className="flex-1">
                  <StepCard step={s} />
                </div>
              </div>
              {i < p.steps.length - 1 && (
                <div className="ml-10 h-4 border-l-2 border-dashed border-border" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function StepIconLg({ step }: { step: typeof howItWorksPage.process.steps[number] }) {
  const Icon = stepIcon[step.icon] ?? Rocket;
  return (
    <div className={cn("grid h-16 w-16 shrink-0 place-items-center rounded-full", toneSoft[step.tone])}>
      <Icon className="h-7 w-7" />
    </div>
  );
}

function StepCard({ step }: { step: typeof howItWorksPage.process.steps[number] }) {
  return (
    <div className="relative h-full rounded-2xl border border-border bg-card p-4 pt-6 text-center transition-all hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-soft">
      <span
        className={cn(
          "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide",
          toneBadge[step.tone],
        )}
      >
        {step.number}
      </span>
      <h3 className="mt-1 text-[14px] font-semibold leading-tight text-foreground">{step.title}</h3>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{step.description}</p>
    </div>
  );
}

// ---------- Built Around You ----------
function BuiltAroundYou() {
  const v = howItWorksPage.values;
  return (
    <Section>
      <Container>
        <EyebrowHeader eyebrow={v.eyebrow} title={v.title} description={v.description} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {v.items.map((item) => {
            const Icon = valueIcon[item.icon] ?? Target;
            return (
              <div
                key={item.id}
                className="h-full rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-foreground/15 hover:shadow-soft"
              >
                <div className={cn("mx-auto grid h-14 w-14 place-items-center rounded-2xl", toneSoft[item.tone])}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

// ---------- CTA ----------
function ProcessCTA() {
  const c = howItWorksPage.cta;
  return (
    <Section>
      <Container>
        <div className="overflow-hidden rounded-3xl border border-border bg-primary-soft/70 p-8 sm:p-10 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {c.title}
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">{c.description}</p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {c.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href={c.primary.href}>
                  {c.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={c.illustration.src}
                alt={c.illustration.alt}
                width={c.illustration.width}
                height={c.illustration.height}
                loading="lazy"
                className="mx-auto w-full max-w-md rounded-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
