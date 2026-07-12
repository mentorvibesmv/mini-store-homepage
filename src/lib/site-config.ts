// Central site configuration.
// Public (VITE_*) values are safe to expose in client bundles.
// Falls back to sensible defaults so builds don't break when env is unset.

const env = import.meta.env;

export const siteConfig = {
  companyName: env.VITE_COMPANY_NAME ?? "Mini Store",
  siteUrl: env.VITE_SITE_URL ?? "https://noble-web-architect.lovable.app",
  supportEmail: env.VITE_SUPPORT_EMAIL ?? "hello@ministore.in",
  businessEmail: env.VITE_BUSINESS_EMAIL ?? "hello@ministore.in",
  // WhatsApp: E.164 digits only (no + or spaces) — used in wa.me links.
  whatsappE164: env.VITE_WHATSAPP_E164 ?? "919123456789",
  whatsappDisplay: env.VITE_WHATSAPP_DISPLAY ?? "+91 91234 56789",
  teamWhatsappE164: env.VITE_TEAM_WHATSAPP_E164 ?? "919025800838",
  social: {
    instagram: env.VITE_SOCIAL_INSTAGRAM ?? "",
    facebook: env.VITE_SOCIAL_FACEBOOK ?? "",
    twitter: env.VITE_SOCIAL_TWITTER ?? "",
    linkedin: env.VITE_SOCIAL_LINKEDIN ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
