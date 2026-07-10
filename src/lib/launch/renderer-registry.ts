// Launch Engine renderer registry.
// Maps a launch-ready template slug to its data-driven renderer component.
// Returns null for any slug that has no registered renderer — callers must
// handle the null case explicitly. Never falls back to a different template.

import type { ComponentType } from "react";
import type { StoreConfig } from "./types";
import { AlexPortfolioRenderer } from "./renderers/alex-portfolio";

export type TemplateRendererProps = { config: StoreConfig };
export type TemplateRenderer = ComponentType<TemplateRendererProps>;

// Only launch-ready templates appear here. Adding a slug here MUST be paired
// with `launchable: true` on the matching entry in src/data/site.ts.
const RENDERERS: Readonly<Record<string, TemplateRenderer>> = Object.freeze({
  "alex-portfolio": AlexPortfolioRenderer,
});

export function getRendererForTemplate(
  slug: string,
): TemplateRenderer | null {
  return Object.prototype.hasOwnProperty.call(RENDERERS, slug)
    ? RENDERERS[slug]
    : null;
}

export function isLaunchableSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(RENDERERS, slug);
}
