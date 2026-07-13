import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section } from "@/components/site/primitives";
import { pageSeo, jsonLd, webPageSchema, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const TITLE = "Terms & Conditions — Mini Store";
const DESCRIPTION =
  "The terms that govern use of the Mini Store website, our template designs, Mini Store plans and custom website services.";

export const Route = createFileRoute("/terms")({
  head: () => {
    const seo = pageSeo({ path: "/terms", title: TITLE, description: DESCRIPTION });
    return {
      ...seo,
      scripts: [
        jsonLd(webPageSchema({ path: "/terms", name: TITLE, description: DESCRIPTION })),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms & Conditions", path: "/terms" },
          ]),
        ),
      ],
    };
  },
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Legal</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: 13 July 2026</p>

          <div className="prose prose-neutral mt-8 max-w-none text-[15px] leading-relaxed text-foreground/90">
            <h2 className="mt-8 text-xl font-semibold">Agreement</h2>
            <p>
              By using this website or engaging {siteConfig.companyName} for a website design
              or development service, you agree to these terms. Please read them carefully.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Services</h2>
            <p>
              {siteConfig.companyName} provides ready-made website designs, Mini Store plans
              (setup, hosting and maintenance) and custom website design and development. The
              specific deliverables, timelines and fees for each engagement are confirmed in
              writing before work begins.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Fees and payment</h2>
            <ul className="mt-2 list-disc pl-6">
              <li>Subscription plans are billed in advance. Auto-renewal is enabled only with your explicit consent.</li>
              <li>Setup fees for custom projects are billed as agreed in your proposal.</li>
              <li>Third-party costs (domain registration, premium integrations) are disclosed upfront and billed by the provider.</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold">Warranty and support</h2>
            <p>
              Standard custom website deliverables include a 30-day warranty covering fixes
              for defects in the work delivered. Ongoing maintenance is available as a
              separate plan. Warranty does not cover changes in scope, third-party service
              failures, or issues caused by content or code you introduce after delivery.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Intellectual property</h2>
            <p>
              On full payment, you receive a licence to use the delivered website for your
              business. Template designs remain the intellectual property of{" "}
              {siteConfig.companyName} and are licensed for use on the specific site we build
              for you. You retain ownership of your own content, brand and data.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Cancellation and refunds</h2>
            <p>
              Subscription plans can be cancelled before the next renewal. Setup fees and
              completed work are non-refundable once accepted. Where work has not started, we
              will refund pre-paid amounts less any incurred costs.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Acceptable use</h2>
            <p>
              You agree not to use the website or our services for anything unlawful, harmful,
              or that infringes the rights of others.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Limitation of liability</h2>
            <p>
              To the extent permitted by law, our total liability for any claim arising from
              our services is limited to the fees paid by you in the twelve months preceding
              the claim.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Changes</h2>
            <p>
              We may update these terms from time to time. The version on this page is the
              current version and applies to all new engagements.
            </p>

            <h2 className="mt-8 text-xl font-semibold">Contact</h2>
            <p>
              Questions about these terms? Email{" "}
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
              This page is provided as a general template for a small website studio and is
              not legal advice. For a bespoke contract, consult a qualified professional.
            </p>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}
