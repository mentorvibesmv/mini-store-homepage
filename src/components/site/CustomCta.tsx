import { Container, Section, Button } from "./primitives";
import { customCta } from "@/data/site";
import ctaImg from "@/assets/cta-illustration.jpg";

export function CustomCta() {
  return (
    <Section id="custom" className="pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card-tint px-8 py-14 shadow-soft sm:px-14 sm:py-16 lg:px-20 lg:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-soft blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-tone-pink blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {customCta.eyebrow}
              </div>
              <h2 className="text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                {customCta.title}
              </h2>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                {customCta.description}
              </p>
              <div className="mt-8">
                <Button href={customCta.cta.href} size="lg">
                  {customCta.cta.label}
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={ctaImg}
                alt="Custom website illustration"
                loading="lazy"
                width={1200}
                height={1000}
                className="mx-auto h-auto w-full max-w-md drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
