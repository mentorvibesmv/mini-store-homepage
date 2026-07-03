import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Container, Button } from "./primitives";
import { brand, navigation, navActions } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/60 bg-background/90 backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-md",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#home" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-gradient text-sm font-semibold text-primary-foreground shadow-soft">
            {brand.logoMark}
          </span>
          <span className="truncate text-[15px] font-semibold tracking-tight text-foreground">
            {brand.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <a
            href="#"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-block sm:px-2"
          >
            {navActions.loginLabel}
          </a>
          <button
            aria-label="Cart"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <Button href={navActions.ctaHref} className="hidden md:inline-flex">
            {navActions.ctaLabel}
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <a
                href="#"
                className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm text-foreground"
              >
                {navActions.loginLabel}
              </a>
              <Button href={navActions.ctaHref} className="flex-1 justify-center">
                {navActions.ctaLabel}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
