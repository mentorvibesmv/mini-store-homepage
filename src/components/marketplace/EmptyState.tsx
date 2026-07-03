import { SearchX } from "lucide-react";

export function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">No templates found</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Try another search or clear your filters.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-5 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
      >
        Clear Filters
      </button>
    </div>
  );
}
