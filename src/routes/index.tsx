import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero, Categories, Templates, Features, CustomCta } from "@/components/site";

export const Route = createFileRoute("/")({
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
