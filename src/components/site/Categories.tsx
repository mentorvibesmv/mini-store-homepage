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
        <SectionTitle title="Browse Templates by Category" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => {
            const Icon = categoryIcon[c.id];
            return (
              <a
                key={c.id}
                href="#"
                className={cn(
                  "group flex flex-col items-center justify-center gap-3 rounded-2xl border border-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft",
                  toneClass[c.tone],
                )}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="text-center text-sm font-semibold text-foreground">
                  {c.label}
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
