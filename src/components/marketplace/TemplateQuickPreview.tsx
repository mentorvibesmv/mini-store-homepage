import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Template } from "@/data/site";

export function TemplateQuickPreview({
  template,
  open,
  onOpenChange,
}: {
  template: Template | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        {template && (
          <>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <img
                src={template.image}
                alt={template.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <DialogHeader className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">
                    {template.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-current text-[oklch(0.75_0.15_85)]" />
                    <span className="font-medium text-foreground">{template.rating}</span>
                    <span>({template.reviews} reviews)</span>
                  </span>
                </div>
                <DialogTitle className="text-xl font-bold">{template.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {template.shortDescription}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">{template.priceLabel}</span>
                <Link
                  to="/templates/$slug/preview"
                  params={{ slug: template.slug }}
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </Link>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
