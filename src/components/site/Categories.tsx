import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionTitle } from "./primitives";
import { categories, type Category } from "@/data/site";
import { categoryIcon } from "./icons";
import { cn } from "@/lib/utils";

const toneClass: Record<Category["tone"], string> = {
  violet: "bg-tone-violet text-primary",
  blue:   "bg-tone-blue text-[oklch(0.45_0.15_240)]",
  orange: "bg-tone-orange text-[oklch(0.5_0.15_50)]",
  green:  "bg-tone-green text-[oklch(0.42_0.12_155)]",
  pink:   "bg-tone-pink text-[oklch(0.5_0.15_355)]",
  amber:  "bg-tone-amber text-[oklch(0.48_0.13_75)]",
  sky:    "bg-tone-sky text-[oklch(0.45_0.13_220)]",
  muted:  "bg-muted text-foreground",
};

export function Categories() {
  return (
    <Section id="templates">
      <Container>
        <SectionTitle
          eyebrow="Browse by category"
          title="Find the perfect starting point."
          description="Hand-picked template collections organized by industry and use case."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = categoryIcon[c.id];
            return (
              <a
                key={c.id}
                href="#"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                      toneClass[c.tone],
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {c.label}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {c.count}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
