import { Container, Badge, Button } from "./primitives";
import { hero } from "@/data/site";
import { trustIcon } from "./icons";
import heroDevices from "@/assets/hero-devices.jpg";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero">
      <Container className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        <div className="fade-up">
          <Badge>{hero.badge}</Badge>
          <h1 className="mt-6 text-[44px] leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[72px]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={hero.primary.href} size="lg">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} size="lg" variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-7">
            {hero.trust.map((t) => {
              const Icon = trustIcon[t.id] ?? trustIcon.fast;
              return (
                <li
                  key={t.id}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{t.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative fade-up">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary-soft/50 blur-3xl" />
          <div className="overflow-hidden rounded-3xl bg-card-tint shadow-lift ring-1 ring-border/60">
            <img
              src={heroDevices}
              alt="Preview of Mini Store templates on laptop, tablet, and mobile devices"
              width={1600}
              height={1200}
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
