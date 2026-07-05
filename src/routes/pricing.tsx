import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingCart,
  Briefcase,
  Code2,
  Globe,
  Check,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Gauge,
  DatabaseBackup,
  MonitorSmartphone,
  Activity,
  FileText,
  PenLine,
  ShoppingBag,
  Sparkles,
  Plug,
  Wrench,
  Plus,
  Minus,
  ArrowRight,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Badge, Button } from "@/components/site";
import { pricingPage } from "@/data/site";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Mini Store" },
      {
        name: "description",
        content:
          "Simple, transparent pricing. Mini Store Basic from ₹299/month, Commerce Managed from ₹4,999 setup, or a Custom Website with a quote based on your requirements.",
      },
      { property: "og:title", content: "Pricing — Mini Store" },
      {
        property: "og:description",
        content:
          "Choose the perfect website solution for you. One-time fees and subscriptions shown separately.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

// ---------- tone maps ----------
const planTone = {
  green: {
    softBg: "bg-[color:var(--tone-green)]",
    icon: "text-[oklch(0.45_0.13_155)]",
    price: "text-[oklch(0.5_0.15_155)]",
    domainBg: "bg-[color:var(--tone-green)] text-[oklch(0.42_0.13_155)]",
    btn: "bg-[oklch(0.55_0.15_155)] text-white hover:bg-[oklch(0.48_0.15_155)] shadow-soft",
    ring: "",
  },
  blue: {
    softBg: "bg-[color:var(--tone-blue)]",
    icon: "text-[oklch(0.45_0.15_240)]",
    price: "text-[oklch(0.5_0.17_240)]",
    domainBg: "bg-[color:var(--tone-blue)] text-[oklch(0.42_0.15_240)]",
    btn: "bg-[oklch(0.55_0.18_240)] text-white hover:bg-[oklch(0.48_0.18_240)] shadow-soft",
    ring: "ring-2 ring-[oklch(0.65_0.15_240)]",
  },
  violet: {
    softBg: "bg-[color:var(--tone-violet)]",
    icon: "text-[oklch(0.45_0.18_290)]",
    price: "text-[oklch(0.5_0.2_290)]",
    domainBg: "bg-[color:var(--tone-violet)] text-[oklch(0.42_0.18_290)]",
    btn: "bg-primary-gradient text-primary-foreground hover:shadow-glow shadow-soft",
    ring: "",
  },
} as const;

const planIconMap: Record<string, LucideIcon> = {
  cart: ShoppingCart,
  briefcase: Briefcase,
  code: Code2,
};

// ---------- Page ----------
function PricingPage() {
  return (
    <SiteLayout>
      <PricingHero />
      <PlansSection />
      <CompareTable />
      <IncludedAndAddOns />
      <PricingFAQ />
      <ConsultationCta />
    </SiteLayout>
  );
}

// ---------- Hero ----------
function PricingHero() {
  const h = pricingPage.hero;
  const trustIcon: Record<string, LucideIcon> = {
    shield: ShieldCheck,
    check: CheckCircle2,
    headset: Headphones,
  };
  return (
    <section className="relative overflow-hidden bg-hero">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-24 right-[-6%] h-[420px] w-[420px] rounded-full bg-primary-soft opacity-70 blur-3xl" />
        <div className="absolute top-32 left-[-15%] h-[340px] w-[340px] rounded-full bg-[color:var(--tone-sky)] opacity-60 blur-3xl" />
      </div>
      <Container className="relative grid items-center gap-10 pt-10 pb-8 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-16 lg:pb-12">
        <div className="fade-up">
          <Badge>{h.badge}</Badge>
          <h1 className="mt-6 text-[38px] font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[52px] lg:leading-[1.06]">
            {h.titleLines[0]}
            <br />
            {h.titleLines[1]}
            <span className="bg-gradient-to-r from-[oklch(0.55_0.22_290)] to-[oklch(0.55_0.2_240)] bg-clip-text text-transparent">
              {h.titleGradient}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-muted-foreground sm:text-base">
            {h.description}
          </p>
          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {h.trust.map((t) => {
              const Icon = trustIcon[t.icon] ?? Check;
              return (
                <li
                  key={t.id}
                  className="flex items-center gap-2 text-[13px] font-medium text-foreground"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span>{t.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative fade-up-delay-2">
          <div
            aria-hidden
            className="absolute inset-x-8 -bottom-6 h-24 rounded-[50%] bg-primary/15 blur-3xl"
          />
          <img
            src={h.visual.src}
            alt={h.visual.alt}
            fetchPriority="high"
            className="relative w-full max-w-[620px] mx-auto select-none drop-shadow-[0_24px_48px_rgba(76,29,149,0.18)]"
            draggable={false}
          />
        </div>
      </Container>
    </section>
  );
}

// ---------- Plans ----------
function PlansSection() {
  const { starter, business, custom } = pricingPage.plans;
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StarterCard plan={starter} />
          <BusinessCard plan={business} />
          <CustomCard plan={custom} />
        </div>
      </Container>
    </Section>
  );
}

function PlanShell({
  tone,
  popular,
  children,
}: {
  tone: keyof typeof planTone;
  popular?: boolean;
  children: React.ReactNode;
}) {
  const t = planTone[tone];
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift",
        popular && t.ring,
      )}
    >
      {popular && (
        <span className="absolute -top-3 right-6 rounded-full bg-primary-gradient px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-glow">
          Most Popular
        </span>
      )}
      {children}
    </div>
  );
}

function PlanHeader({
  plan,
  Icon,
}: {
  plan: { name: string; subtitle: string; planType: string; tone: keyof typeof planTone };
  Icon: LucideIcon;
}) {
  const t = planTone[plan.tone];
  return (
    <>
      <div className="flex items-start gap-4">
        <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", t.softBg)}>
          <Icon className={cn("h-5 w-5", t.icon)} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[18px] font-bold text-foreground">{plan.name}</h3>
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{plan.subtitle}</p>
        </div>
      </div>
      <div className="mt-5">
        <span
          className={cn("inline-flex rounded-full px-3 py-1 text-[11px] font-semibold", t.domainBg)}
        >
          {plan.planType}
        </span>
      </div>
    </>
  );
}

function DomainBox({
  tone,
  label,
  example,
}: {
  tone: keyof typeof planTone;
  label: string;
  example: string;
}) {
  const t = planTone[tone];
  return (
    <div className={cn("mt-5 rounded-xl px-4 py-3", t.softBg)}>
      <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
        <Globe className={cn("h-3.5 w-3.5", t.icon)} />
        <span>{label}</span>
      </div>
      <div className={cn("mt-1 text-[14px] font-semibold", t.icon)}>{example}</div>
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

function StarterCard({ plan }: { plan: typeof pricingPage.plans.starter }) {
  const t = planTone[plan.tone as keyof typeof planTone];
  return (
    <PlanShell tone={plan.tone as keyof typeof planTone}>
      <PlanHeader
        plan={{ ...plan, tone: plan.tone as keyof typeof planTone }}
        Icon={planIconMap[plan.icon]}
      />
      <div className="mt-6">
        <div className="text-[12px] font-medium text-muted-foreground">Starting from</div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className={cn("text-[40px] font-bold leading-none", t.price)}>
            {plan.monthlyPrice}
          </span>
          <span className="text-[14px] text-muted-foreground">/month</span>
        </div>
        <div className="mt-1.5 text-[12.5px] text-muted-foreground">
          or {plan.annualPrice} /year
        </div>
      </div>
      <DomainBox
        tone={plan.tone as keyof typeof planTone}
        label={plan.domain.label}
        example={plan.domain.example}
      />
      <FeatureList items={plan.features} />
      <div className="mt-auto pt-6">
        <a
          href={plan.cta.href}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
            t.btn,
          )}
        >
          {plan.cta.label}
        </a>
      </div>
    </PlanShell>
  );
}

function BusinessCard({ plan }: { plan: typeof pricingPage.plans.business }) {
  const t = planTone[plan.tone as keyof typeof planTone];
  return (
    <PlanShell tone={plan.tone as keyof typeof planTone} popular={plan.popular}>
      <PlanHeader
        plan={{ ...plan, tone: plan.tone as keyof typeof planTone }}
        Icon={planIconMap[plan.icon]}
      />
      <div className="mt-6">
        <div className="text-[12px] font-medium text-muted-foreground">Starting from</div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className={cn("text-[40px] font-bold leading-none", t.price)}>
            {plan.setupPrice}
          </span>
        </div>
        <div className="mt-1.5 text-[12.5px] text-muted-foreground">{plan.setupNote}</div>
        <div className="mt-2 text-[13px] text-foreground/80">
          + <span className="font-semibold">{plan.monthlyPrice}</span> /month or{" "}
          <span className="font-semibold">{plan.annualPrice}</span> /year
        </div>
        <div className="mt-1 text-[11.5px] text-muted-foreground">
          Domain registration cost is separate.
        </div>
      </div>
      <DomainBox
        tone={plan.tone as keyof typeof planTone}
        label={plan.domain.label}
        example={plan.domain.example}
      />
      <FeatureList items={plan.features} />
      <div className="mt-auto pt-6">
        <a
          href={plan.cta.href}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
            t.btn,
          )}
        >
          {plan.cta.label}
        </a>
      </div>
    </PlanShell>
  );
}

