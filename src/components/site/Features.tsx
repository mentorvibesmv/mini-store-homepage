import { Container, Section, SectionTitle } from "./primitives";
import { features } from "@/data/site";
import { featureIcon } from "./icons";

export function Features() {
  return (
    <Section id="about">
      <Container>
        <SectionTitle
          eyebrow="Why Mini Store"
          title="Every detail, considered."
          description="We obsess over the small things so your website feels effortless — for you, and for your customers."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = featureIcon[f.icon];
            return (
              <div
                key={f.id}
                className="group rounded-3xl border border-border bg-card-tint p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-gradient text-primary-foreground shadow-soft transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
