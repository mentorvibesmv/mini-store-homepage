// Alex Portfolio renderer — pure, data-driven from StoreConfig.
// No context, no storage, no APIs. Renders only fields present in config.

import type { CSSProperties } from "react";
import type { StoreConfig } from "@/lib/launch/types";

export type AlexPortfolioRendererProps = {
  config: StoreConfig;
};

type StyleTokens = {
  headingScale: string;
  subheadScale: string;
  radius: string;
  sectionSpacing: string;
  ctaPadding: string;
  ctaRadius: string;
  accentWeight: number; // 0-1 how prominent brand color is used
};

function tokensFor(style: StoreConfig["brand"]["style"]): StyleTokens {
  switch (style) {
    case "bold":
      return {
        headingScale: "text-4xl sm:text-5xl md:text-6xl",
        subheadScale: "text-lg sm:text-xl",
        radius: "rounded-xl",
        sectionSpacing: "py-16 sm:py-20",
        ctaPadding: "px-7 py-3.5",
        ctaRadius: "rounded-lg",
        accentWeight: 1,
      };
    case "elegant":
      return {
        headingScale: "text-3xl sm:text-4xl md:text-5xl font-light tracking-tight",
        subheadScale: "text-base sm:text-lg",
        radius: "rounded-md",
        sectionSpacing: "py-20 sm:py-28",
        ctaPadding: "px-6 py-3",
        ctaRadius: "rounded-md",
        accentWeight: 0.6,
      };
    case "playful":
      return {
        headingScale: "text-4xl sm:text-5xl",
        subheadScale: "text-base sm:text-lg",
        radius: "rounded-3xl",
        sectionSpacing: "py-14 sm:py-20",
        ctaPadding: "px-6 py-3",
        ctaRadius: "rounded-full",
        accentWeight: 0.9,
      };
    case "clean":
    default:
      return {
        headingScale: "text-3xl sm:text-4xl md:text-5xl",
        subheadScale: "text-base sm:text-lg",
        radius: "rounded-2xl",
        sectionSpacing: "py-16 sm:py-24",
        ctaPadding: "px-6 py-3",
        ctaRadius: "rounded-xl",
        accentWeight: 0.8,
      };
  }
}

// Local, prefixed CSS custom property to avoid leaking user color into
// global tokens. Consumed via inline style on the root wrapper.
function brandVars(color: string): CSSProperties {
  return { ["--alex-accent" as string]: color } as CSSProperties;
}

