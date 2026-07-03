import { X } from "lucide-react";
import { sortOptions, type SortOption } from "@/data/site";

export function ResultsToolbar({
  total,
  isFiltered,
  categoryLabel,
  sort,
  onSortChange,
  onClearFilters,
}: {
  total: number;
  isFiltered: boolean;
  categoryLabel: string;
  sort: SortOption["id"];
  onSortChange: (id: SortOption["id"]) => void;
  onClearFilters: () => void;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-semibold text-foreground">
          {isFiltered ? `Showing ${categoryLabel} templates` : "Showing all templates"}
        </p>
        <p className="text-xs text-muted-foreground">
          {total} {total === 1 ? "template" : "templates"} found
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort by:
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption["id"])}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <X className="h-3.5 w-3.5" /> Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
