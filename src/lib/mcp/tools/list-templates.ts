import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { templates, categories } from "@/data/site";

export default defineTool({
  name: "list_templates",
  title: "List website templates",
  description:
    "List available Mini Store website templates, optionally filtered by category id (e.g. restaurant, fashion, medical, realestate, fitness, education, portfolio).",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe("Optional category id to filter by. Use list_categories to discover valid ids."),
    limit: z.number().int().min(1).max(50).optional().describe("Max number of templates to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, limit }) => {
    const validCategoryIds = new Set(categories.map((c) => c.id));
    if (category && !validCategoryIds.has(category as never)) {
      return {
        content: [
          {
            type: "text",
            text: `Unknown category "${category}". Valid ids: ${categories.map((c) => c.id).join(", ")}.`,
          },
        ],
        isError: true,
      };
    }
    const filtered = category ? templates.filter((t) => t.category === category) : templates;
    const items = filtered.slice(0, limit ?? 20).map((t) => ({
      slug: t.slug,
      name: t.name,
      category: t.category,
      price: t.price,
      description: t.description,
      badges: t.badges,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, total: filtered.length, items },
    };
  },
});
