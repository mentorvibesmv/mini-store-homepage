import { Container, Badge } from "@/components/site/primitives";
import { marketplaceHero } from "@/data/site";

export function MarketplaceHero() {
  const [left, center, right] = marketplaceHero.previews;

  return (
    <section className="relative overflow-hidden bg-hero">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary-soft opacity-70 blur-3xl" />
        <div className="absolute top-24 left-[-15%] h-[320px] w-[320px] rounded-full bg-[color:var(--tone-sky)] opacity-60 blur-3xl" />
      </div>

      <Container className="relative grid items-center gap-8 pt-10 pb-14 sm:pt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:pt-16 lg:pb-16">
        {/* LEFT */}
        <div className="relative">
          <div className="fade-up">
            <Badge>{marketplaceHero.badge}</Badge>
          </div>
          <h1 className="fade-up-delay-1 mt-5 text-[38px] font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[52px]">
            {marketplaceHero.titleLine1}
            <br />
            {marketplaceHero.titleLine2}
          </h1>
          <p className="fade-up-delay-2 mt-5 max-w-md text-[15px] leading-[1.65] text-muted-foreground">
            {marketplaceHero.description}
          </p>
        </div>

        {/* RIGHT — 3 floating preview cards */}
        <div className="relative fade-up-delay-2">
          <div aria-hidden className="absolute inset-x-8 -bottom-6 h-24 rounded-[50%] bg-primary/15 blur-3xl" />
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[640px] lg:max-w-none">
            {/* left card */}
            <div className="absolute left-[0%] top-[18%] w-[42%] -rotate-[6deg] float-slower">
              <div className="overflow-hidden rounded-2xl border border-white/60 bg-card shadow-lift">
                <img
                  src={left.src}
                  alt={left.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            {/* center card (dominant) */}
            <div className="absolute left-[24%] top-[2%] w-[52%] float-slow">
              <div className="overflow-hidden rounded-2xl border border-white/60 bg-card shadow-lift ring-1 ring-black/5">
                <img
                  src={center.src}
                  alt={center.alt}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            {/* right card */}
            <div className="absolute right-[0%] top-[22%] w-[40%] rotate-[6deg] float-slower">
              <div className="overflow-hidden rounded-2xl border border-white/60 bg-card shadow-lift">
                <img
                  src={right.src}
                  alt={right.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
