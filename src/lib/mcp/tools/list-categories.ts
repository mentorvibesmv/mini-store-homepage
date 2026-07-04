import { defineTool } from "@lovable.dev/mcp-js";
import { categories } from "@/data/site";

export default defineTool({
  name: "list_categories",
  title: "List template categories",
  description: "List all Mini Store template categories with their ids and labels.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = categories.map((c) => ({ id: c.id, label: c.label, count: c.count }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { items },
    };
  },
});
