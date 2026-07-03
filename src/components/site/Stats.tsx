import { Container, Section } from "./primitives";
import { stats } from "@/data/site";

export function Stats() {
  return (
    <Section className="pt-4 sm:pt-8 lg:pt-10">
      <Container>
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card-tint p-3 shadow-soft sm:p-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl bg-background/60 px-6 py-8 text-center transition-transform duration-300 hover:-translate-y-0.5 sm:px-8 sm:py-10"
            >
              <div className="font-display text-5xl tracking-tight text-foreground sm:text-6xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
