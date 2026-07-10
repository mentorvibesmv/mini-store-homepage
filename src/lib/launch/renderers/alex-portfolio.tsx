// Alex Portfolio renderer — pure, data-driven from StoreConfig.
// Editorial one-page site: header, hero, offering, optional about,
// contact CTA, footer. No context, storage, or APIs. Renders only fields
// present in config.

import type { CSSProperties } from "react";
import type { StoreConfig } from "@/lib/launch/types";

export type AlexPortfolioRendererProps = {
  config: StoreConfig;
};

type StyleTokens = {
  // Typography
  displayFont: string;
  headlineClass: string;
  eyebrowClass: string;
  subheadClass: string;
  sectionHeadingClass: string;
  // Shape
  radius: string;
  ctaRadius: string;
  ctaPadding: string;
  // Rhythm
  sectionSpacing: string;
  heroSpacing: string;
  // Accent behaviour
  accentBlockOpacity: number;
  accentBlockOpacityStrong: number;
  monogramShape: "square" | "rounded" | "circle" | "blob";
  gridPattern: "dot" | "line" | "none";
  ctaShadow: string;
  labelTracking: string;
  labelWeight: string;
  bodyLead: string;
};

function tokensFor(style: StoreConfig["brand"]["style"]): StyleTokens {
  switch (style) {
    case "bold":
      return {
        displayFont:
          '"Archivo Black", "Inter", ui-sans-serif, system-ui, sans-serif',
        headlineClass:
          "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-[-0.03em]",
        eyebrowClass:
          "text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em]",
        subheadClass:
          "text-base sm:text-lg md:text-xl font-medium leading-relaxed",
        sectionHeadingClass:
          "text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em]",
        radius: "rounded-lg",
        ctaRadius: "rounded-md",
        ctaPadding: "px-7 py-4",
        sectionSpacing: "py-20 sm:py-28",
        heroSpacing: "pt-14 pb-20 sm:pt-24 sm:pb-32",
        accentBlockOpacity: 0.14,
        accentBlockOpacityStrong: 1,
        monogramShape: "square",
        gridPattern: "line",
        ctaShadow: "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]",
        labelTracking: "tracking-[0.24em]",
        labelWeight: "font-bold",
        bodyLead: "text-neutral-700",
      };
    case "elegant":
      return {
        displayFont:
          '"Cormorant Garamond", "Playfair Display", Georgia, "Times New Roman", serif',
        headlineClass:
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-[-0.015em]",
        eyebrowClass:
          "text-[11px] font-medium uppercase tracking-[0.32em]",
        subheadClass:
          "text-base sm:text-lg md:text-xl font-light leading-[1.75] text-neutral-600",
        sectionHeadingClass:
          "text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.01em]",
        radius: "rounded-none",
        ctaRadius: "rounded-none",
        ctaPadding: "px-8 py-3.5",
        sectionSpacing: "py-24 sm:py-32",
        heroSpacing: "pt-16 pb-24 sm:pt-28 sm:pb-40",
        accentBlockOpacity: 0.08,
        accentBlockOpacityStrong: 0.9,
        monogramShape: "circle",
        gridPattern: "none",
        ctaShadow: "shadow-none",
        labelTracking: "tracking-[0.36em]",
        labelWeight: "font-medium",
        bodyLead: "text-neutral-600",
      };
    case "playful":
      return {
        displayFont:
          '"Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif',
        headlineClass:
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-[-0.025em]",
        eyebrowClass:
          "text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em]",
        subheadClass:
          "text-base sm:text-lg md:text-xl leading-relaxed text-neutral-700",
        sectionHeadingClass:
          "text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em]",
        radius: "rounded-3xl",
        ctaRadius: "rounded-full",
        ctaPadding: "px-7 py-3.5",
        sectionSpacing: "py-16 sm:py-24",
        heroSpacing: "pt-12 pb-20 sm:pt-20 sm:pb-28",
        accentBlockOpacity: 0.18,
        accentBlockOpacityStrong: 1,
        monogramShape: "blob",
        gridPattern: "dot",
        ctaShadow: "shadow-[0_14px_30px_-14px_rgba(0,0,0,0.35)]",
        labelTracking: "tracking-[0.2em]",
        labelWeight: "font-semibold",
        bodyLead: "text-neutral-700",
      };
    case "clean":
    default:
      return {
        displayFont:
          '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
        headlineClass:
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.02em]",
        eyebrowClass:
          "text-[11px] sm:text-xs font-medium uppercase tracking-[0.24em]",
        subheadClass:
          "text-base sm:text-lg md:text-xl leading-relaxed text-neutral-600",
        sectionHeadingClass:
          "text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.015em]",
        radius: "rounded-2xl",
        ctaRadius: "rounded-xl",
        ctaPadding: "px-6 py-3.5",
        sectionSpacing: "py-20 sm:py-28",
        heroSpacing: "pt-14 pb-24 sm:pt-24 sm:pb-32",
        accentBlockOpacity: 0.1,
        accentBlockOpacityStrong: 0.95,
        monogramShape: "rounded",
        gridPattern: "dot",
        ctaShadow: "shadow-[0_10px_25px_-14px_rgba(0,0,0,0.35)]",
        labelTracking: "tracking-[0.24em]",
        labelWeight: "font-medium",
        bodyLead: "text-neutral-600",
      };
  }
}

