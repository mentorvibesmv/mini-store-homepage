import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { templates } from "@/data/site";

export default defineTool({
  name: "get_template",
  title: "Get website template details",
  description: "Fetch full details for a single Mini Store website template by its slug.",
  inputSchema: {
    slug: z.string().min(1).describe("The template slug (e.g. 'bella-vista', 'urban-threads')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const template = templates.find((t) => t.slug === slug);
    if (!template) {
      return {
        content: [{ type: "text", text: `No template found with slug "${slug}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(template, null, 2) }],
      structuredContent: { template },
    };
  },
});
