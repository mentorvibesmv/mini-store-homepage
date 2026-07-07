import { Search } from "lucide-react";
import { filterCategories, type FilterCategory } from "@/data/site";
import { cn } from "@/lib/utils";

export function MarketplaceFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  category: string;
  onCategoryChange: (id: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            aria-label="Search templates"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div
          className="flex snap-x gap-2 overflow-x-auto pb-1 lg:flex-1 lg:flex-wrap lg:overflow-visible lg:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >

          {filterCategories.map((c: FilterCategory) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onCategoryChange(c.id)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-primary-gradient text-primary-foreground shadow-soft"
                    : "border border-border bg-background text-foreground hover:border-foreground/20 hover:bg-muted",
                )}
              >
                {c.label}
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}
