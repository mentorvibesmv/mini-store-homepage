import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Palette, Zap, Headphones, Check, ArrowRight, Play, Code2,
  MessageSquare, FileText, CheckCircle2, Rocket,
  Briefcase, ShoppingCart, UserCircle2, Send,
  UtensilsCrossed, Home, Stethoscope, Layers,
  Plus, Minus, type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge, SectionTitle, Button } from "@/components/site";
import { customWebsitesPage } from "@/data/site";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/custom-websites")({
  head: () => ({
    meta: [
      { title: "Custom Websites — Mini Store" },
      { name: "description", content: "We build stunning, fully custom websites for your unique business. 100% custom design, fast delivery, dedicated support." },
      { property: "og:title", content: "Custom Websites — Mini Store" },
      { property: "og:description", content: "Stand out online with a custom website designed to match your brand, engage your audience, and grow your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomWebsitesPage,
});

// -------- Tone maps --------
const toneBg: Record<string, string> = {
  violet: "bg-[color:var(--tone-violet)] text-[oklch(0.45_0.18_290)]",
  blue: "bg-[color:var(--tone-blue)] text-[oklch(0.45_0.15_240)]",
  orange: "bg-[color:var(--tone-orange)] text-[oklch(0.5_0.15_55)]",
  green: "bg-[color:var(--tone-green)] text-[oklch(0.45_0.13_155)]",
  pink: "bg-[color:var(--tone-pink)] text-[oklch(0.5_0.15_355)]",
  amber: "bg-[color:var(--tone-amber)] text-[oklch(0.5_0.15_75)]",
  sky: "bg-[color:var(--tone-sky)] text-[oklch(0.45_0.13_220)]",
};

const benefitIcon: Record<string, LucideIcon> = {
  palette: Palette, zap: Zap, headset: Headphones, check: Check,
};
const processIcon: Record<string, LucideIcon> = {
  message: MessageSquare, file: FileText, code: Code2, check: CheckCircle2, rocket: Rocket,
};
const serviceIcon: Record<string, LucideIcon> = {
  briefcase: Briefcase, cart: ShoppingCart, user: UserCircle2, send: Send,
  utensils: UtensilsCrossed, home: Home, stethoscope: Stethoscope, layers: Layers,
};

function CustomWebsitesPage() {
  return (
    <SiteLayout>
      <CustomHero />
      <ProcessSteps />
      <ServiceGrid />
      <IncludedAndPricing />
      <RecentWork />
      <FAQSection />
      <FinalCta />
    </SiteLayout>
  );
}

// ============ Hero ============
function CustomHero() {
  const h = customWebsitesPage.hero;
  return (
    <section className="relative overflow-hidden bg-hero">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 right-[-8%] h-[480px] w-[480px] rounded-full bg-primary-soft opacity-70 blur-3xl" />
        <div className="absolute top-32 left-[-15%] h-[380px] w-[380px] rounded-full bg-[color:var(--tone-sky)] opacity-60 blur-3xl" />
      </div>
      <Container className="relative grid items-center gap-10 pt-10 pb-8 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-16 lg:pb-12">
        <div className="fade-up">
          <Badge>{h.badge}</Badge>
          <h1 className="mt-6 text-[38px] font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[54px] lg:leading-[1.06]">
            {h.titleLines[0]}
            <br />
            {h.titleLines[1]}
            <br />
            <span className="bg-gradient-to-r from-[oklch(0.55_0.22_290)] to-[oklch(0.55_0.2_240)] bg-clip-text text-transparent">
              {h.titleGradient}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-muted-foreground sm:text-base">
            {h.description}
          </p>
          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {h.benefits.map((b) => {
              const Icon = benefitIcon[b.icon] ?? Check;
              return (
                <li key={b.id} className="flex items-center gap-2 text-[13px] font-medium text-foreground">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span>{b.label}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={h.primary.href} size="lg" className="group">
              {h.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <a
              href={h.secondary.href}
              className="group inline-flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary shadow-soft transition-transform group-hover:scale-105">
                <Play className="h-4 w-4 fill-current" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-semibold">{h.secondary.label}</span>
                <span className="text-[11px] text-muted-foreground">See our process</span>
              </span>
            </a>
          </div>
        </div>
        <div className="relative fade-up-delay-2">
          <div aria-hidden className="absolute inset-x-8 -bottom-6 h-24 rounded-[50%] bg-primary/15 blur-3xl" />
          <img
            src={h.visual.src}
            alt={h.visual.alt}
            width={h.visual.width}
            height={h.visual.height}
            fetchPriority="high"
            className="relative w-full max-w-[640px] mx-auto select-none drop-shadow-[0_24px_48px_rgba(76,29,149,0.18)]"
            draggable={false}
          />
        </div>
      </Container>
    </section>
  );
}

// ============ Process ============
function ProcessSteps() {
  const p = customWebsitesPage.process;
  return (
    <Section id="process" className="bg-surface">
      <Container>
        <SectionTitle eyebrow={p.eyebrow} title={p.title} />
        <div className="relative mt-12">
          {/* Connector line */}
          <div aria-hidden className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-border lg:block" />
          <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {p.steps.map((s) => {
              const Icon = processIcon[s.icon] ?? CheckCircle2;
              return (
                <li key={s.id} className="relative flex flex-col items-center text-center">
                  <div className={cn("relative grid h-16 w-16 place-items-center rounded-full ring-8 ring-surface transition-transform hover:scale-105", toneBg[s.tone])}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-[15px] font-semibold text-foreground">
                    {s.step}. {s.title}
                  </div>
                  <p className="mt-2 max-w-[200px] text-[13px] leading-relaxed text-muted-foreground">
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

// ============ Services ============
function ServiceGrid() {
  const s = customWebsitesPage.services;
  const items = s.items.filter((i) => i.visible).sort((a, b) => a.displayOrder - b.displayOrder);
  return (
    <Section>
      <Container>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{s.title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = serviceIcon[item.icon] ?? Briefcase;
            return (
              <div key={item.id} className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl", toneBg[item.tone])}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-foreground">{item.title}</div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

// ============ Included + Pricing ============
function IncludedAndPricing() {
  const inc = customWebsitesPage.included;
  const pr = inc.pricing;
  const left = inc.features.slice(0, 5);
  const right = inc.features.slice(5);
  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{inc.title}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {[left, right].map((col, i) => (
                <ul key={i} className="space-y-3">
                  {col.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Right — pricing card */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[color:var(--tone-violet)] via-primary-soft to-[color:var(--tone-sky)] p-8 shadow-soft sm:p-10">
            <div className="relative grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-center">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {pr.label}
                </div>
                <div className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {pr.price}
                </div>
                <p className="mt-2 text-[13px] text-muted-foreground">{pr.note}</p>
                <ul className="mt-5 space-y-2.5">
                  {pr.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[13px] font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Button href={pr.cta.href} className="mt-6 group">
                  {pr.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <div className="relative hidden sm:block">
                <div aria-hidden className="absolute right-0 top-0 grid h-24 w-24 place-items-center rounded-full bg-primary-gradient text-primary-foreground shadow-glow">
                  <div className="text-center leading-tight">
                    <div className="text-[11px] font-medium opacity-80">Starting</div>
                    <div className="text-sm font-bold">{pr.price}</div>
                  </div>
                </div>
                <img
                  src={pr.illustration.src}
                  alt={pr.illustration.alt}
                  loading="lazy"
                  className="mt-10 w-full select-none rounded-2xl"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ============ Recent Work ============
function RecentWork() {
  const rw = customWebsitesPage.recentWork;
  const items = rw.items.filter((i) => i.visible).sort((a, b) => a.displayOrder - b.displayOrder);
  return (
    <Section>
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{rw.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((w) => (
            <article key={w.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0 text-[14px] font-semibold text-foreground">
                  {w.title}
                </div>
                <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium", toneBg[w.tone])}>
                  {w.category}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============ FAQ ============
function FAQSection() {
  const f = customWebsitesPage.faq;
  const items = f.items.filter((i) => i.visible).sort((a, b) => a.displayOrder - b.displayOrder);
  const [openId, setOpenId] = useState<string | undefined>(items[0]?.id);
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);
  return (
    <Section className="bg-surface">
      <Container>
        <div className="mb-8 text-center">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">✦ FAQ</div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{f.title}</h2>
        </div>
        <Accordion
          type="single"
          collapsible
          value={openId}
          onValueChange={(v) => setOpenId(v || undefined)}
          className="grid gap-4 lg:grid-cols-2 lg:gap-x-6"
        >
          {[left, right].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((q) => {
                const isOpen = openId === q.id;
                return (
                  <AccordionItem
                    key={q.id}
                    value={q.id}
                    className="rounded-2xl border border-border bg-card px-5 shadow-soft data-[state=open]:shadow-lift"
                  >
                    <AccordionTrigger className="py-4 text-[14px] font-medium text-foreground hover:no-underline [&>svg]:hidden">
                      <span className="pr-3 text-left">{q.question}</span>
                      <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary transition-transform">
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-[13px] leading-relaxed text-muted-foreground">
                      {q.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </div>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}

// ============ Final CTA ============
function FinalCta() {
  const c = customWebsitesPage.finalCta;
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[color:var(--tone-violet)] via-primary-soft to-[color:var(--tone-sky)] p-8 shadow-soft sm:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1.4fr_auto_0.7fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-[26px]">
                {c.title}
              </h2>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                {c.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[13px] font-medium text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex lg:justify-center">
              <Button href={c.cta.href} size="lg" className="group">
                {c.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="hidden lg:block">
              <img
                src={c.illustration.src}
                alt={c.illustration.alt}
                loading="lazy"
                className="ml-auto w-full max-w-[220px] select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