export function AlexPortfolioRenderer({ config }: AlexPortfolioRendererProps) {
  const t = tokensFor(config.brand.style);
  const hasAbout = config.about !== null;
  const hasEmail = config.contact.email !== null;
  const hasInstagram = config.contact.instagramUrl !== null;
  const year = new Date().getFullYear();

  const accent = "var(--alex-accent)";

  return (
    <div
      style={brandVars(config.brand.primaryColor)}
      className="min-h-screen w-full overflow-x-hidden bg-white text-neutral-900 antialiased"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-neutral-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <a
            href="#top"
            className="min-w-0 truncate text-base font-semibold tracking-tight sm:text-lg"
          >
            {config.identity.businessName}
          </a>
          <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
            <a
              href="#services"
              className="hidden rounded-md px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 sm:inline-block"
            >
              {config.offering.title}
            </a>
            {hasAbout && (
              <a
                href="#about"
                className="hidden rounded-md px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 sm:inline-block"
              >
                About
              </a>
            )}
            <a
              href="#contact"
              className="hidden rounded-md px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 sm:inline-block"
            >
              Contact
            </a>
            <a
              href={config.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center ${t.ctaRadius} ${t.ctaPadding} text-sm font-medium text-white shadow-sm transition hover:opacity-90`}
              style={{ backgroundColor: accent }}
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className={`w-full ${t.sectionSpacing}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p
              className="mb-4 inline-block text-xs font-medium uppercase tracking-wider"
              style={{
                color: accent,
                opacity: 0.6 + 0.4 * t.accentWeight,
              }}
            >
              {config.identity.businessName} · {config.contact.cityOrServiceArea}
            </p>
            <h1
              className={`min-w-0 break-words font-semibold leading-tight ${t.headingScale}`}
            >
              {config.hero.headline}
            </h1>
            <p
              className={`mt-5 max-w-2xl whitespace-pre-wrap break-words text-neutral-600 ${t.subheadScale}`}
            >
              {config.hero.subhead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={config.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center ${t.ctaRadius} ${t.ctaPadding} text-sm font-medium text-white shadow-sm transition hover:opacity-90`}
                style={{ backgroundColor: accent }}
              >
                Chat on WhatsApp
              </a>
              <a
                href="#services"
                className={`inline-flex items-center justify-center ${t.ctaRadius} ${t.ctaPadding} border border-neutral-300 text-sm font-medium text-neutral-800 transition hover:border-neutral-400`}
              >
                View {config.offering.title}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Offering */}
      <section
        id="services"
        className={`w-full border-t border-neutral-200/70 bg-neutral-50 ${t.sectionSpacing}`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-baseline gap-3">
            <span
              className="inline-block h-2 w-8 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden
            />
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {config.offering.title}
            </h2>
          </div>
          <div
            className={`${t.radius} border border-neutral-200 bg-white p-6 shadow-sm sm:p-8`}
          >
            <p className="min-w-0 whitespace-pre-wrap break-words text-base leading-relaxed text-neutral-800 sm:text-lg">
              {config.offering.body}
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      {hasAbout && config.about && (
        <section
          id="about"
          className={`w-full border-t border-neutral-200/70 ${t.sectionSpacing}`}
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-6 flex items-baseline gap-3">
              <span
                className="inline-block h-2 w-8 rounded-full"
                style={{ backgroundColor: accent }}
                aria-hidden
              />
              <h2 className="text-2xl font-semibold sm:text-3xl">About</h2>
            </div>
            <p className="min-w-0 whitespace-pre-wrap break-words text-base leading-relaxed text-neutral-700 sm:text-lg">
              {config.about.body}
            </p>
          </div>
        </section>
      )}

      {/* Contact */}
      <section
        id="contact"
        className={`w-full border-t border-neutral-200/70 bg-neutral-50 ${t.sectionSpacing}`}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-6 flex items-baseline gap-3">
            <span
              className="inline-block h-2 w-8 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden
            />
            <h2 className="text-2xl font-semibold sm:text-3xl">Get in touch</h2>
          </div>
          <p className="text-neutral-600">
            Based in {config.contact.cityOrServiceArea}. Reach out through any
            channel below.
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-neutral-500">WhatsApp:</span>
              <a
                href={config.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all font-medium underline-offset-4 hover:underline"
                style={{ color: accent }}
              >
                {config.contact.whatsappE164}
              </a>
            </li>
            {hasEmail && config.contact.email && (
              <li className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-neutral-500">Email:</span>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="break-all font-medium underline-offset-4 hover:underline"
                  style={{ color: accent }}
                >
                  {config.contact.email}
                </a>
              </li>
            )}
            {hasInstagram && config.contact.instagramUrl && (
              <li className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-neutral-500">Instagram:</span>
                <a
                  href={config.contact.instagramUrl}
                  target="_blank"
                  rel="noopener nofollow noreferrer"
                  className="break-all font-medium underline-offset-4 hover:underline"
                  style={{ color: accent }}
                >
                  {config.contact.instagramUrl.replace("https://", "")}
                </a>
              </li>
            )}
          </ul>
          <div className="mt-8">
            <a
              href={config.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center ${t.ctaRadius} ${t.ctaPadding} text-sm font-medium text-white shadow-sm transition hover:opacity-90`}
              style={{ backgroundColor: accent }}
            >
              Start a conversation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-200/70 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
          <p className="min-w-0 truncate text-sm text-neutral-600">
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
