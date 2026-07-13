import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Tag,
  Headphones,
  Wallet,
  Clock,
  Code2,
  BarChart3,
  Monitor,
  PenTool,
  ShieldCheck,
  Search,
  FileText,
  Eye,
  Rocket,
  Lock,
  Users,
  RefreshCw,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Button } from "@/components/site";
import { aboutPage } from "@/data/site";
import { cn } from "@/lib/utils";

import { pageSeo, jsonLd, webPageSchema, breadcrumbSchema } from "@/lib/seo";

const TITLE = "About Mini Store — Website Studio & Template Marketplace";
const DESCRIPTION =
  "Mini Store makes professional websites simple, affordable and accessible for every small business in India. Learn about our mission, process, and promise.";

export const Route = createFileRoute("/about")({
  head: () => {
    const seo = pageSeo({ path: "/about", title: TITLE, description: DESCRIPTION });
    return {
      ...seo,
      scripts: [
        jsonLd(
          webPageSchema({
            path: "/about",
            name: TITLE,
            description: DESCRIPTION,
            type: "AboutPage",
          }),
        ),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ),
      ],
    };
  },
  component: AboutPage,
});

// ---------- icon + tone maps ----------
const trustIcon: Record<string, LucideIcon> = {
  check: Check,
  tag: Tag,
  headset: Headphones,
};
const principleIcon: Record<string, LucideIcon> = {
  wallet: Wallet,
  clock: Clock,
  code: Code2,
  chart: BarChart3,
};
const capabilityIcon: Record<string, LucideIcon> = {
  monitor: Monitor,
  pen: PenTool,
  shield: ShieldCheck,
  headset: Headphones,
};
const journeyIcon: Record<string, LucideIcon> = {
  search: Search,
  file: FileText,
  pen: PenTool,
  eye: Eye,
  rocket: Rocket,
};
const promiseIcon: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  lock: Lock,
  users: Users,
  rocket: Rocket,
  refresh: RefreshCw,
};

const toneSoft: Record<string, string> = {
  violet: "bg-[color:var(--tone-violet)] text-[oklch(0.45_0.18_290)]",
  green: "bg-[color:var(--tone-green)] text-[oklch(0.45_0.13_155)]",
  orange: "bg-[color:var(--tone-orange)] text-[oklch(0.5_0.15_55)]",
  blue: "bg-[color:var(--tone-blue)] text-[oklch(0.45_0.15_240)]",
  pink: "bg-[color:var(--tone-pink)] text-[oklch(0.5_0.15_355)]",
  amber: "bg-[color:var(--tone-amber)] text-[oklch(0.5_0.15_75)]",
  sky: "bg-[color:var(--tone-sky)] text-[oklch(0.45_0.13_220)]",
};

const toneSolid: Record<string, string> = {
  violet: "bg-[oklch(0.62_0.19_290)] text-white",
  green: "bg-[oklch(0.6_0.15_155)] text-white",
  orange: "bg-[oklch(0.68_0.17_55)] text-white",
  blue: "bg-[oklch(0.62_0.17_240)] text-white",
  amber: "bg-[oklch(0.7_0.16_75)] text-white",
};

// ---------- Page ----------
function AboutPage() {
  return (
    <SiteLayout>
      <AboutHero />
      <MissionSection />
      <CapabilitiesSection />
      <JourneySection />
      <PromiseSection />
      <FinalCta />
    </SiteLayout>
  );
}

// ---------- Hero ----------
function AboutHero() {
  const h = aboutPage.hero;
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-medium text-accent-foreground">
              {h.badge}
            </span>
            <h1 className="mt-5 text-[32px] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
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
                const Icon = trustIcon[t.icon];
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

// ---------- Section eyebrow header ----------
function EyebrowHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// ---------- Mission ----------
function MissionSection() {
  const m = aboutPage.mission;
  return (
    <Section>
      <Container>
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 lg:p-12 shadow-soft">
          <EyebrowHeader eyebrow={m.eyebrow} title={m.title} description={m.description} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {m.principles.map((p) => {
              const Icon = principleIcon[p.icon];
              return (
                <div
                  key={p.id}
                  className={cn(
                    "rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-soft",
                    toneSoft[p.tone].split(" ")[0],
                  )}
                >
                  <div
                    className={cn(
                      "mx-auto grid h-14 w-14 place-items-center rounded-full",
                      toneSolid[p.tone],
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-[15px] font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ---------- Capabilities ----------
function CapabilitiesSection() {
  const c = aboutPage.capabilities;
  return (
    <Section>
      <Container>
        <EyebrowHeader eyebrow={c.eyebrow} title={c.title} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item) => {
            const Icon = capabilityIcon[item.icon];
            const inner = (
              <div className="h-full rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-foreground/15 hover:shadow-soft">
                <div
                  className={cn(
                    "mx-auto grid h-14 w-14 place-items-center rounded-2xl",
                    toneSoft[item.tone],
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
            return item.href ? (
              <a key={item.id} href={item.href} className="block h-full">
                {inner}
              </a>
            ) : (
              <div key={item.id} className="h-full">
                {inner}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

// ---------- Journey ----------
function JourneySection() {
  const j = aboutPage.journey;
  return (
    <Section>
      <Container>
        <EyebrowHeader eyebrow={j.eyebrow} title={j.title} />
        <div className="relative mt-12">
          {/* dotted connector — desktop only */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden border-t-2 border-dashed border-border lg:block" />
          <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {j.steps.map((s) => {
              const Icon = journeyIcon[s.icon];
              return (
                <li key={s.id} className="relative text-center">
                  <div
                    className={cn(
                      "relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full",
                      toneSoft[s.tone],
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="mt-5 text-sm font-semibold text-foreground">
                    {s.number}. {s.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

// ---------- Promise ----------
function PromiseSection() {
  const p = aboutPage.promises;
  return (
    <Section>
      <Container>
        <EyebrowHeader eyebrow={p.eyebrow} title={p.title} />
        <div className="mt-10 rounded-3xl border border-border bg-surface p-8 sm:p-10 shadow-soft">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {p.items.map((it) => {
              const Icon = promiseIcon[it.icon];
              return (
                <div key={it.id} className="text-center">
                  <div
                    className={cn(
                      "mx-auto grid h-14 w-14 place-items-center rounded-full",
                      toneSoft[it.tone],
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {it.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ---------- Final CTA ----------
function FinalCta() {
  const c = aboutPage.cta;
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
