import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import {
  Check,
  Smile,
  Mail,
  MessageCircle,
  MessageSquare,
  Clock,
  Headphones,
  FileText,
  Users,
  Send,
  ArrowRight,
  User,
  Phone,
  Building2,
  Globe,
  DollarSign,
  Pencil,
  Loader2,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section, Button } from "@/components/site";
import { contactPage } from "@/data/site";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { pageSeo, jsonLd, webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

const TITLE = "Contact Mini Store — Talk to Our Website Team";
const DESCRIPTION =
  "Get in touch with the Mini Store team on WhatsApp or email. Ask a question, request a custom website, or start a new project — we reply during business hours (Mon–Sat).";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan:
      typeof search.plan === "string" && ["starter", "business", "custom"].includes(search.plan)
        ? (search.plan as "starter" | "business" | "custom")
        : undefined,
    design:
      typeof search.design === "string" && search.design.length > 0
        ? search.design
        : undefined,
  }),
  head: () => {
    const seo = pageSeo({ path: "/contact", title: TITLE, description: DESCRIPTION });
    return {
      ...seo,
      scripts: [
        jsonLd(
          webPageSchema({
            path: "/contact",
            name: TITLE,
            description: DESCRIPTION,
            type: "ContactPage",
          }),
        ),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ),
        jsonLd(faqSchema(contactPage.faq.items)),
      ],
    };
  },
  component: ContactPage,
});

// ---------- shared tone maps ----------
const toneSoft: Record<string, string> = {
  violet: "bg-[color:var(--tone-violet)] text-[oklch(0.45_0.18_290)]",
  green: "bg-[color:var(--tone-green)] text-[oklch(0.45_0.13_155)]",
  orange: "bg-[color:var(--tone-orange)] text-[oklch(0.5_0.15_55)]",
  blue: "bg-[color:var(--tone-blue)] text-[oklch(0.45_0.15_240)]",
  amber: "bg-[color:var(--tone-amber)] text-[oklch(0.5_0.15_75)]",
};
const toneSolid: Record<string, string> = {
  violet: "bg-[oklch(0.62_0.19_290)] text-white",
  green: "bg-[oklch(0.6_0.15_155)] text-white",
  blue: "bg-[oklch(0.62_0.17_240)] text-white",
  orange: "bg-[oklch(0.68_0.17_55)] text-white",
  amber: "bg-[oklch(0.7_0.16_75)] text-white",
};
const trustIcon: Record<string, LucideIcon> = { check: Check, smile: Smile };
const processIcon: Record<string, LucideIcon> = { file: FileText, users: Users, send: Send };

// ---------- Page ----------
function ContactPage() {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Delay focus until after scroll begins
    setTimeout(() => firstFieldRef.current?.focus(), 400);
  };

  return (
    <SiteLayout>
      <ContactHero />
      <ContactMain formRef={formSectionRef} firstFieldRef={firstFieldRef} />
      <ProcessSection />
      <FaqSection />
      <FinalCta onCta={scrollToForm} />
    </SiteLayout>
  );
}

