import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Check,
  ExternalLink,
  Sliders,
  ChevronLeft,
  ChevronRight,
  FileText,
  Wand2,
  Home as HomeIcon,
  ChevronRight as CrumbSep,
  Sparkles,
  Clock,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section } from "@/components/site/primitives";
import { CustomFallbackCta } from "@/components/marketplace/CustomFallbackCta";
import { TemplateCard } from "@/components/marketplace/TemplateCard";
import { TemplateQuickPreview } from "@/components/marketplace/TemplateQuickPreview";
import { templates, type Template, type TemplateTech } from "@/data/site";
import { isLaunchableSlug } from "@/lib/launch/renderer-registry";
import { pageSeo, jsonLd, productSchema, breadcrumbSchema } from "@/lib/seo";
import heroLaptop from "@/assets/hero-device-laptop.png";
import heroTablet from "@/assets/hero-device-tablet.png";
import heroMobile from "@/assets/hero-device-mobile.png";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/templates/$slug/")({
  loader: ({ params }) => {
    const t = templates.find((x) => x.slug === params.slug && x.visible);
    if (!t) throw notFound();
    return { template: t };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Template not found — Mini Store" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const t = loaderData.template;
    const title = `${t.title} Website Template — Mini Store`;
    const description = t.fullDescription ?? t.shortDescription;
    const path = `/templates/${params.slug}`;
    const seo = pageSeo({
      path,
      title,
      description,
      ogType: "product",
      ogImage: t.image,
    });
    return {
      ...seo,
      scripts: [
        jsonLd(
          productSchema({
            name: t.title,
            description,
            path,
            image: t.image,
            category: t.category,
          }),
        ),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Templates", path: "/templates" },
            { name: t.title, path },
          ]),
        ),
      ],
    };
  },
  notFoundComponent: TemplateNotFound,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <Section>
        <Container>
          <p className="text-center text-muted-foreground">{error.message}</p>
        </Container>
      </Section>
    </SiteLayout>
  ),
  component: TemplateDetailsPage,
});

// ---------- Fallback defaults ----------
const DEFAULT_BENEFITS = [
  "Modern & Clean Design",
  "Fully Responsive",
  "Easy to Customize",
  "SEO Optimized",
  "Fast Loading",
];
const DEFAULT_PAGES = [
  "Home",
  "About Us",
  "Services",
  "Gallery",
  "Blog",
  "Blog Details",
  "Contact Us",
  "404 Page",
  "Terms & Conditions",
  "Privacy Policy",
];
const DEFAULT_FEATURES = [
  "Modern & Unique Design",
  "Fully Responsive Design",
  "Photo Gallery",
  "Testimonial Section",
  "Blog & News Section",
  "SEO Friendly",
  "Cross Browser Compatible",
];
const DEFAULT_TECH: TemplateTech[] = [
  { id: "html", name: "HTML5", tone: "orange" },
  { id: "css", name: "CSS3", tone: "blue" },
  { id: "js", name: "JavaScript", tone: "amber" },
  { id: "bs", name: "Bootstrap 5", tone: "violet" },
  { id: "sass", name: "Sass", tone: "pink" },
  { id: "fa", name: "Font Awesome", tone: "sky" },
];
const DEFAULT_META = {
  pagesCount: "10+ Ready Pages",
  customization: "Easy with Drag & Drop",
};

const TONE_BG: Record<TemplateTech["tone"], string> = {
  orange: "bg-tone-orange",
  blue: "bg-tone-blue",
  amber: "bg-tone-amber",
  violet: "bg-tone-violet",
  pink: "bg-tone-pink",
  sky: "bg-tone-sky",
  green: "bg-tone-green",
};

