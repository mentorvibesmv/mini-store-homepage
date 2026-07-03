import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { cn } from "@/lib/utils";

/**
 * SiteLayout — shared page shell for every public Mini Store page
 * (Home, Templates, Custom Websites, Pricing, About, Contact, Auth, ...).
 *
 * Reuses the same Navbar + Footer so no page ever redefines them.
 * Pages only render their own <main> content as children.
 */
export function SiteLayout({
  children,
  mainClassName,
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className={cn(mainClassName)}>{children}</main>
      <Footer />
    </div>
  );
}