// Local, prefixed CSS custom properties. User color is never injected into
// class names or <style> tags — only into a scoped inline CSS variable.
function brandVars(color: string, displayFont: string): CSSProperties {
  return {
    ["--alex-accent" as string]: color,
    ["--alex-display" as string]: displayFont,
  } as CSSProperties;
}

// Derive a safe 1–2 letter monogram from the business name. Uses only
// initials from word starts; no HTML injection possible because it renders
// as text content.
function monogramFor(name: string): string {
  const words = name
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter(Boolean);
  if (words.length === 0) return "•";
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return (words[0]![0]! + words[1]![0]!).toUpperCase();
}

function monogramShapeClass(shape: StyleTokens["monogramShape"]): string {
  switch (shape) {
    case "square":
      return "rounded-none";
    case "circle":
      return "rounded-full";
    case "blob":
      return "rounded-[42%_58%_38%_62%/55%_45%_55%_45%]";
    case "rounded":
    default:
      return "rounded-2xl";
  }
}

function GridBackdrop({ pattern }: { pattern: StyleTokens["gridPattern"] }) {
  if (pattern === "none") return null;
  const bg =
    pattern === "dot"
      ? "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.14) 1px, transparent 0)"
      : "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)";
  const size = pattern === "dot" ? "22px 22px" : "56px 56px";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]"
      style={{ backgroundImage: bg, backgroundSize: size }}
    />
  );
}