function CustomCard({ plan }: { plan: typeof pricingPage.plans.custom }) {
  const t = planTone[plan.tone as keyof typeof planTone];
  return (
    <PlanShell tone={plan.tone as keyof typeof planTone}>
      <PlanHeader
        plan={{ ...plan, tone: plan.tone as keyof typeof planTone }}
        Icon={planIconMap[plan.icon]}
      />
      <div className="mt-6">
        <div className="text-[12px] font-medium text-muted-foreground">Pricing</div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className={cn("text-[28px] font-bold leading-tight", t.price)}>
            {plan.startingPrice}
          </span>
        </div>
        <div className="mt-2 text-[12.5px] text-muted-foreground">{plan.pricingNote}</div>
      </div>
      <FeatureList items={plan.features} />
      <div className="mt-auto pt-6">
        <a
          href={plan.cta.href}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
            t.btn,
          )}
        >
          {plan.cta.label}
        </a>
      </div>
    </PlanShell>
  );
}

// ---------- Compare Table ----------
function CompareTable() {
  const rows = pricingPage.compareRows;
  const { starter, business, custom } = pricingPage.plans;
  const headerCell = (name: string, sub: string, tone: keyof typeof planTone, Icon: LucideIcon) => {
    const t = planTone[tone];
    return (
      <div className="flex flex-col items-center gap-1.5">
        <span className={cn("grid h-9 w-9 place-items-center rounded-xl", t.softBg)}>
          <Icon className={cn("h-4 w-4", t.icon)} />
        </span>
        <div className={cn("text-[14px] font-bold", t.icon)}>{name}</div>
        <div className="text-[11px] font-medium text-muted-foreground">{sub}</div>
      </div>
    );
  };
  const renderCell = (v: string) => {
    if (v === "yes")
      return <CheckCircle2 className="mx-auto h-5 w-5 text-[oklch(0.55_0.15_155)]" />;
    if (v === "no") return <span className="text-destructive">✕</span>;
    if (v === "—") return <span className="text-muted-foreground">—</span>;
    return <span>{v}</span>;
  };

  return (
    <Section className="bg-surface">
      <Container>
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {pricingPage.compareTitle}
        </h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[760px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-5 text-[13px] font-semibold text-foreground">Features</th>
                <th className="p-5 text-center">
                  {headerCell(starter.name, "Subdomain", "green", ShoppingCart)}
                </th>
                <th className="p-5 text-center">
                  {headerCell(business.name, "Custom Domain", "blue", Briefcase)}
                </th>
                <th className="p-5 text-center">
                  {headerCell(custom.name, "Fully Custom", "violet", Code2)}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.id}
                  className={cn("border-t border-border/70", i % 2 === 1 && "bg-surface/60")}
                >
                  <td className="p-4 pl-5 text-[13px] font-medium text-foreground">{r.label}</td>
                  <td className="p-4 text-center text-muted-foreground">{renderCell(r.starter)}</td>
                  <td className="p-4 text-center text-muted-foreground">
                    {renderCell(r.business)}
                  </td>
                  <td className="p-4 text-center text-muted-foreground">{renderCell(r.custom)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}

// ---------- Included + Add-ons ----------
const commonIconMap: Record<string, LucideIcon> = {
  mobile: Smartphone,
  shield: ShieldCheck,
  gauge: Gauge,
  backup: DatabaseBackup,
  browser: MonitorSmartphone,
  monitor: Activity,
};
const addOnIconMap: Record<string, LucideIcon> = {
  pages: FileText,
  content: PenLine,
  cart: ShoppingBag,
  logo: Sparkles,
  plug: Plug,
  wrench: Wrench,
};

function IncludedAndAddOns() {
  const cf = pricingPage.commonFeatures;
  const ao = pricingPage.addOns;
  return (
    <Section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Included */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h3 className="text-[18px] font-bold text-foreground">{cf.title}</h3>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {cf.items
                .filter((i) => i.visible)
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((i) => {
                  const Icon = commonIconMap[i.icon] ?? Check;
                  return (
                    <div
                      key={i.id}
                      className="flex flex-col items-center gap-2 rounded-2xl bg-primary-soft/60 p-4 text-center"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-card text-primary shadow-soft">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="text-[12.5px] font-medium leading-tight text-foreground">
                        {i.label}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Add-ons */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h3 className="text-[18px] font-bold text-foreground">{ao.title}</h3>
            <ul className="mt-5 divide-y divide-border">
              {ao.items
                .filter((i) => i.visible)
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((i) => {
                  const Icon = addOnIconMap[i.icon] ?? Plus;
                  return (
                    <li key={i.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-[13.5px] font-medium text-foreground">{i.label}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-primary">{i.price}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ---------- FAQ ----------
function PricingFAQ() {
  const f = pricingPage.faq;
  const items = f.items.filter((i) => i.visible).sort((a, b) => a.displayOrder - b.displayOrder);
  const [openId, setOpenId] = useState<string | undefined>(items[0]?.id);
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);
  return (
    <Section className="bg-surface">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {f.title}
          </h2>
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
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
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

// ---------- Consultation CTA ----------
function ConsultationCta() {
  const c = pricingPage.finalCta;
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
                  <li
                    key={b}
                    className="flex items-center gap-2 text-[13px] font-medium text-foreground"
                  >
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
