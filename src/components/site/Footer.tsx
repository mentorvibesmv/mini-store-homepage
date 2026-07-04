import { Container } from "./primitives";
import { brand, footer } from "@/data/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-gradient text-sm font-semibold text-primary-foreground shadow-soft">
                {brand.logoMark}
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                {brand.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footer.tagline}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.id}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-foreground">{footer.newsletter.title}</h4>
            <p className="mt-3 text-sm text-muted-foreground">{footer.newsletter.description}</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2 rounded-full border border-border bg-background p-1.5 shadow-soft"
            >
              <input
                type="email"
                placeholder={footer.newsletter.placeholder}
                className="flex-1 bg-transparent px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="rounded-full bg-primary-gradient px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:shadow-glow"
              >
                {footer.newsletter.cta}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">{footer.legal}</p>
          <div className="flex items-center gap-2">
            {footer.socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                aria-label={s.label}
                className="grid h-8 w-8 place-items-center rounded-full border border-border text-[10px] font-semibold text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground"
              >
                {s.id.toUpperCase()}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {footer.payments.map((p) => (
              <span
                key={p}
                className="rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