// ---------- Page ----------
function TemplateDetailsPage() {
  const loaderData = Route.useLoaderData() as { template: Template };
  const template = loaderData.template;
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const gallery = template.gallery && template.gallery.length ? template.gallery : [template.image];
  const [active, setActive] = useState(0);
  const activeImg = gallery[Math.min(active, gallery.length - 1)];

  const benefits = template.benefits ?? DEFAULT_BENEFITS;
  const pages = template.pagesIncluded ?? DEFAULT_PAGES;
  const features = template.features ?? DEFAULT_FEATURES;
  const tech = template.technologies ?? DEFAULT_TECH;
  const meta = { ...DEFAULT_META, ...(template.meta ?? {}) };

  const related = useMemo(() => {
    const others = templates.filter((t) => t.visible && t.id !== template.id);
    const sameCat = others.filter((t) => t.category === template.category);
    const rest = others.filter((t) => t.category !== template.category);
    return [...sameCat, ...rest].slice(0, 4);
  }, [template.id, template.category]);

  const statusBadge = template.featured
    ? { label: "Featured", tone: "bg-tone-amber text-[oklch(0.48_0.13_75)]" }
    : template.popular
      ? { label: "Popular", tone: "bg-tone-orange text-[oklch(0.5_0.15_50)]" }
      : template.isNew
        ? { label: "New", tone: "bg-tone-green text-[oklch(0.42_0.12_155)]" }
        : null;

  const launchReady = isLaunchableSlug(template.slug);

  const prev = () => setActive((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setActive((i) => (i + 1) % gallery.length);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <Container className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
            <li className="shrink-0">
              <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground">
                <HomeIcon className="h-3.5 w-3.5 shrink-0" /> Home
              </Link>
            </li>
            <li aria-hidden className="shrink-0">
              <CrumbSep className="h-3.5 w-3.5" />
            </li>
            <li className="shrink-0">
              <Link to="/templates" className="hover:text-foreground">
                Templates
              </Link>
            </li>
            <li aria-hidden className="shrink-0">
              <CrumbSep className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="min-w-0 flex-1 truncate font-medium text-foreground">
              {template.title}
            </li>
          </ol>
        </nav>
      </Container>

      {/* Main overview */}
      <Section className="pt-6">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            {/* LEFT — gallery */}
            <div>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <img
                  src={activeImg}
                  alt={`${template.title} — preview ${active + 1}`}
                  className="aspect-[4/3] w-full object-cover transition-opacity duration-300"
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={prev}
                  disabled={gallery.length < 2}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:-translate-y-0.5 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex min-w-0 flex-1 gap-3 overflow-x-auto">
                  {gallery.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show image ${i + 1}`}
                      aria-current={i === active}
                      className={cn(
                        "relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl border-2 transition",
                        i === active
                          ? "border-primary shadow-soft"
                          : "border-transparent opacity-80 hover:opacity-100",
                      )}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={next}
                  disabled={gallery.length < 2}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:-translate-y-0.5 disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* RIGHT — info */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                  {template.category}
                </span>
                {statusBadge && (
                  <span
                    className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusBadge.tone)}
                  >
                    ★ {statusBadge.label}
                  </span>
                )}
                {launchReady && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-tone-green px-3 py-1 text-xs font-semibold text-[oklch(0.42_0.12_155)]">
                    <Sparkles className="h-3 w-3" /> Launch Ready
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-[38px]">
                {template.title}
              </h1>

              <p className="mt-4 max-w-xl text-[15px] leading-[1.65] text-muted-foreground">
                {template.fullDescription ?? template.shortDescription}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {benefits.slice(0, 6).map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {launchReady ? (
                <>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/pricing"
                      search={{ design: template.slug }}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 text-sm font-medium text-primary-foreground shadow-soft transition hover:shadow-glow hover:-translate-y-0.5 sm:w-auto sm:flex-1"
                    >
                      <Sliders className="h-4 w-4" /> Use This Design
                    </Link>
                    <Link
                      to="/templates/$slug/preview"
                      params={{ slug: template.slug }}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground shadow-soft transition hover:-translate-y-0.5 hover:border-foreground/20 sm:w-auto"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </Link>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    This design is offered as part of your Mini Store plan — see{" "}
                    <Link to="/pricing" search={{ design: undefined }} className="text-primary hover:underline">
                      pricing
                    </Link>{" "}
                    for details.
                  </p>
                </>
              ) : (
                <>
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      to="/pricing"
                      search={{ design: template.slug }}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 text-sm font-medium text-primary-foreground shadow-soft transition hover:shadow-glow hover:-translate-y-0.5 sm:w-auto sm:self-start sm:px-8"
                    >
                      <Sliders className="h-4 w-4" /> Choose a Plan
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      This design can be explored now. Self-service store generation is coming soon.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        to="/templates/$slug/preview"
                        params={{ slug: template.slug }}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground shadow-soft transition hover:-translate-y-0.5 hover:border-foreground/20 sm:w-auto"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </Link>
                      <Link
                        to="/templates"
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground shadow-soft transition hover:-translate-y-0.5 hover:border-foreground/20 sm:w-auto"
                      >
                        <Sparkles className="h-4 w-4" /> Choose a Launch-Ready Design
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Value strip */}
      <Section className="py-4">
        <Container>
          <div className="grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2">
            <ValueItem
              tone="violet"
              icon={<FileText className="h-5 w-5" />}
              title="Pages Included"
              value={meta.pagesCount}
            />
            <ValueItem
              tone="pink"
              icon={<Wand2 className="h-5 w-5" />}
              title="Customization"
              value={meta.customization}
            />
          </div>
        </Container>
      </Section>

      {/* Details panel */}
      <Section className="pt-4">
        <Container>
          <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft lg:grid-cols-3 lg:p-8">
            <div>
              <h2 className="text-lg font-bold text-foreground">Pages Included</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                All the essential pages you need to launch a professional website.
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-foreground">
                {pages.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:border-l lg:border-border lg:pl-6">
              <h2 className="text-lg font-bold text-foreground">Key Features</h2>
              <ul className="mt-4 grid gap-2 text-sm text-foreground">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-primary-soft/60 p-5">
              <h2 className="text-lg font-bold text-foreground">Technologies Used</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {tech.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-3 text-center shadow-soft"
                  >
                    <div
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-lg text-sm font-bold text-foreground",
                        TONE_BG[t.tone],
                      )}
                    >
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="text-xs font-medium text-foreground">{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Responsive showcase */}
      <Section className="pt-4">
        <Container>
          <div className="grid items-center gap-8 rounded-3xl border border-border bg-muted/40 p-6 lg:grid-cols-[1fr_1.6fr] lg:p-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Fully Responsive Design</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Looks perfect on all devices and screen sizes.
              </p>
            </div>
            <div className="relative flex items-end justify-center gap-3 sm:gap-5">
              <DeviceFrame
                frame={heroLaptop}
                src={activeImg}
                label="Desktop"
                widthClass="w-[40%]"
                clipInset="inset-[6%_5%_18%_5%]"
              />
              <DeviceFrame
                frame={heroLaptop}
                src={activeImg}
                label="Laptop"
                widthClass="w-[32%]"
                clipInset="inset-[6%_5%_18%_5%]"
              />
              <DeviceFrame
                frame={heroTablet}
                src={activeImg}
                label="Tablet"
                widthClass="w-[18%]"
                clipInset="inset-[5%]"
              />
              <DeviceFrame
                frame={heroMobile}
                src={activeImg}
                label="Mobile"
                widthClass="w-[10%]"
                clipInset="inset-[6%_5%]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section className="pt-6">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">You May Also Like</h2>
            <Link to="/templates" className="text-sm font-medium text-primary hover:underline">
              View All Templates →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((t) => (
              <TemplateCard key={t.id} template={t} onQuickPreview={setPreviewTemplate} />
            ))}
          </div>
        </Container>
      </Section>

      <CustomFallbackCta />

      <TemplateQuickPreview
        template={previewTemplate}
        open={previewTemplate !== null}
        onOpenChange={(o) => !o && setPreviewTemplate(null)}
      />
    </SiteLayout>
  );
}

function ValueItem({
  tone,
  icon,
  title,
  value,
}: {
  tone: "violet" | "pink" | "green" | "amber";
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  const toneClass = {
    violet: "bg-tone-violet text-[oklch(0.45_0.18_290)]",
    pink: "bg-tone-pink text-[oklch(0.5_0.14_355)]",
    green: "bg-tone-green text-[oklch(0.42_0.12_155)]",
    amber: "bg-tone-amber text-[oklch(0.48_0.13_75)]",
  }[tone];
  return (
    <div className="flex items-center gap-3">
      <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl", toneClass)}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}

function DeviceFrame({
  frame,
  src,
  label,
  widthClass,
  clipInset,
}: {
  frame: string;
  src: string;
  label: string;
  widthClass: string;
  clipInset: string;
}) {
  return (
    <div className={cn("relative shrink-0", widthClass)} aria-label={label}>
      <img src={frame} alt="" className="relative z-10 h-auto w-full" />
      <div className={cn("pointer-events-none absolute overflow-hidden rounded-[2px]", clipInset)}>
        <img src={src} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function TemplateNotFound() {
  return (
    <SiteLayout>
      <Section>
        <Container>
          <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <h1 className="text-2xl font-bold text-foreground">Template not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The template you're looking for may have been removed or is unavailable.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/templates"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-glow"
              >
                Browse Templates
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft"
              >
                Go Home
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}
