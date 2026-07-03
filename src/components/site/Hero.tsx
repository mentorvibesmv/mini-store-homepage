import { Container, Badge, Button } from "./primitives";
import { hero } from "@/data/site";
import { trustIcon } from "./icons";
import { Check } from "lucide-react";

export function Hero() {
  const { laptop, tablet, mobile } = hero.devices;

  return (
    <section id="home" className="relative overflow-hidden bg-hero">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary-soft opacity-70 blur-3xl" />
        <div className="absolute top-40 left-[-15%] h-[420px] w-[420px] rounded-full bg-[color:var(--tone-sky)] opacity-60 blur-3xl" />
      </div>

      <Container className="relative grid items-center gap-10 pt-10 pb-6 sm:pt-14 sm:pb-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pt-16 lg:pb-10">
        {/* LEFT */}
        <div className="relative">
          <div className="fade-up">
            <Badge>{hero.badge}</Badge>
          </div>

          <h1 className="fade-up-delay-1 mt-6 text-[38px] font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[56px] lg:leading-[1.06]">
            Build Your Business
            <br />
            Website{" "}
            <span className="bg-gradient-to-r from-[oklch(0.55_0.22_290)] to-[oklch(0.55_0.2_240)] bg-clip-text text-transparent">
              {hero.headlineGradientWord}
            </span>
            <br />
            Than Ever
          </h1>

          <p className="fade-up-delay-2 mt-5 max-w-xl text-[15px] leading-[1.65] text-muted-foreground sm:text-base">
            {hero.description}
          </p>

          <div className="fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
            <Button href={hero.primary.href} size="lg" className="group">
              {hero.primary.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
            <Button href={hero.secondary.href} size="lg" variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>

          <ul className="fade-up-delay-3 mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {hero.benefits.map((b) => {
              const Icon = trustIcon[b.id] ?? Check;
              return (
                <li key={b.id} className="flex items-center gap-2 text-[13px] font-medium text-foreground">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{b.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — Devices */}
        <div className="relative fade-up-delay-2">
          <div aria-hidden className="absolute inset-x-6 -bottom-8 h-28 rounded-[50%] bg-primary/20 blur-3xl" />
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[720px] lg:max-w-none">
            <div className="absolute inset-x-[4%] top-[8%] float-slow drop-shadow-[0_36px_60px_rgba(76,29,149,0.22)]">
              <img src={laptop.src} alt={laptop.alt} width={laptop.width} height={laptop.height} fetchPriority="high" className="h-auto w-full select-none" draggable={false} />
            </div>
            <div className="absolute right-[-4%] top-[-2%] w-[36%] rotate-[6deg] float-slower drop-shadow-[0_24px_48px_rgba(30,27,75,0.25)]">
              <img src={tablet.src} alt={tablet.alt} width={tablet.width} height={tablet.height} loading="lazy" className="h-auto w-full select-none" draggable={false} />
            </div>
            <div className="absolute left-[-3%] top-[22%] w-[23%] -rotate-[8deg] float-slow drop-shadow-[0_24px_40px_rgba(30,27,75,0.28)]">
              <img src={mobile.src} alt={mobile.alt} width={mobile.width} height={mobile.height} loading="lazy" className="h-auto w-full select-none" draggable={false} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
