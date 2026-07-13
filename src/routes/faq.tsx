import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section } from "@/components/site/primitives";
import { pageSeo, jsonLd, webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { pricingPage, customWebsitesPage, contactPage } from "@/data/site";
import { siteConfig } from "@/lib/site-config";

const TITLE = "FAQ — Mini Store Website Studio";
const DESCRIPTION =
  "Answers to common questions about Mini Store plans, custom websites, pricing, delivery timelines, support and how to place an order.";

// Aggregate curated answer-first FAQs
const BRAND_FAQS: Array<{ id: string; question: string; answer: string }> = [
  {
    id: "what-is",
    question: "What is Mini Store?",
    answer:
      "Mini Store is a premium website studio and template marketplace that helps small businesses in India launch a professional online presence. You pick a ready-made design or request a custom website, and our team handles setup, hosting and support.",
  },
  {
    id: "who-for",
    question: "Who is Mini Store for?",
    answer:
      "Small and mid-sized businesses in India — restaurants, fashion brands, real estate, medical, fitness, education, portfolio and studio businesses — that want a professional website without hiring an in-house team.",
  },
  {
    id: "cost",
    question: "How much does a website cost?",
    answer:
      "Mini Store Basic starts at ₹299/month, Commerce Managed starts at ₹4,999 setup plus a subscription, and Custom Websites are quoted based on your requirements. All fees are shown on the Pricing page with no hidden charges.",
  },
  {
    id: "how-order",
    question: "How do customers place an order?",
    answer:
      "Browse the template gallery or the Custom Websites page, then click the WhatsApp or Contact button. Our team confirms your requirements and sends a quote — no signup or upfront payment is needed to start a conversation.",
  },
  {
    id: "whatsapp",
    question: "How does WhatsApp consultation work?",
    answer:
      "Tap any WhatsApp button on the site and you'll open a chat with our team. We reply during business hours (Monday–Saturday, 9:00 AM – 7:00 PM IST) with questions, a proposed scope and a transparent quote.",
  },
  {
    id: "delivery",
    question: "How long does delivery take?",
    answer:
      "Ready-made designs on Mini Store plans typically go live in a few working days after we receive your content. Custom websites are delivered in 2–4 weeks depending on scope and how quickly we receive content and feedback.",
  },
];

const ALL_FAQ_SOURCES = [
  { key: "brand", title: "About Mini Store", items: BRAND_FAQS },
  { key: "plans", title: "Plans & Pricing", items: pricingPage.faq.items },
  { key: "custom", title: "Custom Websites", items: customWebsitesPage.faq.items },
  { key: "contact", title: "Contact & Support", items: contactPage.faq.items },
];

const FAQ_SCHEMA_ITEMS = ALL_FAQ_SOURCES.flatMap((g) =>
  g.items.map((i) => ({ question: i.question, answer: i.answer })),
);

export const Route = createFileRoute("/faq")({
  head: () => {
    const seo = pageSeo({ path: "/faq", title: TITLE, description: DESCRIPTION });
    return {
      ...seo,
      scripts: [
        jsonLd(webPageSchema({ path: "/faq", name: TITLE, description: DESCRIPTION })),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ),
        jsonLd(faqSchema(FAQ_SCHEMA_ITEMS)),
      ],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Frequently Asked Questions
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions, clearly answered
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Everything you need to know about Mini Store plans, custom websites and how we
            work. Can't find your answer?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Get in touch
            </Link>{" "}
            or WhatsApp us at {siteConfig.whatsappDisplay}.
          </p>

          <div className="mt-10 space-y-10">
            {ALL_FAQ_SOURCES.map((group) => (
              <section key={group.key}>
                <h2 className="text-lg font-semibold text-foreground">{group.title}</h2>
                <Accordion type="single" collapsible className="mt-4">
                  {group.items.map((item) => (
                    <AccordionItem key={item.id} value={`${group.key}-${item.id}`}>
                      <AccordionTrigger className="text-left text-[15px] font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}
