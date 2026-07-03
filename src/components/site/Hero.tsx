import { Container, Badge, Button } from "./primitives";
import { hero } from "@/data/site";
import { trustIcon } from "./icons";

export function Hero() {
  const { laptop, tablet, mobile } = hero.devices;

  return (
    <section id="home" className="relative overflow-hidden bg-hero">
      {/* Subtle decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
      >
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary-soft opacity-70 blur-3xl" />
        <div className="absolute top-40 left-[-15%] h-[420px] w-[420px] rounded-full bg-[color:var(--tone-sky)] opacity-60 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
          }}
        />
      </div>

      <Container className="relative grid items-center gap-16 py-20 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-32">
        {/* LEFT — Copy */}
        <div className="relative">
          <div className="fade-up">
            <Badge>{hero.badge}</Badge>
          </div>

          <h1 className="fade-up-delay-1 mt-7 text-[44px] font-normal leading-[1.04] tracking-[-0.025em] text-foreground sm:text-6xl lg:text-[76px] lg:leading-[1.02]">
            {hero.headline}
          </h1>

          <p className="fade-up-delay-2 mt-7 max-w-xl text-[17px] leading-[1.65] text-muted-foreground sm:text-lg">
            {hero.description}
          </p>

          <div className="fade-up-delay-3 mt-10 flex flex-wrap items-center gap-3.5">
            <Button href={hero.primary.href} size="lg" className="group">
              {hero.primary.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
            <Button href={hero.secondary.href} size="lg" variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>

          <ul className="fade-up-delay-3 mt-12 grid grid-cols-2 gap-x-6 gap-y-3.5 sm:flex sm:flex-wrap sm:gap-x-8">
            {hero.trust.map((t) => {
              const Icon = trustIcon[t.id] ?? trustIcon.fast;
              return (
                <li
                  key={t.id}
                  className="flex items-center gap-2.5 text-[13px] font-medium text-muted-foreground"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary ring-1 ring-primary/10">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{t.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — Three-device composition */}
        <div className="relative fade-up-delay-2">
          <div
            aria-hidden
            className="absolute inset-x-6 -bottom-8 h-24 rounded-[50%] bg-primary/25 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-primary-soft/70 via-transparent to-[color:var(--tone-sky)]/60 blur-2xl"
          />

          <div className="relative mx-auto aspect-[5/4] w-full max-w-[640px]">
            {/* Laptop — centre */}
            <div className="absolute inset-x-[6%] top-[14%] float-slow drop-shadow-[0_40px_60px_rgba(76,29,149,0.22)]">
              <img
                src={laptop.src}
                alt={laptop.alt}
                width={laptop.width}
                height={laptop.height}
                fetchPriority="high"
                className="h-auto w-full select-none"
                draggable={false}
              />
            </div>

            {/* Tablet — right */}
            <div className="absolute right-[-4%] top-[2%] w-[34%] rotate-[6deg] float-slower drop-shadow-[0_30px_50px_rgba(30,27,75,0.28)]">
              <img
                src={tablet.src}
                alt={tablet.alt}
                width={tablet.width}
                height={tablet.height}
                loading="lazy"
                className="h-auto w-full select-none"
                draggable={false}
              />
            </div>

            {/* Mobile — left */}
            <div className="absolute left-[-2%] top-[22%] w-[22%] -rotate-[8deg] float-slow drop-shadow-[0_25px_40px_rgba(30,27,75,0.3)]">
              <img
                src={mobile.src}
                alt={mobile.alt}
                width={mobile.width}
                height={mobile.height}
                loading="lazy"
                className="h-auto w-full select-none"
                draggable={false}
              />
            </div>

            {/* Floor reflection */}
            <div
              aria-hidden
              className="absolute inset-x-[10%] bottom-[-2%] h-3 rounded-[50%] bg-foreground/10 blur-md"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
