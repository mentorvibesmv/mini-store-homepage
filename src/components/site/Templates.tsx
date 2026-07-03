import { Link } from "@tanstack/react-router";
import { Star, Eye, ExternalLink, ArrowRight } from "lucide-react";
import { Container, Section, Button } from "./primitives";
import { templates } from "@/data/site";

export function Templates() {
  return (
    <Section className="bg-surface">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Templates
          </h2>
          <Link
            to="/templates"
            className="hidden items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            View All Templates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.slice(0, 4).map((t) => (
            <article
              key={t.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">
                    {t.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-current text-[oklch(0.75_0.15_85)]" />
                    <span className="font-medium text-foreground">{t.rating}</span>
                    <span>({t.reviews})</span>
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold text-foreground">{t.title}</h3>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-bold text-foreground">{t.priceLabel}</span>
                </div>
                <div className="mt-auto flex items-center gap-2 pt-2">
                  <Link
                    to="/templates/$slug/preview"
                    params={{ slug: t.slug }}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary-gradient px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                  </Link>
                  <Link
                    to="/templates"
                    aria-label="Quick preview"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background text-foreground transition-all hover:border-foreground/30 hover:-translate-y-0.5"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:hidden">
          <Button href="/templates" variant="secondary">
            View all templates
          </Button>
        </div>
      </Container>
    </Section>
  );
}
