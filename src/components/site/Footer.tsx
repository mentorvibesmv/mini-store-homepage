import { Container } from "./primitives";
import { brand, footer } from "@/data/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
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
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">{footer.legal}</p>
        </div>
      </Container>
    </footer>
  );
}
