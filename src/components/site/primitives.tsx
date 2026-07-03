import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// -------- Container --------
export function Container({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

// -------- Section --------
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-12 sm:py-16 lg:py-20", className)}
    >
      {children}
    </section>
  );
}

// -------- Badge --------
export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-primary-soft px-3.5 py-1.5 text-xs font-medium text-accent-foreground",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary-gradient" />
      {children}
    </span>
  );
}

// -------- SectionTitle --------
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 text-xs font-medium uppercase tracking-[0.18em] text-primary",
            align === "center" ? "" : "",
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

// -------- Button --------
type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-[15px]",
  };
  const variants = {
    primary:
      "bg-primary-gradient text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5",
    secondary:
      "bg-card text-foreground border border-border hover:border-foreground/20 hover:-translate-y-0.5 shadow-soft",
    ghost:
      "text-foreground hover:bg-muted",
  };
  return (
    <a
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
