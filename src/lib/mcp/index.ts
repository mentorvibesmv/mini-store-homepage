import { defineMcp } from "@lovable.dev/mcp-js";
import listTemplatesTool from "./tools/list-templates";
import listCategoriesTool from "./tools/list-categories";
import getTemplateTool from "./tools/get-template";

export default defineMcp({
  name: "mini-store-mcp",
  title: "Mini Store MCP",
  version: "0.1.0",
  instructions:
    "Tools for browsing the Mini Store template catalog. Use list_categories to discover categories, list_templates (optionally filtered by category) to browse, and get_template to fetch full details for a specific template slug.",
  tools: [listTemplatesTool, listCategoriesTool, getTemplateTool],
});
