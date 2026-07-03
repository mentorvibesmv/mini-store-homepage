import {
  Sparkles,
  LayoutTemplate,
  Search,
  SlidersHorizontal,
  RefreshCw,
  LifeBuoy,
  UtensilsCrossed,
  Shirt,
  Stethoscope,
  Building2,
  Dumbbell,
  GraduationCap,
  UserCircle2,
  LayoutGrid,
  Zap,
  ShieldCheck,
  Smartphone,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import type { Feature, Category } from "@/data/site";

export const featureIcon: Record<Feature["icon"], LucideIcon> = {
  sparkles: Sparkles,
  layout: LayoutTemplate,
  search: Search,
  sliders: SlidersHorizontal,
  refresh: RefreshCw,
  "life-buoy": LifeBuoy,
};

export const categoryIcon: Record<Category["id"], LucideIcon> = {
  restaurant: UtensilsCrossed,
  fashion: Shirt,
  medical: Stethoscope,
  realestate: Building2,
  fitness: Dumbbell,
  education: GraduationCap,
  portfolio: UserCircle2,
  more: LayoutGrid,
};

export const trustIcon: Record<string, LucideIcon> = {
  responsive: Smartphone,
  seo: Search,
  secure: ShieldCheck,
  easy: Wand2,
  fast: Zap,
};