export function AlexPortfolioRenderer({ config }: AlexPortfolioRendererProps) {
  const t = tokensFor(config.brand.style);
  const hasAbout = config.about !== null;
  const hasEmail = config.contact.email !== null;
  const hasInstagram = config.contact.instagramUrl !== null;
  const year = new Date().getFullYear();

  const accent = "var(--alex-accent)";
  const displayFontStyle: CSSProperties = {
    fontFamily: "var(--alex-display)",
  };
  const monogram = monogramFor(config.identity.businessName);

  // Section numbering — deterministic from optional-section presence.
  let n = 0;
  const nextNum = () => String(++n).padStart(2, "0");
  const offeringNum = nextNum();
  const aboutNum = hasAbout ? nextNum() : null;
  const contactNum = nextNum();

  return (
    <div
      style={brandVars(config.brand.primaryColor, t.displayFont)}
      className="min-h-screen w-full overflow-x-hidden bg-neutral-50 text-neutral-900 antialiased"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-neutral-900/10 bg-neutral-50/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <a
            href="#top"
            className="flex min-w-0 items-center gap-2.5"
            aria-label={`${config.identity.businessName} — home`}
          >
            <span
              aria-hidden="true"
              className={`grid h-8 w-8 shrink-0 place-items-center text-[11px] font-bold text-white sm:h-9 sm:w-9 ${monogramShapeClass(
                t.monogramShape,
              )}`}
              style={{ backgroundColor: accent, ...displayFontStyle }}
            >
              {monogram}
            </span>
            <span
              className="min-w-0 truncate text-[15px] font-semibold tracking-tight sm:text-base"
              style={displayFontStyle}
            >
              {config.identity.businessName}
            </span>
          </a>
          <nav
            aria-label="Primary"
            className="flex shrink-0 items-center gap-1 sm:gap-2"
          >
            <a
              href="#offering"
              className="hidden rounded-md px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 md:inline-block"
            >
              {config.offering.title}
            </a>
            {hasAbout && (
              <a
                href="#about"
                className="hidden rounded-md px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 md:inline-block"
              >
                About
              </a>
            )}
            <a
              href="#contact"
              className="hidden rounded-md px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 md:inline-block"
            >
              Contact
            </a>
            <a
              href={config.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center ${t.ctaRadius} px-4 py-2 text-[13px] font-semibold text-white transition hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-sm ${t.ctaShadow}`}
              style={{ backgroundColor: accent }}
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          id="top"
          className={`relative w-full overflow-hidden ${t.heroSpacing}`}
        >
          <GridBackdrop pattern={t.gridPattern} />

          {/* Decorative accent shapes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-10 hidden h-72 w-72 sm:block"
            style={{
              backgroundColor: accent,
              opacity: t.accentBlockOpacity,
              borderRadius:
                t.monogramShape === "blob"
                  ? "42% 58% 38% 62% / 55% 45% 55% 45%"
                  : t.monogramShape === "circle"
                    ? "9999px"
                    : t.monogramShape === "square"
                      ? "0"
                      : "24px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 bottom-8 hidden h-56 w-56 md:block"
            style={{
              backgroundColor: accent,
              opacity: t.accentBlockOpacity * 0.6,
              borderRadius:
                t.monogramShape === "blob"
                  ? "58% 42% 62% 38% / 45% 55% 45% 55%"
                  : t.monogramShape === "circle"
                    ? "9999px"
                    : t.monogramShape === "square"
                      ? "0"
                      : "24px",
            }}
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <div
                  className={`inline-flex items-center gap-3 ${t.eyebrowClass}`}
                  style={{ color: "rgba(0,0,0,0.55)" }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-px w-8"
                    style={{ backgroundColor: accent }}
                  />
                  <span className={`${t.labelWeight} ${t.labelTracking}`}>
                    {config.identity.category} · {config.contact.cityOrServiceArea}
                  </span>
                </div>

                <h1
                  className={`mt-5 min-w-0 break-words text-neutral-950 ${t.headlineClass}`}
                  style={displayFontStyle}
                >
                  {config.hero.headline}
                </h1>

                <p
                  className={`mt-6 max-w-2xl whitespace-pre-wrap break-words ${t.subheadClass} ${t.bodyLead}`}
                >
                  {config.hero.subhead}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={config.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 ${t.ctaRadius} ${t.ctaPadding} text-[13px] font-semibold text-white transition hover:opacity-90 sm:text-sm ${t.ctaShadow}`}
                    style={{ backgroundColor: accent }}
                  >
                    Chat on WhatsApp
                    <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href="#offering"
                    className={`inline-flex items-center justify-center ${t.ctaRadius} ${t.ctaPadding} border border-neutral-900/15 bg-white text-[13px] font-semibold text-neutral-900 transition hover:border-neutral-900/40 sm:text-sm`}
                  >
                    View {config.offering.title}
                  </a>
                </div>
              </div>

              {/* Editorial identity panel */}
              <aside
                aria-hidden="true"
                className="relative hidden lg:col-span-4 lg:block"
              >
                <div
                  className={`relative overflow-hidden ${t.radius} border border-neutral-900/10 bg-white p-6`}
                >
                  <div
                    className={`grid h-24 w-24 place-items-center text-3xl font-bold text-white ${monogramShapeClass(t.monogramShape)}`}
                    style={{ backgroundColor: accent, ...displayFontStyle }}
                  >
                    {monogram}
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between border-t border-neutral-900/10 pt-3">
                      <span
                        className={`text-[10px] uppercase text-neutral-500 ${t.labelTracking} ${t.labelWeight}`}
                      >
                        Studio
                      </span>
                      <span
                        className="min-w-0 truncate text-sm font-semibold text-neutral-900"
                        style={displayFontStyle}
                      >
                        {config.identity.businessName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-900/10 pt-3">
                      <span
                        className={`text-[10px] uppercase text-neutral-500 ${t.labelTracking} ${t.labelWeight}`}
                      >
                        Based in
                      </span>
                      <span className="min-w-0 truncate text-sm text-neutral-700">
                        {config.contact.cityOrServiceArea}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-900/10 pt-3">
                      <span
                        className={`text-[10px] uppercase text-neutral-500 ${t.labelTracking} ${t.labelWeight}`}
                      >
                        Practice
                      </span>
                      <span className="min-w-0 truncate text-sm text-neutral-700">
                        {config.identity.category}
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* Tagline strip */}
            <div className="mt-14 flex items-center gap-4 border-t border-neutral-900/10 pt-6">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 shrink-0"
                style={{
                  backgroundColor: accent,
                  borderRadius: t.monogramShape === "square" ? "0" : "9999px",
                }}
              />
              <p
                className="min-w-0 flex-1 break-words text-sm text-neutral-600 sm:text-base"
                style={displayFontStyle}
              >
                {config.identity.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Offering */}
        <section
          id="offering"
          className={`relative w-full border-t border-neutral-900/10 bg-white ${t.sectionSpacing}`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <header className="lg:col-span-4">
                <div
                  className={`flex items-center gap-3 ${t.eyebrowClass}`}
                  style={{ color: accent }}
                >
                  <span className={`${t.labelWeight} ${t.labelTracking}`}>
                    {offeringNum} — {config.offering.title}
                  </span>
                </div>
                <h2
                  className={`mt-4 min-w-0 break-words text-neutral-950 ${t.sectionHeadingClass}`}
                  style={displayFontStyle}
                >
                  What we offer
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-6 h-1 w-16"
                  style={{ backgroundColor: accent }}
                />
              </header>
              <div className="lg:col-span-8">
                <div
                  className={`relative overflow-hidden ${t.radius} border border-neutral-900/10 bg-neutral-50 p-6 sm:p-10`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32"
                    style={{
                      backgroundColor: accent,
                      opacity: t.accentBlockOpacity,
                      borderRadius:
                        t.monogramShape === "square"
                          ? "0"
                          : t.monogramShape === "circle"
                            ? "9999px"
                            : "24px",
                    }}
                  />
                  <p
                    className={`relative min-w-0 whitespace-pre-wrap break-words text-base leading-[1.8] sm:text-lg ${t.bodyLead}`}
                  >
                    {config.offering.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        {hasAbout && config.about && (
          <section
            id="about"
            className={`relative w-full border-t border-neutral-900/10 bg-neutral-50 ${t.sectionSpacing}`}
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
                <header className="md:col-span-4">
                  <div
                    className={`flex items-center gap-3 ${t.eyebrowClass}`}
                    style={{ color: accent }}
                  >
                    <span className={`${t.labelWeight} ${t.labelTracking}`}>
                      {aboutNum} — About
                    </span>
                  </div>
                  <h2
                    className={`mt-4 min-w-0 break-words text-neutral-950 ${t.sectionHeadingClass}`}
                    style={displayFontStyle}
                  >
                    The story
                  </h2>
                </header>
                <div className="md:col-span-8">
                  <p
                    className={`min-w-0 whitespace-pre-wrap break-words text-base leading-[1.9] sm:text-lg ${t.bodyLead}`}
                  >
                    {config.about.body}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section
          id="contact"
          className={`relative w-full overflow-hidden border-t border-neutral-900/10 bg-neutral-950 text-neutral-50 ${t.sectionSpacing}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80"
            style={{
              backgroundColor: accent,
              opacity: t.accentBlockOpacityStrong * 0.35,
              borderRadius:
                t.monogramShape === "blob"
                  ? "42% 58% 38% 62% / 55% 45% 55% 45%"
                  : t.monogramShape === "circle"
                    ? "9999px"
                    : t.monogramShape === "square"
                      ? "0"
                      : "40px",
              filter: "blur(2px)",
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
            <div
              className={`flex items-center gap-3 ${t.eyebrowClass}`}
              style={{ color: accent }}
            >
              <span className={`${t.labelWeight} ${t.labelTracking}`}>
                {contactNum} — Contact
              </span>
            </div>
            <h2
              className={`mt-4 max-w-3xl min-w-0 break-words ${t.sectionHeadingClass}`}
              style={displayFontStyle}
            >
              Let&apos;s work together
            </h2>
            <p className="mt-4 max-w-2xl text-base text-neutral-300 sm:text-lg">
              Based in {config.contact.cityOrServiceArea}. Reach out through any
              channel below — a reply usually starts on WhatsApp.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a
                href={config.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden ${t.radius} border border-white/10 bg-white/5 p-5 transition hover:bg-white/10`}
              >
                <span
                  className={`block text-[10px] uppercase text-neutral-400 ${t.labelTracking} ${t.labelWeight}`}
                >
                  WhatsApp
                </span>
                <span className="mt-2 block break-all text-base font-semibold text-white sm:text-lg">
                  {config.contact.whatsappE164}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 text-sm opacity-70 transition group-hover:opacity-100"
                  style={{ color: accent }}
                >
                  →
                </span>
              </a>

              {hasEmail && config.contact.email && (
                <a
                  href={`mailto:${config.contact.email}`}
                  className={`group relative overflow-hidden ${t.radius} border border-white/10 bg-white/5 p-5 transition hover:bg-white/10`}
                >
                  <span
                    className={`block text-[10px] uppercase text-neutral-400 ${t.labelTracking} ${t.labelWeight}`}
                  >
                    Email
                  </span>
                  <span className="mt-2 block break-all text-base font-semibold text-white sm:text-lg">
                    {config.contact.email}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 text-sm opacity-70 transition group-hover:opacity-100"
                    style={{ color: accent }}
                  >
                    →
                  </span>
                </a>
              )}

              {hasInstagram && config.contact.instagramUrl && (
                <a
                  href={config.contact.instagramUrl}
                  target="_blank"
                  rel="noopener nofollow noreferrer"
                  className={`group relative overflow-hidden ${t.radius} border border-white/10 bg-white/5 p-5 transition hover:bg-white/10`}
                >
                  <span
                    className={`block text-[10px] uppercase text-neutral-400 ${t.labelTracking} ${t.labelWeight}`}
                  >
                    Instagram
                  </span>
                  <span className="mt-2 block break-all text-base font-semibold text-white sm:text-lg">
                    {config.contact.instagramUrl.replace("https://", "")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 text-sm opacity-70 transition group-hover:opacity-100"
                    style={{ color: accent }}
                  >
                    →
                  </span>
                </a>
              )}
            </div>

            <div className="mt-10">
              <a
                href={config.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 ${t.ctaRadius} ${t.ctaPadding} text-[13px] font-semibold text-white transition hover:opacity-90 sm:text-sm ${t.ctaShadow}`}
                style={{ backgroundColor: accent }}
              >
                Start a conversation
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-900/10 bg-neutral-50 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
          <p
            className="min-w-0 truncate text-sm text-neutral-600"
            style={displayFontStyle}
          >
            © {year} {config.identity.businessName}
          </p>
          <div className="flex shrink-0 items-center gap-3 text-sm">
            <a
              href={config.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-neutral-900"
            >
              WhatsApp
            </a>
            {hasEmail && config.contact.email && (
              <a
                href={`mailto:${config.contact.email}`}
                className="text-neutral-600 hover:text-neutral-900"
              >
                Email
              </a>
            )}
            {hasInstagram && config.contact.instagramUrl && (
              <a
                href={config.contact.instagramUrl}
                target="_blank"
                rel="noopener nofollow noreferrer"
                className="text-neutral-600 hover:text-neutral-900"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AlexPortfolioRenderer;
