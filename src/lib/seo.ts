import { siteConfig } from "@/lib/site-config";

const BASE = siteConfig.siteUrl.replace(/\/$/, "");

export const absoluteUrl = (path: string): string => {
  if (!path) return BASE;
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
};

export const DEFAULT_OG_IMAGE = absoluteUrl("/og-default.jpg");

export interface PageSeoInput {
  path: string; // route path, e.g. "/pricing"
  title: string; // full <title> value
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string; // absolute or root-relative
  robots?: string; // e.g. "noindex"
  keywords?: string;
}

interface HeadPieces {
  meta: Array<{ [k: string]: string }>;
  links: Array<{ [k: string]: string }>;
}

/**
 * Builds the full meta+links block for a public route:
 * title, description, canonical, og:*, twitter:*.
 */
export function pageSeo(input: PageSeoInput): HeadPieces {
  const url = absoluteUrl(input.path);
  const ogTitle = input.ogTitle ?? input.title;
  const ogDescription = input.ogDescription ?? input.description;
  const ogImage = absoluteUrl(input.ogImage ?? DEFAULT_OG_IMAGE);
  const ogType = input.ogType ?? "website";

  const meta: Array<{ [k: string]: string }> = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { property: "og:type", content: ogType },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: ogTitle },
    { property: "og:site_name", content: siteConfig.companyName },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
    { name: "twitter:image", content: ogImage },
  ];
  if (input.keywords) meta.push({ name: "keywords", content: input.keywords });
  if (input.robots) meta.push({ name: "robots", content: input.robots });

  const links: Array<{ [k: string]: string }> = [{ rel: "canonical", href: url }];

  return { meta, links };
}

// ---------- JSON-LD schema builders ----------

type Json = Record<string, unknown>;

export const jsonLd = (data: Json) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});

export const orgSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: siteConfig.companyName,
  url: BASE,
  logo: absoluteUrl("/og-default.jpg"),
  email: siteConfig.supportEmail,
  telephone: `+${siteConfig.whatsappE164}`,
  areaServed: "IN",
  sameAs: Object.values(siteConfig.social).filter(Boolean),
});

export const websiteSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: siteConfig.companyName,
  publisher: { "@id": `${BASE}/#organization` },
  inLanguage: "en-IN",
});

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const faqSchema = (items: Array<{ question: string; answer: string }>): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const webPageSchema = (opts: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}): Json => ({
  "@context": "https://schema.org",
  "@type": opts.type ?? "WebPage",
  "@id": `${absoluteUrl(opts.path)}#webpage`,
  url: absoluteUrl(opts.path),
  name: opts.name,
  description: opts.description,
  isPartOf: { "@id": `${BASE}/#website` },
  about: { "@id": `${BASE}/#organization` },
  inLanguage: "en-IN",
});

export const serviceSchema = (opts: {
  name: string;
  description: string;
  path: string;
  price?: string;
  priceCurrency?: string;
}): Json => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  provider: { "@id": `${BASE}/#organization` },
  areaServed: "IN",
  url: absoluteUrl(opts.path),
  ...(opts.price
    ? {
        offers: {
          "@type": "Offer",
          price: opts.price,
          priceCurrency: opts.priceCurrency ?? "INR",
        },
      }
    : {}),
});

export const productSchema = (opts: {
  name: string;
  description: string;
  path: string;
  image: string;
  category: string;
}): Json => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: opts.name,
  description: opts.description,
  image: absoluteUrl(opts.image),
  category: opts.category,
  url: absoluteUrl(opts.path),
  brand: { "@type": "Brand", name: siteConfig.companyName },
});
