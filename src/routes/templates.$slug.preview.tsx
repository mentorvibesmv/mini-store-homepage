import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section } from "@/components/site/primitives";
import { templates } from "@/data/site";

export const Route = createFileRoute("/templates/$slug/preview")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Live Preview — Mini Store` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TemplatePreviewPage,
});

function TemplatePreviewPage() {
  const { slug } = Route.useParams();
  const template = templates.find((t) => t.slug === slug);

  return (
    <SiteLayout>
      <Section>
        <Container>
          <Link
            to="/templates"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to marketplace
          </Link>

          <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            {template ? (
              <>
                <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 p-8 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">
                      {template.category}
                    </p>
                    <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                      {template.title}
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                      {template.shortDescription}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-gradient px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
                  >
                    <ExternalLink className="h-4 w-4" /> Open Full Demo
                  </a>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <h1 className="text-xl font-semibold text-foreground">Template not found</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  The template you're looking for doesn't exist.
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}