// ---------- Hero ----------
function ContactHero() {
  const h = contactPage.hero;
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
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
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {h.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {h.trustPoints.map((t) => {
                const Icon = trustIcon[t.icon] ?? Check;
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

// ---------- Main (Form + Methods) ----------
type FormState = {
  fullName: string;
  email: string;
  phone: string;
  purpose: string;
  companyName: string;
  website: string;
  preferredBudget: string;
  message: string;
  consent: boolean;
  hp: string; // honeypot
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  purpose: "",
  companyName: "",
  website: "",
  preferredBudget: "",
  message: "",
  consent: false,
  hp: "",
};

function ContactMain({
  formRef,
  firstFieldRef,
}: {
  formRef: React.RefObject<HTMLDivElement | null>;
  firstFieldRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <Section className="pt-2">
      <Container>
        <div ref={formRef} className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <ContactForm firstFieldRef={firstFieldRef} />
          <ContactMethods />
        </div>

      </Container>
    </Section>
  );
}

// ---------- Form ----------
function ContactForm({
  firstFieldRef,
}: {
  firstFieldRef: React.RefObject<HTMLInputElement | null>;
}) {
  const f = contactPage.form;
  const [values, setValues] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const setField = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (v: FormState) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!v.fullName.trim()) e.fullName = "Please enter your full name.";
    else if (v.fullName.length > 100) e.fullName = "Name is too long.";

    if (!v.email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
      e.email = "Please enter a valid email.";
    else if (v.email.length > 200) e.email = "Email is too long.";

    if (v.phone && v.phone.length > 30) e.phone = "Phone number is too long.";
    if (!v.purpose) e.purpose = "Please choose a subject.";
    if (v.companyName.length > 120) e.companyName = "Company name is too long.";
    if (v.website && v.website.length > 200) e.website = "Website URL is too long.";

    if (!v.message.trim()) e.message = "Please enter your message.";
    else if (v.message.length > 2000) e.message = "Message is too long (max 2000 characters).";

    if (!v.consent) e.consent = "Please accept the Privacy Policy and Terms.";
    return e;
  };

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (status === "loading") return;

    // Honeypot: silently drop
    if (values.hp) return;

    const eMap = validate(values);
    if (Object.keys(eMap).length > 0) {
      setErrors(eMap);
      return;
    }

    setStatus("loading");
    try {
      // No backend connected yet — this is a clearly-isolated placeholder
      // handler ready to be wired to a future submission service.

      // (Do not log PII to the console.)
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setValues(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-w-0 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{f.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        All fields marked with <span className="text-[oklch(0.6_0.2_25)]">*</span> are required
      </p>

      <form
        noValidate
        onSubmit={onSubmit}
        className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2"
        aria-describedby="contact-form-status"
      >

        {/* Honeypot (visually hidden) */}
        <div className="hidden" aria-hidden="true">
          <label>
            Do not fill this field
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.hp}
              onChange={(e) => setField("hp", e.target.value)}
            />
          </label>
        </div>

        <Field id="fullName" label="Full Name" required icon={User} error={errors.fullName}>
          <input
            ref={firstFieldRef}
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Full Name *"
            value={values.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            maxLength={100}
            className={inputCls(!!errors.fullName)}
            aria-invalid={!!errors.fullName}
          />
        </Field>

        <Field id="email" label="Email Address" required icon={Mail} error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address *"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            maxLength={200}
            className={inputCls(!!errors.email)}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field id="phone" label="Phone Number" icon={Phone} error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone Number"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            maxLength={30}
            className={inputCls(!!errors.phone)}
          />
        </Field>

        <Field
          id="purpose"
          label="Subject / Purpose"
          required
          icon={FileText}
          error={errors.purpose}
        >
          <Select
            id="purpose"
            name="purpose"
            value={values.purpose}
            onChange={(e) => setField("purpose", e.target.value)}
            invalid={!!errors.purpose}
            placeholder="Subject / Purpose *"
            options={f.subjectOptions}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="companyName"
            label="Company / Business Name"
            icon={Building2}
            error={errors.companyName}
          >
            <input
              id="companyName"
              name="companyName"
              type="text"
              autoComplete="organization"
              placeholder="Company / Business Name"
              value={values.companyName}
              onChange={(e) => setField("companyName", e.target.value)}
              maxLength={120}
              className={inputCls(!!errors.companyName)}
            />
          </Field>
        </div>

        <Field id="website" label="Website" icon={Globe} error={errors.website}>
          <input
            id="website"
            name="website"
            type="url"
            autoComplete="url"
            placeholder="Website (if any)"
            value={values.website}
            onChange={(e) => setField("website", e.target.value)}
            maxLength={200}
            className={inputCls(!!errors.website)}
          />
        </Field>

        <Field id="preferredBudget" label="Preferred Budget" icon={DollarSign}>
          <Select
            id="preferredBudget"
            name="preferredBudget"
            value={values.preferredBudget}
            onChange={(e) => setField("preferredBudget", e.target.value)}
            placeholder="Preferred Budget"
            options={f.budgetOptions}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field id="message" label="Your Message" required icon={Pencil} error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your requirement..."
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
              maxLength={2000}
              className={cn(inputCls(!!errors.message), "min-h-[120px] resize-y pt-3")}
              aria-invalid={!!errors.message}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(e) => setField("consent", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              aria-invalid={!!errors.consent}
            />
            <span>
              {contactPage.form.consentLabel}{" "}
              <a
                href={contactPage.form.privacyHref}
                className="text-primary underline underline-offset-2"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href={contactPage.form.termsHref}
                className="text-primary underline underline-offset-2"
              >
                Terms of Service
              </a>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1.5 text-xs font-medium text-[oklch(0.55_0.22_25)]">
              {errors.consent}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-all",
              "hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-70",
            )}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                {f.submitLabel}
                <Send className="h-4 w-4" />
              </>
            )}
          </button>

          <div id="contact-form-status" aria-live="polite" className="mt-3 min-h-[1.25rem]">
            {status === "success" && (
              <p className="rounded-xl bg-[color:var(--tone-green)] px-4 py-3 text-sm text-[oklch(0.35_0.13_155)]">
                {f.successTitle} {f.successBody}
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-[oklch(0.96_0.03_25)] px-4 py-3 text-sm text-[oklch(0.45_0.22_25)]">
                {f.errorBody}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

// ---------- Form primitives ----------
function inputCls(invalid: boolean) {
  return cn(
    "w-full rounded-xl border bg-background pl-10 pr-3 py-3 text-sm text-foreground",
    "placeholder:text-muted-foreground",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
    invalid ? "border-[oklch(0.75_0.15_25)]" : "border-border",
  );
}

function Field({
  id,
  label,
  required,
  icon: Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon: LucideIcon;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="sr-only">
        {label}
        {required ? " (required)" : ""}
      </label>
      <div className="relative min-w-0">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-[oklch(0.55_0.22_25)]">{error}</p>}
    </div>
  );
}


function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  invalid,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; label: string }[];
  placeholder: string;
  invalid?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={invalid}
        className={cn(
          inputCls(!!invalid),
          "appearance-none pr-9",
          value === "" && "text-muted-foreground",
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.id} value={o.id} className="text-foreground">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

// ---------- Methods ----------
function ContactMethods() {
  const m = contactPage.methods;
  const b = contactPage.business;

  type MethodCard = {
    id: string;
    title: string;
    primary: string;
    description: string;
    tone: keyof typeof toneSoft;
    icon: LucideIcon;
    href?: string;
    external?: boolean;
    visible: boolean;
  };

  const cards: MethodCard[] = [
    b.email
      ? {
          id: "email",
          title: "Email Us",
          primary: b.email,
          description: b.responseGuidance,
          tone: "violet",
          icon: Mail,
          href: `mailto:${b.email}`,
          visible: true,
        }
      : null,
    b.whatsappE164
      ? {
          id: "whatsapp",
          title: "WhatsApp",
          primary: b.whatsappNumber,
          description: b.whatsappHours,
          tone: "green",
          icon: MessageCircle,
          href: `https://wa.me/${b.whatsappE164}`,
          external: true,
          visible: true,
        }
      : null,
    {
      id: "chat",
      title: "Live Chat",
      primary: b.liveChat.enabled ? "Chat with our team instantly." : b.liveChat.statusLabel,
      description: b.liveChat.enabled
        ? "Available on our website."
        : "Available soon on our website.",
      tone: "blue",
      icon: MessageSquare,
      visible: true,
    },
    {
      id: "hours",
      title: "Business Hours",
      primary: b.businessHours.weekdays,
      description: b.businessHours.weekend,
      tone: "orange",
      icon: Clock,
      visible: true,
    },
  ].filter(Boolean) as MethodCard[];

  return (
    <aside className="min-w-0 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{m.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{m.supporting}</p>

      <ul className="mt-6 space-y-3">
        {cards.map((c) => {
          const Icon = c.icon;
          const Wrapper: React.ElementType = c.href ? "a" : "div";
          const wrapperProps = c.href
            ? {
                href: c.href,
                ...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
              }
            : {};
          return (
            <li key={c.id}>
              <Wrapper
                {...wrapperProps}
                className={cn(
                  "flex items-start gap-4 rounded-2xl border border-border/60 bg-background p-4 transition-all",
                  c.href
                    ? "hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft"
                    : "",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                    toneSolid[c.tone],
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{c.title}</div>
                  <div className="mt-0.5 truncate text-sm text-foreground">{c.primary}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{c.description}</div>
                </div>
              </Wrapper>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-primary-soft/70 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-primary">
          <Headphones className="h-5 w-5" />
        </span>
        <div>
          <div className="text-sm font-semibold text-foreground">{m.valueCard.title}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{m.valueCard.description}</div>
        </div>
      </div>
    </aside>
  );
}

// ---------- Process ----------
function ProcessSection() {
  const p = contactPage.process;
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {p.eyebrow}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-[34px]">
            {p.title}
          </h2>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-surface p-8 sm:p-10 shadow-soft">
          <div className="relative grid gap-10 md:grid-cols-3">
            {/* dashed connector — desktop */}
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-border md:block" />
            {p.steps.map((s) => {
              const Icon = processIcon[s.icon] ?? FileText;
              return (
                <div key={s.id} className="relative text-center">
                  <div
                    className={cn(
                      "relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full",
                      toneSoft[s.tone],
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-2">
                    <span
                      className={cn(
                        "inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[11px] font-semibold",
                        toneSolid[s.tone],
                      )}
                    >
                      {String(s.number).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{s.title}</span>
                  </div>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {s.description}
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

// ---------- FAQ ----------
function FaqSection() {
  const f = contactPage.faq;
  const mid = Math.ceil(f.items.length / 2);
  const columns = [f.items.slice(0, mid), f.items.slice(mid)];

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {f.eyebrow}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-[34px]">
            {f.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {columns.map((col, i) => (
            <Accordion key={i} type="single" collapsible className="space-y-3">
              {col.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-2xl border border-border bg-card px-5 shadow-soft [border-bottom-width:1px]"
                >
                  <AccordionTrigger className="py-4 text-[15px] font-semibold text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-0 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------- Final CTA ----------
function FinalCta({ onCta }: { onCta: () => void }) {
  const c = contactPage.cta;
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
                <Button
                  href="#contact-form"
                  onClick={(e) => {
                    e.preventDefault();
                    onCta();
                  }}
                >
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
