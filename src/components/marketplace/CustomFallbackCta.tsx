import { Check } from "lucide-react";
import { Container, Section, Button } from "@/components/site/primitives";
import { marketplaceCta } from "@/data/site";
import ctaImg from "@/assets/cta-illustration.jpg";

export function CustomFallbackCta() {
  return (
    <Section className="pb-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[color:var(--primary-soft)] via-white to-[color:var(--tone-sky)] px-6 py-10 shadow-soft sm:px-10 sm:py-10 lg:px-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-soft blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_auto_1fr]">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {marketplaceCta.title}
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
                {marketplaceCta.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {marketplaceCta.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:justify-self-center">
              <Button href={marketplaceCta.cta.href} size="lg">
                {marketplaceCta.cta.label}
              </Button>
            </div>
            <div className="hidden lg:block">
              <img
                src={ctaImg}
                alt=""
                loading="lazy"
                className="ml-auto h-auto w-full max-w-[240px] rounded-2xl opacity-90 drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
