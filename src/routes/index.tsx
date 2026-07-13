import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero, Categories, Templates, Features, CustomCta } from "@/components/site";
import { pageSeo, jsonLd, webPageSchema, breadcrumbSchema } from "@/lib/seo";

const TITLE = "Mini Store — Website Designs & Custom Websites for Small Businesses";
const DESCRIPTION =
  "Mini Store is a premium website studio and template marketplace helping Indian small businesses launch a professional online presence — ready-made designs, Mini Store plans, and custom websites.";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = pageSeo({
      path: "/",
      title: TITLE,
      description: DESCRIPTION,
      keywords:
        "website design, small business website India, website templates, custom website, mini store, ecommerce website, portfolio website",
    });
    return {
      ...seo,
      scripts: [
        jsonLd(
          webPageSchema({
            path: "/",
            name: TITLE,
            description: DESCRIPTION,
          }),
        ),
        jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }])),
      ],
    };
  },
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Categories />
      <Templates />
      <Features />
      <CustomCta />
    </SiteLayout>
  );
}
