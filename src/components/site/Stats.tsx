import { Container, Section } from "./primitives";
import { stats, type StatTone } from "@/data/site";
import { LayoutTemplate, Users, Package, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  templates: LayoutTemplate,
  customers: Users,
  projects: Package,
  star: Star,
};

const toneClass: Record<StatTone, string> = {
  violet: "bg-tone-violet text-primary",
  blue: "bg-tone-blue text-[oklch(0.45_0.15_240)]",
  green: "bg-tone-green text-[oklch(0.42_0.12_155)]",
  orange: "bg-tone-orange text-[oklch(0.5_0.15_50)]",
};

export function Stats() {
  return (
    <Section className="pt-2 pb-4 sm:pt-4 sm:pb-6 lg:pt-6 lg:pb-8">
      <Container>
        <div className="grid grid-cols-2 gap-4 rounded-[28px] border border-border bg-card p-6 shadow-soft sm:p-8 lg:grid-cols-4 lg:gap-4">
          {stats.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <div key={s.id} className="flex items-center gap-4 px-3 py-2">
                <span
                  className={cn(
                    "grid h-14 w-14 shrink-0 place-items-center rounded-2xl",
                    toneClass[s.tone],
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <div className="text-[28px] font-bold leading-tight tracking-tight text-foreground">
                    {s.value}
                  </div>
                  <div className="text-[15px] font-semibold text-foreground">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
