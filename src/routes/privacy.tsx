import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section } from "@/components/site/primitives";
import { pageSeo, jsonLd, webPageSchema, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const TITLE = "Privacy Policy — Mini Store";
const DESCRIPTION =
  "How Mini Store collects, uses and protects the personal information you share with us through our website, WhatsApp and email.";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const seo = pageSeo({ path: "/privacy", title: TITLE, description: DESCRIPTION });
    return {
      ...seo,
      scripts: [
        jsonLd(webPageSchema({ path: "/privacy", name: TITLE, description: DESCRIPTION })),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ),
      ],
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Legal</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: 13 July 2026</p>

          <div className="prose prose-neutral mt-8 max-w-none text-[15px] leading-relaxed text-foreground/90">
            <h2 className="mt-8 text-xl font-semibold">Overview</h2>
            <p>
              This page explains what information {siteConfig.companyName} collects when you
              browse our website, contact us on WhatsApp or email, or request a website. We
              only collect information you knowingly provide, and we use it strictly to reply
              to your enquiry and deliver the service you asked for.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Information we collect</h2>
            <ul className="mt-2 list-disc pl-6">
              <li>Contact details you submit through forms, WhatsApp or email — name, phone, email, business name.</li>
              <li>Project details you share so we can prepare a quote or design.</li>
              <li>Basic technical information (browser, device, referring page) collected by standard web logs.</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold">How we use information</h2>
            <ul className="mt-2 list-disc pl-6">
              <li>To respond to your enquiry and share proposals.</li>
              <li>To deliver, host and support the website you buy from us.</li>
              <li>To keep records for tax, invoicing and legal compliance.</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold">Sharing</h2>
            <p>
              We do not sell your information. We share it only with service providers we use
              to run our business (for example hosting, domain registrars, payment processors)
              and only to the extent needed to deliver your service.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Cookies</h2>
            <p>
              Our website uses only essential cookies required for the site to function. We do
              not run advertising or third-party tracking cookies at this time.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Your choices</h2>
            <p>
              You can request a copy of the personal information we hold about you, or ask us
              to correct or delete it, by writing to{" "}
              <a className="text-primary hover:underline" href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>
              . We will respond within a reasonable time.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Contact</h2>
            <p>
              Questions about this policy? Email{" "}
              <a className="text-primary hover:underline" href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>{" "}
              or visit our{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact page
              </Link>
              .
            </p>

            <p className="mt-8 text-xs text-muted-foreground">
              This page is provided as a general privacy statement for our website studio
              services and is not legal advice. For specific compliance requirements (for
              example GDPR or DPDP), consult a qualified professional.
            </p>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}
