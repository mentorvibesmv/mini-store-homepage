import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container, Section } from "@/components/site/primitives";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { ResultsToolbar } from "@/components/marketplace/ResultsToolbar";
import { TemplateCard } from "@/components/marketplace/TemplateCard";
import { TemplateQuickPreview } from "@/components/marketplace/TemplateQuickPreview";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { CustomFallbackCta } from "@/components/marketplace/CustomFallbackCta";
import { RefreshCw } from "lucide-react";
import {
  templates as allTemplates,
  filterCategories,
  sortOptions,
  type Template,
  type SortOption,
} from "@/data/site";

const PAGE_SIZE = 8;

const searchSchema = z.object({
  q: z.string().catch("").default(""),
  category: z.string().catch("all").default("all"),
  sort: z
    .enum(["featured", "newest"])
    .catch("featured")
    .default("featured"),
});

export const Route = createFileRoute("/templates/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Templates Marketplace — Mini Store" },
      {
        name: "description",
        content:
          "Explore premium website templates for restaurants, fashion, real estate, medical, fitness, education, portfolio and more.",
      },
      { property: "og:title", content: "Templates Marketplace — Mini Store" },
      {
        property: "og:description",
        content:
          "Explore premium website templates designed for real businesses, then make them your own.",
      },
    ],
  }),
  component: TemplatesPage,
});

function sortTemplates(list: Template[], sort: SortOption["id"]): Template[] {
  const arr = [...list];
  switch (sort) {
    case "newest":
      return arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "featured":
    default:
      return arr.sort((a, b) => {
        const af = a.featured ? 1 : 0;
        const bf = b.featured ? 1 : 0;
        if (af !== bf) return bf - af;
        return a.displayOrder - b.displayOrder;
      });
  }
}

function filterTemplates(list: Template[], query: string, category: string): Template[] {
  const q = query.trim().toLowerCase();
  return list.filter((t) => {
    if (!t.visible) return false;
    if (category !== "all" && category !== "more" && t.category !== category) return false;
    if (!q) return true;
    return (
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}

function TemplatesPage() {
  const { q, category, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/templates/" });
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filtered = useMemo(
    () => sortTemplates(filterTemplates(allTemplates, q, category), sort),
    [q, category, sort],
  );
  const visible = filtered.slice(0, pageSize);
  const canLoadMore = filtered.length > visible.length;

  const isFiltered = q.trim() !== "" || (category !== "all" && category !== "");
  const categoryLabel = filterCategories.find((c) => c.id === category)?.label ?? "all";

  const updateSearch = (
    patch: Partial<{ q: string; category: string; sort: SortOption["id"] }>,
  ) => {
    setPageSize(PAGE_SIZE);
    navigate({
      search: (prev: { q: string; category: string; sort: SortOption["id"] }) => ({
        ...prev,
        ...patch,
      }),
    });
  };

  const clearFilters = () => {
    setPageSize(PAGE_SIZE);
    navigate({ search: { q: "", category: "all", sort: "featured" } });
  };

  const currentSort: SortOption["id"] = sortOptions.find((o) => o.id === sort)?.id ?? "featured";

  return (
    <SiteLayout>
      <MarketplaceHero />

      <Section className="pt-2">
        <Container>
          <MarketplaceFilters
            query={q}
            onQueryChange={(v) => updateSearch({ q: v })}
            category={category}
            onCategoryChange={(id) => updateSearch({ category: id })}
          />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <ResultsToolbar
            total={filtered.length}
            isFiltered={isFiltered}
            categoryLabel={categoryLabel}
            sort={currentSort}
            onSortChange={(id) => updateSearch({ sort: id })}
            onClearFilters={clearFilters}
          />

          {filtered.length === 0 ? (
            <div className="mt-8">
              <EmptyState onClearFilters={clearFilters} />
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {visible.map((t) => (
                  <TemplateCard key={t.id} template={t} onQuickPreview={setPreviewTemplate} />
                ))}
              </div>

              {canLoadMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setPageSize((s) => s + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:border-foreground/20"
                  >
                    Load More Templates <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      <CustomFallbackCta />

      <TemplateQuickPreview
        template={previewTemplate}
        open={previewTemplate !== null}
        onOpenChange={(o) => !o && setPreviewTemplate(null)}
      />
    </SiteLayout>
  );
}
