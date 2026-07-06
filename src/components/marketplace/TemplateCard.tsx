import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { Template } from "@/data/site";

function statusBadge(t: Template): { label: string; tone: string } | null {
  if (t.featured) return { label: "Featured", tone: "bg-tone-amber text-[oklch(0.48_0.13_75)]" };
  if (t.popular) return { label: "Popular", tone: "bg-tone-orange text-[oklch(0.5_0.15_50)]" };
  if (t.isNew) return { label: "New", tone: "bg-tone-green text-[oklch(0.42_0.12_155)]" };
  return null;
}

export function TemplateCard({
  template,
  onQuickPreview: _onQuickPreview,
}: {
  template: Template;
  onQuickPreview?: (t: Template) => void;
}) {
  const badge = statusBadge(template);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={template.image}
          alt={template.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">
            {template.category}
          </span>
          {badge && (
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", badge.tone)}>
              ★ {badge.label}
            </span>
          )}
        </div>

        <h3 className="text-[17px] font-semibold text-foreground">{template.title}</h3>

        <p className="text-xs text-muted-foreground line-clamp-2">{template.shortDescription}</p>

        <div className="mt-auto pt-4">
          <Link
            to="/templates/$slug"
            params={{ slug: template.slug }}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary-gradient px-5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
