import { Container, Section, SectionTitle } from "./primitives";
import { features, type Feature } from "@/data/site";
import { featureIcon } from "./icons";
import { cn } from "@/lib/utils";

const toneClass: Record<Feature["tone"], { bg: string; icon: string }> = {
  violet: { bg: "bg-tone-violet", icon: "bg-primary text-primary-foreground" },
  blue:   { bg: "bg-tone-blue",   icon: "bg-[oklch(0.55_0.18_240)] text-white" },
  pink:   { bg: "bg-tone-pink",   icon: "bg-[oklch(0.6_0.18_355)] text-white" },
  green:  { bg: "bg-tone-green",  icon: "bg-[oklch(0.52_0.14_155)] text-white" },
  amber:  { bg: "bg-tone-amber",  icon: "bg-[oklch(0.6_0.16_75)] text-white" },
  sky:    { bg: "bg-tone-sky",    icon: "bg-[oklch(0.55_0.15_220)] text-white" },
};

export function Features() {
  return (
    <Section id="about">
      <Container>
        <SectionTitle title="Why Choose Mini Store?" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((f) => {
            const Icon = featureIcon[f.icon];
            const tones = toneClass[f.tone];
            return (
              <div
                key={f.id}
                className={cn(
                  "group flex flex-col rounded-2xl border border-border/60 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                  tones.bg,
                )}
              >
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl shadow-soft", tones.icon)}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold leading-snug text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
