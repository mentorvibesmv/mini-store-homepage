import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { templates, categories } from "@/data/site";

export default defineTool({
  name: "list_templates",
  title: "List website templates",
  description:
    "List available Mini Store website templates, optionally filtered by category label (e.g. Restaurant, Fashion, Medical).",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe(
        "Optional category label to filter by. Use list_categories to discover valid labels.",
      ),
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .optional()
      .describe("Max number of templates to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, limit }) => {
    if (category) {
      const validLabels = new Set(categories.map((c) => c.label.toLowerCase()));
      if (!validLabels.has(category.toLowerCase())) {
        return {
          content: [
            {
              type: "text",
              text: `Unknown category "${category}". Valid labels: ${categories.map((c) => c.label).join(", ")}.`,
            },
          ],
          isError: true,
        };
      }
    }
    const filtered = category
      ? templates.filter((t) => t.category.toLowerCase() === category.toLowerCase() && t.visible)
      : templates.filter((t) => t.visible);
    const items = filtered.slice(0, limit ?? 20).map((t) => ({
      slug: t.slug,
      title: t.title,
      category: t.category,
      priceLabel: t.priceLabel,
      shortDescription: t.shortDescription,
      rating: t.rating,
      tags: t.tags,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, total: filtered.length, items },
    };
  },
});
